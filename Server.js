const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const crud=require('./CRUD');
app.use(cors());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:false}));
app.use('/',crud);

app.use(express.static(__dirname + '/public'));

app.listen(8000,()=>{
    console.log("Server Started");
})