import React from 'react'
import Subtask from './Subtask'

const Subtasklist = (subtask_list) => {
    return subtask_list.map(subtask => (
        <Subtask label={subtask.label}/>
    ))
}

export default Subtasklist
