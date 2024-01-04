import { AddItem } from "./addItem"
import { Row } from "react-bootstrap"
// import { ItemList } from "./itemList"
import { ItemCard } from "./itemCard"
import { useEffect } from "react";
// import { useEffect } from "react"



export const Items = ({userName,setHome,menus,setMenus}) =>{
    return(
        <div>
            <div style={{
                display: 'flex',
            }}>
                <h4>Welcome {userName}</h4>
                
            </div>
            <hr/>
            <Row style={{ 
                display: 'flex',
                padding: '2%'
                }}>
                {/* <ItemList
                    menus={menus} 
                /> */}
                
                {menus.map(menu =>
                        <ItemCard
                            menu={menu}
                            userName={userName}
                        />
                )}
            
                <AddItem 
                    setHome={setHome}
                    setMenus={setMenus}
                />  
            </Row>
        </div>
    )
}