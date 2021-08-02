import { useState } from "react";

// Material UI 
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles'

// Pages
import AuthPage from "./pages/authentication/auth.page";
import MainPage from "./pages/main/main.page";

import './App.css';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#078f61",
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});


function App() {
  const [accessCode, setAccessCode] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {accessCode === "" &&
          <AuthPage 
            onAuth={(newAccessCode) => {
              setAccessCode(newAccessCode);
            }}
          />
        }
        {accessCode !== "" &&
          <MainPage 
            accessCode={accessCode}
            logout={()=> {setAccessCode("")}} 
          />
        }
          
      </div>
    </ThemeProvider>
  );
}

export default App;
