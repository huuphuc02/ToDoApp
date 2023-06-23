import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: 'todoList',
    initialState: [
        {
            id: 1,
            name: 'Do homework',
            priority: 'high',
            description: 'Read documents, do exercises',
            date: "2023-06-23"
        },
        {
            id: 2,
            name: 'Do housework',
            priority: 'normal',
            description: 'Wash dishes, clean the house',
            date: "2023-06-25"
        },
        {
            id: 3,
            name: 'Learn something',
            priority: 'low',
            description: 'Learn React, Redux',
            date: "2023-06-28"
        }
    ],
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload);
          },
        removeTodo: (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload);
            if (index !== -1) {
              state.splice(index, 1);
            }
          },
        updateTodo: (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1){
                state[index] = action.payload
            }
        }
    }
})