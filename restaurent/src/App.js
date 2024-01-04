import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import React, {useState} from "react"
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
// import { w3cwebsocket  } from "websocket";
// const client = new w3cwebsocket('ws://localhost:8000');

function App() {
  // client.onopen = () => {
  //   console.log('WebSocket Client Connected to',client.url);
  // };
  const [userName,setUserName] = useState('');
  const [menus,setMenus] = useState([]);
  // const [st,setst] = useState("")
  console.log("in app")
  // console.log("user",userName)
  return (
    // <Row>
    //   {!userName ?
        
    //     <Login
    //       setUserName={setUserName}
    //       setMenus={setMenus}
    //     />
    //     :
    //     <Home 
    //       userName={userName}
    //       menus={menus}
    //       setMenus={setMenus}
    //     />
    //   }

    // </Row>

    <>
            {/* This is the alias of BrowserRouter i.e. Router */}
            <Router>
                <Routes>
                    {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
                    <Route
                        exact
                        path="/"
                        element={<Home 
                          userName={userName}
                          menus={menus}
                          setMenus={setMenus}
                        />}
                    />

                    <Route
                        path="/Login"
                        element={<Login 
                          setUserName={setUserName}
                          setMenus={setMenus}
                          username={userName}
                        />}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/" />}
                    />
                </Routes>
            </Router>
        </>
  );
}

export default App;
