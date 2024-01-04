import {  Row ,Col} from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import { useState,useEffect } from "react";

export const ItemCard = ({menu,userName}) =>{
    const [profilePhotoUrl, setProfilePhotoUrl] = useState('');

    useEffect(() => {
        // Fetch the profile photo URL from the server
        const fetchProfilePhoto = async () => {
          try {
            const response = await fetch(`http://localhost:8000/getImage/${userName}/${menu.name}`);
            if (response.ok) {
              setProfilePhotoUrl(`http://localhost:8000/getImage/${userName}/${menu.name}`);
            } else {
              console.error('Failed to fetch profile photo');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchProfilePhoto();
      },[menu]);
    return(
        <div style={{
            height: '300px',
            width: '250px',
            border: 'solid 1px',
            backgroundColor: 'white',
            color: 'black',
            margin: '10px',
            paddingTop: '1px'
            // paddingBottom: '10px'
        }}>
            <div style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
            }}>
            <Image src={profilePhotoUrl} fluid
                style={{
                    height: '200px',
                    width: '200px'
                }}
            />
            </div>
            <Row>
                <Col><b>{menu.name}</b></Col>
                <Col style={{
                    textAlign:'right'
                }}>${menu.price}</Col>
            </Row>
            <p style={{
                color:'gray',
                fontSize:'12px',
                marginBottom: '0px'
            }}>{menu.type}</p>
            <p>{menu.desc}</p>
            
        </div>
    )
}