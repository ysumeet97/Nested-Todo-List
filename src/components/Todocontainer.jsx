import { React, useState } from 'react'
import AddTask from './AddTask'
import Task from './Task'

const TodoContainer = () => {

    const [tasks, setTasks] = useState([])

    const addTask = (new_task) => {
        const task_list = [...tasks,new_task]
        setTasks(task_list)
    }
    
    const updateTask = (id, parent_id, value) => {
        var task_list = [...tasks]
        task_list.forEach(task => {
            if(task.id === id){
                task.text = value.text
            }
        });
    }

    const completeTask = (id) => {
        var filter_task_list = [...tasks].filter(task => ( task.parent_id !== id  ))
        filter_task_list = [...filter_task_list].filter(task => ( task.id !== id ))
        for (let element1 of filter_task_list) {
            var mark = 0
            for (let element2 of filter_task_list) {
                if(element1.parent_id !== "" && element1.parent_id === element2.id){
                    mark = 1;
                    break;
                }
            }
            if(element1.parent_id !== "" && mark === 0)
            {
                filter_task_list = [...filter_task_list].filter(task => ( task.id !==  element1.id))
            }
        }
        setTasks(filter_task_list)
    }

    return (
        <div >
            <h1>Nested Todo List</h1>
            <AddTask onSubmit={addTask}/>
            <Task tasks={tasks} completeTask={completeTask} updateTask={updateTask} addTask={addTask} />
        </div>
    )
}

export default TodoContainer
