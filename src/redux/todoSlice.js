import { createSlice, current } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: action.payload.id,
        content: action.payload.content,
        completed: false,
      };

      state.todos.push(todo);
    },
    editTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload?.id
      );

      state.todos[index].content = action.payload.content;
    },
    completeTodo: (state, action) => {
      const todos = [...state.todos];
      const index = todos.findIndex((todo) => todo.id == action.payload);

      if (index !== -1) {
        todos[index].completed = !todos[index].completed;
      }
    },
    deleteTodo: (state, action) => {
      const todos = state.todos.filter((todo) => todo.id !== action.payload);
      state.todos = todos;
    },
  },
});

// this is for dispatch
export const { addTodo, editTodo, deleteTodo, completeTodo } =
  todoSlice.actions;

// this is for configureStore
export default todoSlice.reducer;
