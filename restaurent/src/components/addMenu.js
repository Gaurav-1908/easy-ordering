import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const AddMenu = ({userName,setHome,setMenus}) =>{
    // console.log("add Menu")
    const [price,setPrice] = useState(0);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [desc,setDesc] = useState('');
    const [image, setImage] = useState(null);

    const handleNameChange = event => {
        setName(event.target.value)
    }

    const handlePriceChange =  event =>{
        setPrice(event.target.value)
    }
    const handletypeChange =  event =>{
        setType(event.target.value)
    }

    const handleDescChange =  event =>{
        setDesc(event.target.value)
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
      };

    async function submit(){
        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('name',name);
        formData.append('price',price);
        formData.append('type',type);
        formData.append('desc',desc);
        formData.append('profilePhoto', image);
        try {
            const response = await fetch('http://localhost:8000/add-menu', {
              method: 'POST',
              body: formData,
            })
            .then(function(response) {
                // console.log(response)
                return response.json();
            })
            .then(function(responseData){
                // console.log(responseData);
                if(responseData.error){
                    console.log(response.error)
                }
                else{
                    // setUserName(userName);
                    // setMenus(responseData.menus)
                    setMenus(responseData)
                    console.log(responseData)
                } 
                
            })
      
            // Handle the server response
            // console.log('Server response:', await response.json());
          } catch (error) {
            console.error('Error:', error);
          }
        // console.log(name,price,type,desc);
        // const data = {
        //     userName: userName,
        //     name: name,
        //     price: price,
        //     type: type,
        //     desc: desc
        // }
        // fetch('http://localhost:8000/add-menu', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //       },
        //     body: JSON.stringify(data)
        // })
        // .then(function(response) {
        //     console.log(response)
        //     return response.json();
        // })
        // .then(function(responseData){
        //     console.log(responseData);
        //     setMenus(responseData);
        // });
        setHome(1);
    }
    return(
        <div style={{
            width: '100%',
            paddingTop: '5%',
            paddingLeft: '35%',
            paddingRight: '35%',
            // border:'solid'
        }}>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Control type="text" value={name} onChange={handleNameChange} placeholder="Name" required/>
                </Form.Group>
        
                <Form.Group className="mb-3">
                    <Form.Control type="number" value={price} onChange={handlePriceChange} placeholder="Price" required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control type="text" value={type} onChange={handletypeChange} placeholder="Type" required/>
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleFileChange}/>
                </Form.Group>

                <Form.Group>
                <Form.Label>Enter Description</Form.Label>
                    <Form.Control as="textarea" value={desc} onChange={handleDescChange} aria-label="With textarea" />
                </Form.Group>

                <Button 
                    variant="primary" 
                    type="button"
                    onClick={() => submit()}
                    style={{
                        width: '100%',
                        marginTop: '5%'
                    }}
                >
                    Add 
                </Button>
            </Form>
        </div>
    )
}
