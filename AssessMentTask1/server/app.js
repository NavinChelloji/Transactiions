const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')

const router = require('./route/products.routes')
const app=express()

app.use(cors())
app.use(express.json())
async function startServer(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Amazon")

    app.use(router)

}
startServer()

app.listen(5000,()=>{
    console.log(`listining on port 6000`)
   
})