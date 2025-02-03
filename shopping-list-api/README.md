# Shopping List API

## Overview
This project is a simple HTTP server that manages a shopping list. It allows users to perform CRUD (Create, Read, Update, Delete) operations on the shopping list items stored in a JSON file.

## Features
- Retrieve the shopping list
- Add new items to the shopping list
- Update existing items in the shopping list
- Delete items from the shopping list

## Technologies Used
- Node.js
- HTTP module
- File System (fs) module
- JSON for data storage

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/J3ZZ3/Shopping-List-Api
   cd Shopping-List-Api
   ```

2. **Install dependencies**
   This project does not have any external dependencies, but ensure you have Node.js installed.

3. **Create the data file**
   If it doesn't exist, the server will create a `shopping-list.json` file in the `data` directory. You can also create it manually with the following initial content:
   ```json
   []
   ```

4. **Run the server**
   ```bash
   node index.js
   ```

5. **Access the API**
   The server will be running at `http://localhost:3000/`. You can use tools like Postman or curl to interact with the API.

## API Endpoints

### GET /shopping-list
- **Description**: Retrieve the entire shopping list.
- **Response**: JSON array of shopping list items.

### POST /shopping-list
- **Description**: Add a new item to the shopping list.
- **Request Body**: JSON object with `name` and `quantity`.
- **Response**: JSON object of the newly created item, including its `id`.

### PUT /shopping-list/:id
- **Description**: Update an existing item in the shopping list.
- **Request Body**: JSON object with updated `name` and/or `quantity`.
- **Response**: JSON object of the updated item.

### DELETE /shopping-list/:id
- **Description**: Delete an item from the shopping list.
- **Response**: JSON object of the deleted item.

## Example Usage

### Adding an Item
```bash
POST http://localhost:3000/shopping-list
-H "Content-Type: application/json"
-d '{
"name": "milk",
"quantity": 2}'
```

### Retrieving the List
```bash
GET http://localhost:3000/shopping-list
```

### Updating an Item
```bash
PUT http://localhost:3000/shopping-list/1
-H "Content-Type: application/json"
-d '{
"name": "egg",
"quantity": 3
}'
```

### Deleting an Item
```bash
DELETE http://localhost:3000/shopping-list/1
```


