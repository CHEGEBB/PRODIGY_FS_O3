const express = require ('express');

const app = express();

app.listen(5000 , (err, res) =>{
    if(err) throw err;
    console.log('Server running on port 5000');
})