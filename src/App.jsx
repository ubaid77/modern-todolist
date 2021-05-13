import { TodosProvider } from "./todosContext";
import TodoListContainer from "./Containers/TodoListContainer";
import Header from "./Containers/Header";
import AddTodo from "./Components/AddTodo";

function App() {
  return (
    <div className="app">
      <TodosProvider>
        <div className="main">
          <Header />
          <TodoListContainer />
          <AddTodo />
        </div>
      </TodosProvider>
    </div>
  );
}

export default App;
