import ToDo from '../Todo'
import styles from './NewTask.module.css'

export default function AddNewTask(){
    return(
        <div className={styles.newTask}>
            <h2>New Task</h2>
            <ToDo id = {null}
                name=''
                description=''
                priority='normal'
                dueDate=''
                btn = 'Add'
            />
        </div>
    )
}