const express = require('express');
const app = express();
app.use(express.static('public'));


app.listen(4040, ()=>{
    console.log('Servidor funcionando. Puerto:4040');
});

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/views/index.html');
});
app.get('/register', (req,res)=>{
    res.sendFile(__dirname + '/views/register.html');
});
app.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/views/login.html');
});
app.get('/detalleproducto', (req,res)=>{
    res.sendFile(__dirname + '/views/detalleproducto.html');
});