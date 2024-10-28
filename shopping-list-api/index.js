const http = require('http');
const fs = require('fs');
const path = require('path');

// File paths
const dataFilePath = path.join(__dirname, 'data', 'shopping-list.json');

// Ensure the data file exists
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, '[]');
}

// Helper function to read JSON file
const readData = () => JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

// Helper function to write JSON file
const writeData = (data) => fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

// Create HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/shopping-list') {
    const shoppingList = readData();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(shoppingList));
  } else if (req.method === 'POST' && req.url === '/shopping-list') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      const newItem = JSON.parse(body);
      const shoppingList = readData();
      shoppingList.push(newItem);
      writeData(shoppingList);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newItem));
    });
  } else if ((req.method === 'PUT' || req.method === 'PATCH') && req.url.startsWith('/shopping-list/')) {
    const id = parseInt(req.url.split('/').pop());
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      const updatedItem = JSON.parse(body);
      const shoppingList = readData();
      const index = shoppingList.findIndex(item => item.id === id);
      if (index !== -1) {
        shoppingList[index] = { ...shoppingList[index], ...updatedItem };
        writeData(shoppingList);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(shoppingList[index]));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Item not found' }));
      }
    });
  } else if (req.method === 'DELETE' && req.url.startsWith('/shopping-list/')) {
    const id = parseInt(req.url.split('/').pop());
    const shoppingList = readData();
    const index = shoppingList.findIndex(item => item.id === id);
    if (index !== -1) {
      const [deletedItem] = shoppingList.splice(index, 1);
      writeData(shoppingList);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(deletedItem));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Item not found' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
