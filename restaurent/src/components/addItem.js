import Button from 'react-bootstrap/Button';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { AddMenu } from './addMenu';

export const AddItem = ({setHome}) =>{
    function add(){
        setHome(0);
    }
    // console.log("add MEnu")
    return(
        
        <Button style={{
            height: '250px',
            width: '250px',
            border: 'solid 1px',
            backgroundColor: 'white',
            color: 'black',
            fontSize: '80px',
            paddingBottom: '10px',
            margin: '10px'
        }}
            onClick={() => add()}
        >
            +
        </Button>
    )
}