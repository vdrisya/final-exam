import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { red } from '@mui/material/colors';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosinterceptor';
import Form from 'react-bootstrap/Form';

const Home = () => {

  
    const [todo,setTodo]=useState([])
    
          useEffect(()=>{
            axiosInstance.get('http://localhost:3001/todo/').then((res)=>{
                setTodo(res.data)
            })
           
          })
          
          const handleDelete = (_id) => {
            axiosInstance.delete(`http://localhost:3001/todo/delete/${_id}`)
                .then((res) => {
                    
                    setTodo(todo._id);
                    console.log(alert('are you sure'))
                     window.location.reload();
                })
                .catch((err) => {
                    console.error("Error deleting todo:", err);
                });
        };
        const navigate=useNavigate()
        const handleUpdate=(todo)=>{
            navigate('/add',{state:{todo}}) 
        }
        
        
        
const user=localStorage.getItem("username")
    return (
        
        <>
        <Grid container spacing={3} sx={{ padding: 2 }}>
            {todo.map((todo) => (
                <Grid item xs={12} sm={6} md={9} key={todo.todoId}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                            sx={{ height: 180 }}
                            // image={todo.courseImage}
                            title={todo.todoName}
                        />
                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: 700}}>
                                {todo.todoName}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                               Category: {todo.todoCategory}
                            </Typography>
                            
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                {todo.todoDescription}
                            </Typography>
                            <Button variant="contained" sx={{ backgroundColor:'green'}}  onClick={() => handleDelete(todo._id)}>DELETE</Button>
                            <Button variant="contained" onClick={() => handleUpdate(todo)}>EDIT</Button>


                        </CardContent>
                        <CardActions>
                            <Button size="small">Read more</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>   
        </>
    )
}

export default Home;
