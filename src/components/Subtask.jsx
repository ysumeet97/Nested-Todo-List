import { Checkbox } from 'bumbag'
import React from 'react'

const Subtask = (subtasks) => {

    return subtasks.subtasks.map((subtask) => (
        <Checkbox key={subtask.id} label={subtask.text} />
    ))
}

export default Subtask
