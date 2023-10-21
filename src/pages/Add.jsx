import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [task, setTask] = useState({
    title: "",
    desc: "",
    priority: "",
    
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/task/create", task);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Add New task</h1>
      <input
        type="text"
        placeholder="task title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="task desc"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="task priotity"
        name="priority"
        onChange={handleChange}
      />
      
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all tasks</Link>
    </div>
  );
};

export default Add;
