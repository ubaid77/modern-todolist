import React, { useState, useContext } from "react";
import { MdAdd } from "react-icons/md";
import { TodosContext } from "../todosContext";

const AddTodo = () => {
  const { addTodo } = useContext(TodosContext);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});
  const REG_EX = /(^|\s)(#[a-z\d-]+)/gi;

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
    let hashTags = [];
    let match;
    while ((match = REG_EX.exec(text))) {
      hashTags.push(match[0]);
    }
    addTodo(text, hashTags);
    setText("");
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
