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
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    setGroupedTodos(groupBy(todos));
  }, [todos]);

  /*
  Creates new todo & save to localstorage
  @params {text} string, {hashtag} string
  */
  const addTodo = (text, hashtags) => {
    const newTodo = {
      id: uuid(),
      text,
      hashtag: hashtags,
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
  Add Tag
  Add Hash Tag to selected hashtag array
  */
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      return;
    }
    selectedTags.push(` ${tag}`);
    setSelectedTags([...selectedTags]);
  };

  /*
  Remove Tag
  Remove selected tag from selected hashtags array
  */
  const removeTag = (index) => {
    selectedTags.splice(index, 1);
    setSelectedTags([...selectedTags]);
  };

  /*
  Return Stacked todo list grouped by hashtags
  */
  const returnTaggedTodos = () => {
    const taggedTodos = [];

    // eslint-disable-next-line
    Object.keys(groupedTodos).map((gTodo) => {
      // eslint-disable-next-line
      if (gTodo === "") return;

      if (selectedTags.every((v) => gTodo.split(",").includes(v))) {
        taggedTodos.push(...groupedTodos[gTodo]);
      }
    });

    return taggedTodos;
  };

  /*
  Remove todos from localstorage & reset states
  */
  const clearTodos = () => {
    localStorage.removeItem("task_list");
    setTodos([]);
    setSelectedTags([]);
    setGroupedTodos(null);
  };

  const state = {
    todos: selectedTags.length > 0 ? returnTaggedTodos() : todos,
    selectedTags,
    groupedTodos,
  };

  return (
    <TodosContext.Provider
      value={{
        todos: state.todos,
        selectedTags: state.selectedTags,
        addTodo,
        markTodo,
        toggleTag,
        removeTag,
        clearTodos,
      }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};
