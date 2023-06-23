import './App.css';
import AddNewTask from './components/AddNewTask';
import ToDoList from './components/TodoList';

function App() {
  return (
    <div className="App">
        <AddNewTask/>
        <ToDoList/>
    </div>
  );
}

export default App;
