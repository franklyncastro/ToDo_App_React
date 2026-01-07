import { useState, useEffect } from "react";
import "./App.css";
import img from "./assets/list.png";

function App() {
  //?
  const [task, setTask] = useState(() => {
    const saveTask = localStorage.getItem("task");
    return saveTask ? JSON.parse(saveTask) : [];
  });

  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  const handleChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const addTask = () => {
    if (text.trim() === "") return;

    const addnewTask = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    setTask([...task, addnewTask]);
    setText("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const deleteTask = (id) => {
    setTask(task.filter((t) => t.id !== id));
  };

  // const togglecheck = (id) => {
  //   setTask(
  //     task.map((t) => (t.id === id ? { ...task, completed: !t.completed } : t))
  //   );
  // };

  return (
    <div className="container">
      <div className="sketch-background">
        <div className="sketch-container">
          <div className="titleView">
            <img src={img} alt="listPic" width={75} className="animate__animated animate__bounce"/>
            <div className="sketch-title animate__animated animate__bounce">To-Do List!</div>
          </div>
          <div className="add">
            <input
              type="text"
              value={text}
              onChange={handleChange}
              onKeyDown={onKeyDown}
              placeholder="Add Task"
              className="addInput"
            />
            <button onClick={addTask} className="addbtn">
              <i className="fa-solid fa-circle-plus"></i>
            </button>
          </div>

          {task.map((t) => (
            <div key={t.id} className="sketch-item">
              <label className="sketch-label animate__animated animate__backInDown">
                <input
                  type="checkbox"
                  className="sketch-input" /*  checked={t.completed} onChange={()=> togglecheck(t.id)}*/
                />
                <div className="custom-checkbox-sketch">
                  <svg className="checkmark-svg-sketch" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="sketch-text">{t.text}</span>
              </label>
              <button className="btn" onClick={() => deleteTask(t.id)}>
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
