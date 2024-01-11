const express = require('express');
const path = require('path');
const app = express();
const port = 4000; // You can use any port number

app.use(express.static(path.join(__dirname, '.'))); // Serve static files from the project root

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});