import React from "react";
import logo from "./logo.svg";
import Welcome from "./pages/Welcome";
import TodoList from "./pages/TodoList";
import UserDetailsForm from "./pages/UserDetailsForm/UserDetailsForm";

function App() {
  return (
    <React.Fragment>
      <UserDetailsForm />
    </React.Fragment>
  );
}

export default App;
