//importing module
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
// no need to install depency of path as it is already a core module
var path = require('path');

var app = express();
var router = require('./route')
//port no where server code will be ruuning
const port = 3000;

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist');

//on successful connection
mongoose.connection.on('connected',()=>{
    console.log('conected to mongodb @ 27017');
});
    
//on un successful connection
mongoose.connection.on('error',(err)=>{
    if(err)
    {
        console.log('error in database connection: ' +err);
    }
    
});

//adding middle ware - cors
app.use(cors());

//adding body-parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')
    ));

//adding routes
app.use('/api', router);

//testing server- we need to create a route so that local host 3000 will come to know what it has to render
app.get('/',(req, res)=>{
    res.send('foobar');
})


// now we have to bind out server with this port, we are using arrow function here

app.listen(port,()=>{
    console.log('server started at port: '+ port)
});

