const API_BASE_URL = "http://localhost:5090"; // Deine API-Base-URL

// GET: Holt alle ToDos
export const fetchTodos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/ToDo`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching ToDos:', error);
    throw error;
  }
};

// GET: Holt ein ToDo nach ID
export const fetchTodoById = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ToDo/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ToDo with id ${id}:`, error);
    throw error;
  }
};

// POST: Erstellt ein neues ToDo
export const createTodo = async (todo: { task: string, isCompleted: boolean }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ToDo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating ToDo:', error);
    throw error;
  }
};

// PUT: Aktualisiert ein ToDo nach ID
export const updateTodo = async (id: number, updatedTodo: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ToDo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    });

    if (response.status === 204) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating ToDo:", error);
    throw error;
  }
};

// DELETE: Löscht ein ToDo nach ID
export const deleteTodo = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ToDo/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    if (response.status !== 204) {
      return await response.json();
    }

    return;
  } catch (error) {
    console.error(`Error deleting ToDo with id ${id}:`, error);
    throw error;
  }
};
