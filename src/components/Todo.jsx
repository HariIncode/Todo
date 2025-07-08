import { useState, useEffect } from "react";
import axios from "axios";

const api = process.env.REACT_APP_API_URL;

function Todo() {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await axios.get(api);
      setTask(response.data);
      console.log("FetchTask -->", response.data);
      console.log("FetchTask All Task -->", task);
    } catch (err) {
      console.error(`Cannot Fetch Tasks ${err}`);
    }
  };

  const handleNewTask = async (e) => {
    e.preventDefault();

    //If there is no Task i.e empty String
    if (!newTask.trim()) {
      console.error("Please enter a Task!!");
      return;
    }

    try {
      const response = await axios.post(api, { name: newTask });
      console.log("HandleNewTask -->", response);
      setTask([...task, response.data]);
      setNewTask("");
    } catch (err) {
      console.error(`Error Cannot add a New Task: ${err}`);
    }
  };

  const handleToggleCompleted = async (id, status) => {
    try {
      const response = await axios.put(`${api}/${id}`, { completed: !status });

      setTask(
        task.map((t) =>
          t._id === id ? { ...t, completed: response.data.completed } : t
        )
      );

      console.log("HandleToggleComplete -->", task);
    } catch (err) {
      console.error(`Unable to UPDATE the Status: ${err}`);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${api}/${id}`);
      setTask(task.filter((t) => t._id !== id));
    } catch (err) {
      console.error(`Unable to Delete a Task: ${err}`);
    }
  };

  return (
    <>
      <div className="container">
        <h1>TODO Task Manager</h1>

        {/* Form to Add Tasks */}
        <form onSubmit={handleNewTask}>
          <input
            type="text"
            placeholder="Enter the Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />

          <button type="submit" className="add-task">
            Add Task
          </button>
        </form>

        <ul>
          {task.map((t) => (
            <li key={t._id}>
              <span
                onClick={() => handleToggleCompleted(t._id, t.completed)}
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
              >
                {t.name}
              </span>

              <button onClick={() => handleDeleteTask(t._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Todo;
