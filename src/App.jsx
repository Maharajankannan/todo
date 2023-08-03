import { useEffect, useState } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import Tasks from './components/Tasks'

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    return storedTasks ?? [] ;
  });

  //add tasks
  const addTask =(name)=>{
    if(name){
      setTasks( prev=>{
        return [...prev, {name: name, done: false}]
      })
    }
  }

  //Complete task
  const updateComplete =(taskIndex, newDone)=>{
    setTasks(prev=>{
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  //remove task
  const removeTask = (removeIndex)=>{
    setTasks(prev=>{
      return prev.filter((task, index)=> index!== removeIndex);
    })
  }

  //edit task
  const editTask =(index, newName)=>{
    setTasks(prev=>{
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    })
  }
  useEffect(()=>{
      localStorage.setItem('tasks', JSON.stringify(tasks)); 
  },[tasks])


  const completedTasks = tasks.filter((task)=>task.done).length;
  const totalTasks = tasks.length;
  const percentage = completedTasks/totalTasks * 100;

  const showMessage =()=>{
    if(percentage === 0){
      return 'Work Harder!'
    }
    if(percentage===100){
      return 'Thats for the day..!'
    }
    return 'Keep Going...'
  }

  return (
    <div className='home'>
      <div className='head'>
      <h1>To Do App</h1>
      <h1>{completedTasks}/{tasks.length} Complete</h1>
      </div>
     
      <h2>{showMessage ()}</h2>
      <TaskForm onAdd={addTask}/>
      {tasks?.map((task,index)=>(
        <Tasks key={index} {...task}
         onToggle ={done => updateComplete(index, done)}
         onDelete = {()=> removeTask(index)}
         onRename = {newName => editTask(index, newName)}
         />
      ))}
    </div>
  )
}

export default App
