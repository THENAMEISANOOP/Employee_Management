const express  = require ('express')
const app= express();
const bodyParser = require('body-parser')
require('dotenv').config();
require('./Models/db')
const EmployeeRouter =require('./Routes/EmployeRoute')
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("employee  mgm server is running")
})

app.use('/api/employees',EmployeeRouter)

app.listen(PORT,()=>{
    console.log(`serever is running on ${PORT}`)
})