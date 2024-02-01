const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT||3000;
//const bodyParser =require('body-parser')
const Expense = require('./expenses');
app.listen(port)
//middle ware
app.use(express.json());//only accept json
mongoose.connect('mongodb+srv://gowtham:23@cluster0.jr3bc6k.mongodb.net/newDb', { useUnifiedTopology: true });
//get api1
app.get('/expenses', async (req, res) => {
    const result = await Expense.find();
    res.send(result);
});
//get api2
app.get('/expenses/:id', async (req, res) => {
    const id= req.params.id;
    console.log(req.params);
    const result = await Expense.findById(id);
    try{
    if(result){
        res.send(result);
    }
    else{
        res.send("result not done");
    }
    }
    catch(err)
    {
        res.send(err);
    }
});

// delete api
app.delete('/expenses/:id', async (req, res) => {
    const id= req.params.id;
    console.log(req.params);
    const result = await Expense.findByIdAndDelete(id);
    try{
    if(result){
        res.send(result);
    }
    else{
        res.send("No Item in Index");
    }
    }
    catch(err)
    {
        res.send(err);
    }
});

//post api
app.post('/expenses',async (req, res) => {
    console.log(req.body);
    const newExpense=req.body;
    await Expense.create(newExpense);
    res.send("created");
});


// update api
app.put('/expenses/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateObject = req.body;
        const updatedObject=await Expense.findByIdAndUpdate(id,{$set:updateObject},{new:true})
        res.send(updatedObject);
    } catch (err) {
        console.error(err);
        res.send("Internal Server Error");
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
