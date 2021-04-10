import { React, useState } from 'react'
import { Set, Button, Input } from 'bumbag';
import '../css/App.css';
const AddTask = (props) => {
    const [input, setInput] = useState('')
    // const [count, setCount] = useState(1)
    

    const onFormSubmit = e => {
        const val= Math.floor(Math.random()*100000)
        e.preventDefault()
        props.onSubmit({
            id: val,
            parent_id: '',
            text: input
        })
        setInput('')
    }

    const onFormSubtaskSubmit = (e,pid) => {
        const val = Math.floor(Math.random()*100000)
        e.preventDefault()
        props.onSubmit({
            id: val,
            parent_id: pid,
            text: input
        })
        setInput('')
    }

    const onInputChange = (e) => {
        setInput(e.target.value)
    }

    
        
    if (props.edit) { 
        return (<form onSubmit={onFormSubmit}>
            <Set>
                <Input style={{ color:props.color }} variant="task_input" value={input} onChange={onInputChange} placeholder="Update your task..." />
                <Button onClick={onFormSubmit}>Update</Button>
            </Set>
        </form>) 
    }
    else if(props.add) {
        return(
            <Set>
                <Input style={{ color:props.color }} variant="task_input" value={input} onChange={onInputChange} placeholder="Enter subtask name..." />
                <Button onClick={(e) => onFormSubtaskSubmit(e, props.add.id)}>Add Sub Task</Button>
            </Set>
        )
    }
    else {
        return (<form onSubmit={onFormSubmit}>
            <Set>
                <Input variant="task_input" value={input} onChange={onInputChange} placeholder="Enter task name..." />
                <Button onClick={onFormSubmit}>Add Task</Button>
            </Set>
        </form>)
    } 
        
}

export default AddTask
