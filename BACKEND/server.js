const express =require('express')
const mysql = require('mysql')
const cors = require('cors')

const app =express()
require('dotenv').config()

const port = process.env.port

app.use(cors())
app.use(express.json())

const db= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'crud'
})
if(db){
    console.log("connected");
    
}

app.get('/',(req,res)=>{
    db.query(`SELECT * FROM student`,(err,result)=>{
        if(err)return res.status(400).json({message:err})
            res.status(200).json(result)
    })
})

app.post('/add',(req,res)=>{
    const {name ,age , email}=req.body
    db.query(`INSERT INTO student (name,age,email) VALUES ('${name}','${age}','${email}')`,(err,result)=>{
        if(err)return res.status(400).json({message:err})
            res.status(200).json({message:"added"})
    })
})

app.put('/update/:id',(req,res)=>{
    const {name, age,email}=req.body
    const {id}=req.params
    db.query(`UPDATE student SET name='${name}',age='${age}',email='${email}' WHERE id='${id}'`,(err,result)=>{
        if(err)return res.status(400).json({message:err})
            res.status(200).json({message:"updated"})
    })
})

app.delete('/delete/:id',(req,res)=>{
    const{id}=req.params
    db.query(`DELETE FROM student WHERE id='${id}'`,(err,result)=>{
        if(err)return res.status(400).json({message:err})
            res.status(200).json({message:"deleted"})
    })
})

app.listen(port,(req,res)=>{
    console.log(`server is running at ${port}`)
})