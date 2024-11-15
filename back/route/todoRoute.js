const express=require ('express');
const router=express.Router();
const jwt = require('jsonwebtoken'); 

router.use(express.json())
router.use(express.urlencoded({extended:true}));
const todoModel=require('../models/todoData')


function verifyToken(req,res,next){
    let token=req.headers.token;
    try{
        if(!token) throw 'Unauthorised Access'
        let payload=jwt.verify(token,"secret")
        if(!payload)throw 'Unauthorised Access'
        next()
    }catch(error){
        res.json({message:error})
    }
}




// crud operation
router.get('/', verifyToken,async(req,res)=>{
    try {
        const todos=await todoModel.find()
        res.status(200).send(todos);
    } catch (error) {
        res.status(404).send('Todo not found');
        
    }
});


router.post('/addTodo',verifyToken, async(req,res)=>{
    try {
        const todo=req.body;
        const newTodo=new todoModel(todo);
        const savedTodo=await newTodo.save();
        res.status(200).send('Todo added successfully');
    } catch (error) {
        console.error(error); 
        res.status(404).send('Error adding todo');
    }
});
router.put('/edit/:id',verifyToken,async(req,res)=>{
    try {
        const id=req.params.id;
        const updatedTodo=await todoModel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).send('todo updated successfully');
    } catch (error) {
        res.status(404).send('Error updating todo');
    }
});
router.delete('/delete/:id',verifyToken,async(req,res)=>{
    try {
        const id=req.params.id;
        const deleteTodo=await todoModel.findByIdAndDelete(id,req.body,{new:true})
        res.status(200).send('todo deleted successfully');
    } catch (error) {
        res.status(404).send('Error deleting todo');
    }
});
module.exports = router;