const http = require('http');
const fs = require('fs');

const dataFilePath = './data/shopping-list.json';

const readData = () => JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
const writeData = (data) => fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

if (!fs.existsSync(dataFilePath)) writeData([]);

require('./getNextId.js');

const server = http.createServer((req, res) => {
  if (req.url === '/shopping-list' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(readData()));
  } 
  else if (req.url === '/shopping-list' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const newItem = JSON.parse(body);
      const shoppingList = readData();
      
      newItem.id = getNextId(shoppingList);
      
      shoppingList.push(newItem);
      writeData(shoppingList);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newItem));
    });
  } 
  else if (req.url.startsWith('/shopping-list/') && req.method === 'PUT') {
    const id = parseInt(req.url.split('/').pop());
    let body = '';
    req.on('data', chunk => body += chunk);
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
  } 
  else if (req.url.startsWith('/shopping-list/') && req.method === 'DELETE') {
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
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

module.exports = server;