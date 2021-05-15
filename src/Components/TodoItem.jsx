import React from "react";
import { BsCircle, BsCheckCircle } from "react-icons/bs";

const TodoItem = ({ text, isComplete, id, markTodo, tags, addTag }) => {
  const handleTagClick = (e, tag) => {
    e.stopPropagation();
    addTag(tag);
  };
  return (
    <>
      <span className="tag">{tags.join()}</span>
      <li
        className={isComplete ? "todo-item completed" : "todo-item"}
        onClick={() => markTodo(id)}
      >
        {isComplete ? (
          <BsCheckCircle className="circle-icon" />
        ) : (
          <BsCircle className="circle-icon" />
        )}
        <span>
          {text.split(" ").map((str) => {
            if (str.startsWith("#")) {
              return (
                <span
                  style={{ color: "blueviolet" }}
                  onClick={(e) => handleTagClick(e, str)}
                >
                  {str}{" "}
                </span>
              );
            }
            return str + " ";
          })}
        </span>
      </li>
    </>
  );
};

export default TodoItem;
