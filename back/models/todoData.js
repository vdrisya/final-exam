const mongoose=require ('mongoose');
const todoSchema=new mongoose.Schema({
    todoId:String,
    todoName:String,
    todoCategory:String,
    todoDescription:String,
   
})
const  TodoData=mongoose.model('todos',todoSchema);
module.exports=TodoData;