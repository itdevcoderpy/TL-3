import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    let addTaskHandler = () => {
        props.addTask(title);
        setTitle("")
    }
    let changeInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    let onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={changeInputValueHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    let removeTaskHandler = () => {
                        props.removeTask(t.id)
                    }

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={removeTaskHandler}>x
                        </button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={() => {
                props.changeFilter("all")
            }}>
                All
            </button>
            <button onClick={() => {
                props.changeFilter("active")
            }}>
                Active
            </button>
            <button onClick={() => {
                props.changeFilter("completed")
            }}>
                Completed
            </button>
        </div>
    </div>
}
