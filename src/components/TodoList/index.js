import { Fragment, useEffect, useState } from 'react';
import styles from './ToDoList.module.css';
import { todoListSelector } from '../../redux/selector';
import { useDispatch, useSelector } from 'react-redux';
import todosSlice from '../../redux/todosSlice';
import ToDo from '../Todo';
import { compareDate } from '../../utils';

export default function ToDoList (){
    const [detail, showDetail] = useState(false);
    const [id, setId] = useState();
    const [searchInput, setSearchInput] = useState('')
    const listTodos = useSelector(todoListSelector);
    const [sortedListTodos, setSortedListTodos] = useState(listTodos);
    const [selectedTodos, setSelectedTodos] = useState([])

    const dispatch = useDispatch();

    useEffect(() => {
        const sortedListTodos = [...listTodos].sort((a, b) =>
          compareDate(a.date, b.date)
        );
        setSortedListTodos(sortedListTodos);
      }, [listTodos]);

    const handleRemoveTodo = (id) => {
        if(window.confirm('Are you sure want to remove this todo?')){
            dispatch(todosSlice.actions.removeTodo(id))
            alert('Delete todo successfully!')
        }
    }
    
    const handleSearchTodo = (keyword) => {
        showDetail(false)
        if(keyword===''){
            setSortedListTodos(listTodos)
            return;
        }
        const filteredListTodos = sortedListTodos.filter(
            todo => todo.name.toLowerCase().includes(keyword.toLowerCase()))
        setSortedListTodos(filteredListTodos)
    }

    const handleCheckboxChange = (e, id) => {
        showDetail(false)
        const isChecked = e.target.checked;

        if (isChecked) {
          setSelectedTodos((prevSelected) => [...prevSelected, id]);
        } 
        else {
          setSelectedTodos((prevSelected) =>
            prevSelected.filter((selectedId) => selectedId !== id)
          );
        }
      };
    
    const handleBulkRemove = () => {
        if (window.confirm('Are you sure want to remove selected todos?')) {
          selectedTodos?.forEach((id) => {
            dispatch(todosSlice.actions.removeTodo(id));
          });
          alert('Delete selected todos successfully!');
          setSelectedTodos([]);
        }
      };
    
    return(
        <div className={styles.toDoList}>
            <h2>To Do List</h2>
            <div style={{width: "max-content"}}>
                <input type="text" id={styles.searchInput} placeholder='Search...' 
                onChange={e => {
                    setSearchInput(e.target.value);
                    handleSearchTodo(e.target.value)
                }}/>
                <div>
                    {
                        sortedListTodos?.map((todo, index) => { 
                            return(
                                <div>
                                <div key={index} className={styles.todo}>
                                    <input type="checkbox" id={styles.check}
                                        onChange={(e) => handleCheckboxChange(e, todo.id)}
                                        checked={selectedTodos.includes(todo.id)}
                                    />
                                    <p className={styles.todoName}>{todo.name}</p>

                                    <button className={styles.btnDetail} onClick={() => {
                                        showDetail(true)
                                        setId(todo.id)
                                        }}>Detail</button>
                                        
                                    <button className={styles.btnRemove} 
                                            onClick={() => handleRemoveTodo(todo.id)}
                                        >Remove</button>
                                </div>
    
                                 { ( detail && id === todo.id) ? (
                                        <div className={styles.todoDetail}>
                                        <ToDo
                                            id={todo.id}
                                            name={todo.name}
                                            description={todo.description}
                                            priority={todo.priority}
                                            dueDate={todo.date}
                                            btn='Update'
                                        />
                                        </div>
                                  ) : Fragment}
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {selectedTodos.length > 0 ? (
                <div className={styles.bulkArea}>
                    <h3>Bulk Action: </h3>
                    <button className={styles.btnDone}>Done</button>
                    <button className={styles.btnRemove2} onClick={handleBulkRemove}>Remove</button>
                </div>
            ) : Fragment}  
        </div>
    )
}