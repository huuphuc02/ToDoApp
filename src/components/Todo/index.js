import { useRef, useState } from 'react'
import styles from './ToDo.module.css'
import { useDispatch } from 'react-redux'
import todosSlice from '../../redux/todosSlice'
import { v4 as uuidv4 } from 'uuid';
import { dateToday, formValidate } from '../../utils';

export default  function ToDo({id, name, description, priority, dueDate, btn}){
    const [todoName, setTodoName] = useState('')
    const [todoDescription, setTodoDescription] = useState('')
    const [todoPriority, setTodoPriority] = useState('')
    const [todoDueDate, setTodoDueDate] = useState('')

    const nameRef = useRef()
    const descriptionRef = useRef()
    const priorityRef = useRef()
    const dueDateRef = useRef()

    const dispatch = useDispatch()

    const handleAddTodo = (e) => {
        e.preventDefault()
        const newTodo = {
            id: uuidv4(),
            name: todoName,
            priority: todoPriority === '' ? 'normal' : todoPriority,
            description: todoDescription,
            date: todoDueDate === '' ? dateToday : todoDueDate,
        }

        if(formValidate(newTodo.name, newTodo.date)){
            console.log(newTodo);
            dispatch(
                todosSlice.actions.addTodo(newTodo)
            )
            alert('Add new todo successfully!')
            nameRef.current.value = ''
            descriptionRef.current.value = ''
            dueDateRef.current.value = dateToday
            priorityRef.current.value = 'normal'
            
            setTodoName('')
            setTodoDescription('')
            setTodoPriority('normal')
            setTodoDueDate(dateToday)
        }
    }

    const handleUpdateTodo = (e) => {
        e.preventDefault()
        const updatedTodo = {
                id: id,
                name: todoName === '' ? name : todoName,
                priority: todoPriority === '' ? priority : todoPriority,
                description: todoDescription === '' ? description : todoDescription,
                date: todoDueDate === '' ? dueDate : todoDueDate,
        }

        if(formValidate(updatedTodo.name, updatedTodo.date)){
            console.log(updatedTodo.name, updatedTodo.priority, updatedTodo.description, updatedTodo.dueDate);
            dispatch(
                todosSlice.actions.updateTodo(updatedTodo)
            )
            alert('Update todo successfully!')
        }
    }

    return(
    <form>
        {name === '' ? 
            <input type="text" placeholder = 'Add new task...' className={styles.taskname} 
                onChange={(e) => setTodoName(e.target.value)} defaultValue={todoName}
                ref={nameRef}/>
        :   <input type="text" defaultValue={name} className={styles.taskname} 
                onChange={(e) => setTodoName(e.target.value)}/>
        }

        <div className={description}>
            <label htmlFor={styles.descripBox}>Description</label><br />
            <textarea id={styles.descripBox} onChange={(e) => setTodoDescription(e.target.value)}
                ref={descriptionRef}
            >{description}</textarea>
        </div>

        <div style={{display: "flex", marginTop: "20px"}}>
            <div className={styles.dueDate}>
                <label htmlFor={styles.date}>Due Date</label><br />
                <input type="date" id={styles.date} onChange={(e) => setTodoDueDate(e.target.value)} 
                    defaultValue={dueDate === '' ? dateToday : dueDate}
                    ref={dueDateRef}
                    />
            </div>

            <div className={styles.priority}>
                <label htmlFor={styles.priorityInp}>Priority</label>
                <br />
                <select name="priority" id={styles.prioritySelect} defaultValue={priority} 
                    onChange={(e) => setTodoPriority(e.target.value)}
                    ref={priorityRef}>
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                </select>
            </div>

        </div>

        <button type='submit' className={styles.btnAdd} 
            onClick={btn === 'Add' ? handleAddTodo : handleUpdateTodo}>{btn}</button>
    </form>       
    )
}