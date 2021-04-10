import { React, useState } from 'react'
import { Card, Text, Set } from 'bumbag';
import { FaCheck, FaEdit, FaPlus } from 'react-icons/fa'
import AddTask from './AddTask';


const Task = ({ tasks, completeTask, updateTask, addTask }) => {
    var task_sort = []
    const [edit, setEdit] = useState({
        parent_id: null,
        id: null,
        value:''
    })

    const [add, setAdd] = useState({
        parent_id: null,
        id: null,
        value: ''
    })

    const submitUpdate = value => {
        updateTask(edit.id, edit.parent_id, value)
        setEdit({
            parent_id: null,
            id: null,
            value: ''
        })
    }

    const submitAdd = (value) => {
        addTask(value,)
        setAdd({
            parent_id: null,
            id: null,
            value: ''
        })
    }

    const addElement = (task) => {
        if(task_sort.length < 1)
         {
            task_sort.push(task)
         } else {
            var i = 0
            var len = task_sort.length
            while( len > 0) {
                if(task_sort[i].id !== task.parent_id) {
                    i = i + 1
                }
                len = len - 1
            }
            task_sort.splice(i + 1, 0, task)
         }
    }

    const sortTasks = (task_list) => {
        var visited = []
        task_list.forEach(task => {
            if(!(task in visited )) {
                visited.push(task)
                addElement(task)
                task_list.forEach(subtask => {
                    if(subtask.pid === task.id && !(subtask in visited)) {
                        visited.push(subtask) 
                        addElement(subtask)
                    }
                });
            }
        });
    }
        
    if(add.id){
        sortTasks(tasks)
        return task_sort.map((task) => (
            <Card id={task.id} key={task.id} style={task.parent_id === "" ?{width:"430px", overflow:"auto"}: {backgroundColor:"lightgrey", width:"430px", marginLeft: "30px", overflow:"auto"}}>
                <Set textAlign='right'>
                    <FaCheck onClick={() => completeTask(task.id, task.parent_id)} style={{cursor:"pointer"}}/>
                    <FaEdit onClick={() => setEdit({id: task.id, parent_id: task.parent_id, text: task.text})} style={{cursor:"pointer"}}/>
                    <FaPlus onClick={() => setAdd({id: task.id, parent_id: task.parent_id, text: task.text})} style={{cursor:"pointer"}}/>
                    <Set >
                        <Text fontWeight="bold">id: {task.id}</Text>
                        {task.parent_id === "" ? '' : <Text fontWeight="bold">parent_id: {task.parent_id}</Text>}
                    </Set>
                </Set>
                {add.id !== task.id ? <p>{task.text}</p> : <AddTask color="black" add={add} onSubmit={submitAdd} />}
            </Card> 
            
        ))
    }

    if(edit.id){
        sortTasks(tasks)
        return task_sort.map((task) => (
            <Card id={task.id} 
            key={task.id} 
            style={task.parent_id === "" ?{width:"430px", overflow:"auto"}: {backgroundColor:"lightgrey", width:"430px", marginLeft: "30px", overflow:"auto"}}>
                <Set textAlign='right'>
                    <FaCheck onClick={() => completeTask(task.id, task.parent_id)} style={{cursor:"pointer"}}/>
                    <FaEdit onClick={() => setEdit({id: task.id, parent_id: task.parent_id, text: task.text})} style={{cursor:"pointer"}}/>
                    <FaPlus onClick={() => setAdd({id: task.id, parent_id: task.parent_id,})} style={{cursor:"pointer"}}/>
                    <Set  >
                        <Text fontWeight="bold">id: {task.id}</Text>
                        {task.parent_id === "" ? '' : <Text fontWeight="bold">parent_id: {task.parent_id}</Text>}
                    </Set>
                </Set>
                {edit.id !== task.id ? <p>{task.text}</p> : <AddTask color="black" edit={edit} onSubmit={submitUpdate} />}
            </Card>
        ))
    }

    sortTasks(tasks)
    return task_sort.map((task) => (
         <Card id={task.id} 
         key={task.id} 
         style={task.parent_id === "" ?{width:"430px", overflow:"auto"}: {backgroundColor:"lightgrey", width:"430px", marginLeft:'30px', overflow:"auto"}}>
             
              {/* `calc(20px + ${(document.getElementById(task.id).previousSibling.style.marginLeft) === null ? '20px' : document.getElementById(task.id).previousElementSibling.style.marginLeft})` */}
                <Set textAlign='right'>
                    <FaCheck onClick={() => completeTask(task.id, task.parent_id)} style={{cursor:"pointer"}}/>
                    <FaEdit onClick={() => setEdit({id: task.id, parent_id: task.parent_id, text: task.text})} style={{cursor:"pointer"}}/>
                    <FaPlus onClick={() => setAdd({id: task.id, parent_id: task.parent_id})} style={{cursor:"pointer"}}/>
                    <Set >
                        <Text fontWeight="bold">id: {task.id}</Text>
                        {task.parent_id === "" ? '' : <Text fontWeight="bold">parent_id: {task.parent_id}</Text>}
                    </Set>
                </Set>
                <p>{task.text}</p>
            </Card>
        )
    )
}

export default Task
