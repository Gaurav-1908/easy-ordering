import React, {useState} from "react";
import { AddMenu } from "../components/addMenu";
import { Items } from "../components/Items"
import { Navigate } from 'react-router-dom'
// import { Login } from "./Login";

export const Home = ({userName,menus,setMenus}) =>{
    const [home, setHome] = useState(1)
   
    return(
        <div>
            {!userName ?
                <Navigate to="/Login" />
            :
            <div style={{padding: '2%'}}>
            {home ?
                <Items
                    userName={userName}
                    setHome={setHome}
                    menus={menus}
                    setMenus={setMenus}
                />
            :
                <AddMenu
                    userName={userName} 
                    setHome={setHome}
                    setMenus={setMenus}
                />
            }
            
        </div>
            }
            
        </div>

        
        
        
    )
}