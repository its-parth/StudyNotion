const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("<h1>Parth Magar</h1>");
});

app.listen(4000, () => {
    console.log('Server is running on port no 4000 successfully');
    
})