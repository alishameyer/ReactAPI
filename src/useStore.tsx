import { create } from "zustand";

// Definiert das Interface für das ToDo-Item
interface ToDoItem {
  id: number;
  task: string;
  isCompleted: boolean;
}

interface StoreState {
  todos: ToDoItem[];
  newTodo: string;
  todoId: number;
  selectedTodo: ToDoItem | null;
  setTodos: (todos: ToDoItem[]) => void;
  setNewTodo: (newTodo: string) => void;
  setTodoId: (todoId: number) => void;
  setSelectedTodo: (selectedTodo: ToDoItem | null) => void;
}

const useStore = create<StoreState>((set) => ({
  todos: [],
  newTodo: "",
  todoId: 0,
  selectedTodo: null,
  setTodos: (todos: ToDoItem[]) => set({ todos }),
  setNewTodo: (newTodo: string) => set({ newTodo }),
  setTodoId: (todoId: number) => set({ todoId }),
  setSelectedTodo: (selectedTodo: ToDoItem | null) => set({ selectedTodo }),
}));

export default useStore;
