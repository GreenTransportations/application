import { useState } from "react";

// Material UI 
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles'

// Pages
import LoginPage from './pages/authentication/login.page';
import MainPage from "./pages/main/main.page";

import './App.css';
import AuthPage from "./pages/authentication/auth.page";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#92D050",
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});


function App() {
  const [id, setId] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {id === "" &&
          <AuthPage 
            onLogin={(newId)=> setId(newId)}
          />
        }
        {id !== "" &&
          <MainPage 
            id={id}
            logout={()=> {setId("")}} 
          />
        }
          
      </div>
    </ThemeProvider>
  );
}

export default App;
