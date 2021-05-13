import { useState, createContext, useEffect } from "react";
import { groupBy } from "./helpers/groupByHash";
import { uuid } from "uuidv4";

export const TodosContext = createContext();

export const TodosProvider = (props) => {
  // Check localstorage for saved tasks if any
  const initialTodos = localStorage.getItem("task_list")
    ? JSON.parse(localStorage.getItem("task_list"))
    : [];

  /*
    Initial States
    todos- todo list, groupedTodos- Todos grouped by hashtags, selectedTags- selected hashtags
  */
  const [todos, setTodos] = useState(initialTodos);
  const [groupedTodos, setGroupedTodos] = useState(null);
  const [selectedTags, setSelectedTags] = useState(["all"]);

  /*
    Group todos by Hashtags
    @see- group by in helpers/groupBy
  */
  useEffect(() => {
    setGroupedTodos(groupBy(todos));
  }, [todos]);

  /*
  Creates new todo & save to localstorage
  @params {text} string, {hashtag} string
  */
  const addTodo = (text, hashtag) => {
    const newTodo = {
      id: uuid(),
      text,
      hashtag,
      isComplete: false,
      createdAt: new Date().toISOString(),
      completedAt: "",
    };
    todos.unshift(newTodo);
    setTodos([...todos]);
    localStorage.setItem("task_list", JSON.stringify(todos));
  };

  /*
  Marks todo as complete or incomplete
  @params {id} number
  */
  const markTodo = (id) => {
    const toBeMarked = todos.splice(
      todos.findIndex((x) => x.id === id),
      1
    )[0];
    toBeMarked.isComplete = !toBeMarked.isComplete;
    toBeMarked.completedAt = new Date().toISOString();
    todos.push(toBeMarked);
    sortTodos(todos);
  };

  /*
  Sort Todos
  sort uncompleted todos by creation & sort completed todos by updation
  */
  const sortTodos = (todos) => {
    const notCompleted = todos.filter((todo) => todo.isComplete === false);
    notCompleted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const completed = todos.filter((todo) => todo.isComplete === true);
    completed.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
    const updatedTodos = [...notCompleted, ...completed];

    setTodos(updatedTodos);

    localStorage.setItem("task_list", JSON.stringify(updatedTodos));
  };

  /*
  Select Tags to group the todos
  @params {tag} string
  */
  const toggleTag = (tag) => {
    if (tag === "all") {
      setSelectedTags(["all"]);
    }
    if (selectedTags.includes(tag)) {
      selectedTags.splice(selectedTags.indexOf(tag), 1);
      if (selectedTags.length === 0) {
        selectedTags.push("all");
      }
      setSelectedTags([...selectedTags]);
    } else {
      if (selectedTags.includes("all")) {
        setSelectedTags((prevTags) => {
          prevTags.splice(0, 1);
          return [...prevTags, tag];
        });
      } else {
        setSelectedTags((prevTags) => [...prevTags, tag]);
      }
    }
  };

  /*
  Return Stacked todo list grouped by hashtags
  */
  const returnTaggedTodos = () => {
    const taggedTodos = [];
    // eslint-disable-next-line
    selectedTags.map((tag) => {
      taggedTodos.push(...groupedTodos[tag]);
    });
    return taggedTodos;
  };

  /*
  Remove todos from localstorage & reset states
  */
  const clearTodos = () => {
    localStorage.removeItem("task_list");
    setTodos([]);
    setGroupedTodos(null);
    setSelectedTags(["all"]);
  };

  const state = {
    todos: selectedTags.includes("all") ? todos : returnTaggedTodos(),
    groupedTodos,
    selectedTags,
  };

  return (
    <TodosContext.Provider
      value={{
        todos: state.todos,
        groupedTodos: state.groupedTodos,
        selectedTags: state.selectedTags,
        addTodo,
        markTodo,
        toggleTag,
        clearTodos,
      }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};
