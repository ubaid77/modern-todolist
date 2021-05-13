import { useContext } from "react";
import TodoItem from "../Components/TodoItem";
import { TodosContext } from "../todosContext";

const TodoListContainer = () => {
  const { todos, groupedTodos, markTodo, toggleTag, selectedTags, clearTodos } =
    useContext(TodosContext);

  return (
    <div className="list-container">
      {todos.length > 0 && (
        <>
          <div className="clear-todos-bar">
            <p className="subheading">hashtags</p>
            <button onClick={() => clearTodos()}>CLEAR TODOS</button>
          </div>

          <ul className="tags-list">
            <li
              className={selectedTags.includes("all") ? "selected" : ""}
              onClick={() => toggleTag("all")}
            >
              <h2>All</h2>
              <p>{todos.length} tasks</p>
            </li>

            {groupedTodos && // eslint-disable-next-line
              Object.keys(groupedTodos).map((gtodo) => {
                if (gtodo !== "")
                  return (
                    <li
                      className={selectedTags.includes(gtodo) ? "selected" : ""}
                      onClick={() => toggleTag(gtodo)}
                    >
                      <h2>{gtodo}</h2>
                      <p>{groupedTodos[gtodo].length} tasks</p>
                    </li>
                  );
              })}
          </ul>
        </>
      )}

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
              tag={item.hashtag}
            />
          ))}
      </ul>
    </div>
  );
};

export default TodoListContainer;
