import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [task, setTask] = useState({
    title: "",
    desc: "",
    priority: "",
   
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const taskId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/tasks/${taskId}`, task);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the task</h1>
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
        placeholder="task priority"
        name="priority"
        onChange={handleChange}
      />
     
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all tasks</Link>
    </div>
  );
};

export default Update;
