import React from "react";
import { BsCircle, BsCheckCircle } from "react-icons/bs";

const TodoItem = ({ text, isComplete, id, markTodo, tag }) => {
  return (
    <>
      <span className="tag">{tag}</span>
      <li
        className={isComplete ? "todo-item completed" : "todo-item"}
        onClick={() => markTodo(id)}
      >
        {isComplete ? (
          <BsCheckCircle className="circle-icon" />
        ) : (
          <BsCircle className="circle-icon" />
        )}
        <span>{text}</span>
      </li>
    </>
  );
};

export default TodoItem;
