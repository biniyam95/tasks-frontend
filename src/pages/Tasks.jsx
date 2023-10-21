import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/tasks");
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTasks();
  }, []);

  console.log(tasks);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/task/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1> task </h1>
      <div className="tasks">
        {tasks.map((task) => (
          <div key={task.id} className="task">
            
            <h2>{task.title}</h2>
            <p>{task.desc}</p>
            <span>${task.priority}</span>
            <button className="delete" onClick={() => handleDelete(task.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${task.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new task
        </Link>
      </button>
    </div>
  );
};

export default Tasks;
