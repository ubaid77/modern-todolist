import React, { useState, useContext } from "react";
import { MdAdd } from "react-icons/md";
import { TodosContext } from "../todosContext";

const AddTodo = () => {
  const { addTodo } = useContext(TodosContext);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [hashtag, setHashTag] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    if (text === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        text: "Please enter some text",
      }));
      return;
    }
    if (hashtag === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        hashtag: "Please add a hashtag",
      }));
      return;
    }
    if (hashtag !== "" && hashtag.split("")[0] !== "#") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        hashtag: "Please add # to hashtag",
      }));
      return;
    }
    addTodo(text, hashtag);
    setText("");
    setHashTag("");
    setErrors({});
    setOpen(false);
  };

  return (
    <>
      <div className={open ? "add-todo-box open" : "add-todo-box"}>
        <form onSubmit={handleSubmit}>
          <div className="form-grp">
            <input
              type="text"
              placeholder="Enter new task"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {errors && <span className="error">{errors?.text}</span>}
          </div>
          <div className="form-grp">
            <label htmlFor="hashtag">Add Hashtag</label>
            <input
              type="text"
              placeholder="#work"
              value={hashtag}
              onChange={(e) => setHashTag(e.target.value)}
            />
            {errors && <span className="error">{errors?.hashtag}</span>}
          </div>
          <button type="submit" className="btn add">
            Add
          </button>
        </form>
      </div>

      <button
        className={open ? "add-todo btn rotate" : "add-todo btn"}
        onClick={() => setOpen((prev) => !prev)}
      >
        <MdAdd />
      </button>
    </>
  );
};

export default AddTodo;
