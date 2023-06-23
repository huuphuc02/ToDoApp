import { configureStore } from '@reduxjs/toolkit';
import todosSlice from './todosSlice';

const store = configureStore({
  reducer: {
    todoList: todosSlice.reducer,
  },
  preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todoList', serializedState);
  } catch (error) {
    console.error('Error saving state to LocalStorage:', error);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('todoList');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from LocalStorage:', error);
    return undefined;
  }
}

export default store;
