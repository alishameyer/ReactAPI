import React, { useEffect } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo, fetchTodoById } from "./ApiServices";
import useStore from "./useStore"; // Zustand Store importieren
import './App.css';

const ApiComponent: React.FC = () => {
  const {
    todos, setTodos,
    newTodo, setNewTodo,
    todoId, setTodoId,
    selectedTodo, setSelectedTodo,
  } = useStore(); // Zugriff auf den Zustand-Store

  const pastelColors = ['#FFB6C1', '#ADD8E6', '#DDA0DD', '#E0FFFF', '#AFEEEE', '#B0C4DE'];

  // Holt alle ToDos beim Laden der Komponente (GET)
  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await fetchTodos();  // API-Aufruf zum Laden der Todos
        setTodos(data);  // Speichert die Todos im Zustand-Store
      } catch (error) {
        console.error("Error loading ToDos:", error);
      }
    };
    getTodos();
  }, [setTodos]);

  // Holt ein ToDo nach ID (NEUE FUNKTION)
  const handleFetchTodoById = async () => {
    try {
      const data = await fetchTodoById(todoId);
      setSelectedTodo(data);  // Speichert das abgerufene ToDo im Zustand
    } catch (error) {
      console.error(`Error fetching ToDo with id ${todoId}:`, error);
    }
  };

  // Erstellt ein neues ToDo (POST)
  const handleCreateTodo = async () => {
    try {
      const todo = {
        task: newTodo,
        isCompleted: false,
      };
      const data = await createTodo(todo);  // API-Aufruf zum Hinzufügen eines neuen Todos
      setTodos([...todos, data]); // Fügt das neue ToDo im Store hinzu
      setNewTodo(""); // Setzt das Eingabefeld zurück
    } catch (error) {
      console.error("Error creating ToDo:", error);
    }
  };

  // Aktualisiert den Status eines ToDos (PUT)
  const handleToggleTodoStatus = async (id: number, currentStatus: boolean, task: string) => {
    try {
      const updatedTodo = { task: task, isCompleted: !currentStatus };
      await updateTodo(id, updatedTodo);  // API-Aufruf zum Aktualisieren des Todos
      const updatedTodos = await fetchTodos(); // Holt die aktualisierten Todos erneut
      setTodos(updatedTodos);  // Aktualisiert den Store mit den neuen Todos
    } catch (error) {
      console.error(`Error updating ToDo status with id ${id}:`, error);
    }
  };

  // Löscht ein ToDo nach ID (DELETE)
  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);  // API-Aufruf zum Löschen des Todos
      setTodos(todos.filter((todo) => todo.id !== id)); // Entfernt das gelöschte ToDo aus der Liste im Store
    } catch (error) {
      console.error(`Error deleting ToDo with id ${id}:`, error);
    }
  };

  // Generiere die ToDo-Karten
  const renderTodoCards = (filteredTodos: any[], startIndex = 0) => {
    let previousColor: string | null = null;
    return filteredTodos.map((todo, index) => {
      const color = pastelColors[(index + startIndex) % pastelColors.length];
      previousColor = color;

      return (
        <div key={todo.id} className="todo-card" style={{ backgroundColor: color }}>
          <h3 className="todo-title">{todo.task}</h3>
          <p className="todo-status">
            {todo.isCompleted ? "✔ Abgeschlossen" : "⏳ Offen"}
          </p>
          <div className="todo-actions">
            <button
              onClick={() => handleToggleTodoStatus(todo.id, todo.isCompleted, todo.task)}
              className={`button ${todo.isCompleted ? 'reopen' : 'complete'}`}
            >
              {todo.isCompleted ? "Auf Offen setzen" : "Abschließen"}
            </button>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="button delete">Löschen
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container">
      {/* Offene Aufgaben */}
      <h2>Offene Aufgaben</h2>
      <div className="todo-grid">
        {renderTodoCards(todos.filter(todo => !todo.isCompleted))}
      </div>

      {/* Abgeschlossene Aufgaben */}
      <h2 style={{ marginTop: '40px' }}>Abgeschlossene Aufgaben</h2>
      <div className="todo-grid">
        {renderTodoCards(todos.filter(todo => todo.isCompleted), todos.filter(todo => !todo.isCompleted).length)}
      </div>
      <div className="form-container">
        {/* Neues ToDo erstellen */}
        <div className="new-todo">
          <h3>Neues ToDo erstellen</h3>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Neue Aufgabe"
          />
          <button onClick={handleCreateTodo}>
            Hinzufügen
          </button>
        </div>

        {/* ToDo nach ID holen */}
        <div className="fetch-todo">
          <h3>ToDo nach ID holen</h3>
          <input
            type="number"
            value={todoId}
            onChange={(e) => setTodoId(Number(e.target.value))}
            placeholder="ToDo ID eingeben"
          />
          <button onClick={handleFetchTodoById}>
            ToDo anzeigen
          </button>
        </div>
      </div>
      {/* Anzeige des ausgewählten ToDos */}
      {selectedTodo && (
        <div className="todo-json">
          <h3>JSON Ausgabe:</h3>
          <pre>{JSON.stringify(selectedTodo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ApiComponent;
