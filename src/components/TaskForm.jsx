import React, { useState } from 'react'

const TaskForm = ({onAdd}) => {
    const [taskName, setTaskName] = useState('');
    const handleSubmit = (e)=>{
        e.preventDefault();
        onAdd(taskName);
        setTaskName('');
    }
  return (
    <div>
        <form className='task-form' onSubmit={handleSubmit}>
            <button>+</button>
            <input type="text" value={taskName} onChange={(e)=>setTaskName(e.target.value)} placeholder='Enter your task here!' />
        </form>
    </div>
  )
}

export default TaskForm