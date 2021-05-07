import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from './page/login.page';
import MainPage from "./page/main.page";

import './App.css';
import { useState } from "react";

function App() {
  const [id, setId] = useState("");


  return (
      <div className="App">
        {id === "" &&
          <LoginPage 
            onLogin={(newId)=> setId(newId)}
          />
        }
        {id !== "" &&
          <MainPage />
        }
      </div>
  );
}

export default App;
