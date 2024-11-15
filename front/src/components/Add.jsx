import { Button, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../axiosinterceptor';

const Add = () => {
    // array and function for drop down menu
    // const courseCategories = [
    //     { value: 'irp', label: 'Industry Readiness Program' },
    //     { value: 'smp', label: 'Six Month Program' },
    //     { value: 'upskilling', label: 'Upskilling Program' },
    //   ];
    //   const [category, setCategory] = useState('');

    //   const handleChange = (event) => {
    //     setCategory(event.target.value);
    //     fetchValue(event);     
    //   };





      //array and function to submit data
      const[todo,setTodo]=useState({todoName:'',todoDescription:'',todoCategory:'',todoId:''})

      const fetchValue=(event)=>{
      setTodo({...todo,[event.target.name]: event.target.value});
      }
      
  

      
      const Navigate=useNavigate()
      const location=useLocation()
      const sendData=()=>{
        if(location.state!=null){
          axiosInstance.put('http://localhost:3001/todo/edit/'+location.state.todo._id,todo)
          .then((res)=>{
            alert('Data updated');
            Navigate('/home')

          }).catch((error)=>{
            console.log(error);
          })
        }
        else{
          axiosInstance.post('http://localhost:3001/todo/addTodo',todo).then((res)=>{
            Navigate('/home')
          }).catch((error)=>{
            console.log(error)
          })
        }

      }
      useEffect(()=>{
        if(location.state!=null){
          setTodo({
            ...Todo,
            todoId:location.state.todo.todoId,
            todoName:location.state.todo.todoName,
            todoCategory:location.state.todo.todoCategory,
            todoDescription:location.state.todo.todoDescription,
          
          })
        }
      },[])

     return (
      <div>
        <br />
        <h2>Add Todo</h2><br />
        <TextField id="outlined-basic" label="Todo ID" variant="outlined"onChange={fetchValue} name="todoId" value={todo.todoId} /><br />
        <TextField  id="outlined-basic" label="Todo Name" variant="outlined" onChange={fetchValue} name="todoName" value={todo.todoName} /><br />
    
        <TextField id="outlined-basic"  label="Todo Category"  onChange={fetchValue} variant="outlined" value={todo.todoCategory} name="todoCategory" >
        
      
        </TextField><br />
        <TextField
        fullWidth 
          id="outlined-textarea-basic"
          label="Todo Description"
          multiline onChange={fetchValue} value={todo.todoDescription} name="todoDescription"/><br />
        <Button variant="contained" sx={{backgroundColor:'#96D0E2',color:'white', margin:2}} onClick={sendData}>Add Todo</Button>
    </div>
  )
}

export default Add