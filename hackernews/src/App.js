import React from "react";
import "./App.css";

// Component imports
import Main from "./components/core/Main";
import Navigation from "./components/presentational/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Main />
    </div>
  );
}

export default App;
