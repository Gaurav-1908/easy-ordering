import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navigate,} from 'react-router-dom'
// import { w3cwebsocket  } from "websocket";

// const client = new w3cwebsocket('ws://localhost:8000');

export const Login= ({setUserName,setMenus,username,setst}) =>{
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState(1);
    const [error,setError] = useState("")

    const Login = 'Login';
    const Register = 'Register'

    // console.log("in Login")

    const handleUsernameChange = event => {
        setuserName(event.target.value)
    }

    const handlePasswordChange =  event =>{
        setPassword(event.target.value)
    }

    // client.onmessage = (message) =>{
    //     const dataFromServer = JSON.parse(message.data);
    //     console.log('data',dataFromServer)
    //     if(dataFromServer.error){
    //         setError(dataFromServer.error);
    //         setuserName("")
    //         setPassword("")
    //     }
    //     else{
    //         setUserName(dataFromServer.userName);
    //     }
        
    // }
    function submit(userName,password){
        const data = {
            
            userName: userName,
            password: password
        };
        const method= mode ? 'login' : 'register';
    
        fetch('http://localhost:8000/' + method, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
        })
        .then(function(response) {
            // console.log(response)
            return response.json();
        })
        .then(function(responseData){
            // console.log(responseData);
            if(responseData.error){
                setError(responseData.error);
            }
            else{
                setUserName(userName);
                setMenus(responseData.menus);

            } 
            
        })
        .catch(function(error) {
            // Handle any errors that occurred during the fetch or JSON parsing
            console.log(error)
            
        });

        // console.log('err',error);
        
        
          
    }

    function changeMode(){
        setMode(!mode);
        setError('')
    }
    

    return(
        <div>
            {username ?
                <Navigate to="/"/>
             : 

            <div style={{
            paddingLeft: '35%',
            paddingRight: '35%',
            paddingTop: '5%'
        }}>
            <div style={{
                paddingLeft: '10%',
                paddingRight: '10%',
                paddingBottom: "10%",
                border: 'solid 1px',
                textAlign: 'center'
            }}>
                <h2 style={{
                    padding:"10%"
                }}>Easy Ordering</h2>
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Control type="text" value={userName} onChange={handleUsernameChange} placeholder="Enter Username" required/>
                    </Form.Group>
            
                    <Form.Group className="mb-3">
                        <Form.Control type="password" value={password} onChange={handlePasswordChange} placeholder="Enter Password" required/>
                    </Form.Group>

                    <Button 
                        variant="primary" 
                        type="button"
                        onClick={() => submit(userName,password)}
                        style={{
                            width: '100%',
                            marginTop: '5%'
                        }}
                    >
                    {mode ? Login : Register}
                    </Button>
                </Form>
                <p style={{
                    color:"red",
                    textAlign: 'left'
                }}>{error}</p>
            </div>

            {/* {mode ?
            
                :
                hab=
            } */}
            <div style={{
                marginTop: '10%',
                border: 'solid 1px',
                paddingTop: '5%',
                paddingLeft: '20%',
                paddingBottom: '2%',
                display: 'flex',
                
                
            }}> 
                
                   
                    {mode ? <p>Don't have a Account?</p>
                    :
                    <p>Already have a Account &nbsp;</p>
                     }
                   
                
                
                    
                    <button 
                        style={{
                            backgroundColor: 'white',
                            border: '0px',
                            color: 'blue'
                        }}
                        onClick={() => changeMode()
                        }>
                            {mode ? <p>Create here </p>
                    :
                    <p>Login Here</p>
                }
                    </button>
                   
            </div>
        </div>
        }
        </div>
        
        
    )
}