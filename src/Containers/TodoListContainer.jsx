import { useContext, useCallback } from "react";
import TodoItem from "../Components/TodoItem";
import { AiFillCloseCircle } from "react-icons/ai";
import { TodosContext } from "../todosContext";

const TodoListContainer = () => {
  const { todos, markTodo, clearTodos, toggleTag, removeTag, selectedTags } =
    useContext(TodosContext);

  const addTag = useCallback(
    (tag) => {
      toggleTag(tag);
    },
    [toggleTag]
  );

  return (
    <div className="list-container">
      <div className="clear-todos-bar">
        <button onClick={() => clearTodos()}>CLEAR TODOS</button>
      </div>
      <div className="tags-list">
        {selectedTags.length > 0 &&
          selectedTags.map((tag, index) => (
            <span className="tags">
              {tag} <AiFillCloseCircle onClick={() => removeTag(index)} />
            </span>
          ))}
      </div>

      <p className="subheading">Today's Tasks</p>
      <ul
        className="scrollbar"
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        {todos.length > 0 &&
          todos.map((item, index) => (
            <TodoItem
              key={item.id}
              id={item.id}
              text={item.text}
              isComplete={item.isComplete}
              markTodo={markTodo}
              tags={item.hashtag}
              addTag={addTag}
            />
          ))}
      </ul>
    </div>
  );
};

export default TodoListContainer;
