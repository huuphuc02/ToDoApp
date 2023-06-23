import { createSelector } from "@reduxjs/toolkit";

export const todoListSelector = (state) => state?.todoList;

export const todosRemainingSelector = createSelector(
    todoListSelector
)