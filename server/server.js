// const webSocketsServerPort = 8000;
// const webSocketServer = require('websocket').server;
// const http = require('http');
// const { MongoClient } = require("mongodb");
// // require('dotenv').config()
// // let MongoClient = mongo.MongoClient;

// const server = http.createServer();
// server.listen(webSocketsServerPort);
// console.log('listening on port 8000');


// const wsServer = new webSocketServer({
//   httpServer: server
// });

// const client = new MongoClient('mongodb+srv://gauravgadkari1908:Gaurav2001@cluster0.uho6oha.mongodb.net/?retryWrites=true&w=majority');
// console.log(client)
// let count = 1
// const clients = {};

// // console.log(wsServer);
// wsServer.on('request', function (request){
//     console.log("connected",request.origin);
//     const connection = request.accept(null, request.origin);
    
//      connection.on('message', async function(message) {
//       const data = JSON.parse(message.utf8Data)
//       console.log('Received data: ', data);

//       // Login Process
//       if(data.method === 'login'){
//         const user = await login(data.userName,data.password);
//         if(user.userName){
//           connection.sendUTF(JSON.stringify(data))
//         }
//         else{
//           connection.sendUTF(JSON.stringify({error:user}));
//         }
//       }

//       // Register Process
//       else if(data.method === 'register'){
//         const user = await register(data.userName,data.password);
//         if(user === "User Exist"){
//           connection.sendUTF(JSON.stringify({error:user}));
//         }
//         else{
//           connection.sendUTF(JSON.stringify(data));
//         }
//       }

//      })
// })

// async function register(userName,passWord){
//   let user = ""
//   try {
//     const database = client.db('easyOrder');
//     const users = database.collection('restaurants');
//     let query = { userName:userName}
//     user = await users.findOne(query);
//     if(user){
//       return "User Exist";
//     }
//     query = { userName:userName,password:passWord };
//     user = await users.insertOne(query);
  
//   } catch(e) {
//     console.log(e)
//   }
//   return user;
// }


// async function login(userName,passWord){
//   let user = ''
//   try {
//     const database = client.db('easyOrder');
//     const users = database.collection('restaurants');
//     const query = { userName:userName};
//     user = await users.findOne(query);
//         if(user.password !== passWord){
//           return "Invalid Password"; 
//         }
//   }
//   catch(e){
//     return "Invalid Username";
//   }

//   return user;
// }


const express = require("express");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require("cors");
const { MongoClient, MongoTailableCursorError} = require("mongodb");
 
const app = express();
 
app.use(cors());
// parse application/json
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const client = new MongoClient('mongodb+srv://gauravgadkari1908:Gaurav2001@cluster0.uho6oha.mongodb.net/?retryWrites=true&w=majority');

app.listen(8000, () => {
  console.log("Server running successfully on 8000");
});

app.post('/login',async (req, res) => {
    console.log(req.body)
    const user = await login(req.body.userName, req.body.password);
    if(user.userName){
      const menus = await getMenu(req.body.userName);
      user.menus = menus;
      // console.log(user);
      res.json(user); 
    }
    else{
      res.json({error:user})
    }
});

app.post('/register',async (req,res) =>{
  // console.log(req.body);
  const user = await register(req.body.userName,req.body.passWord);
  if(user === "User Exist"){
    res.json({error:user});
}
  else{
    res.json(req.body);
  }
})

app.post('/add-menu', upload.single('profilePhoto'),async (req,res) =>{
  // console.log(req.body);
  const image = req.file.buffer;
  // console.log(image)
  uploadFolder = `images/${req.body.userName}`
  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
  }
  const fileName = `${req.body.name}.jpg`; // You can customize the filename as needed
  const filePath = path.join(uploadFolder, fileName);

  fs.writeFileSync(filePath, image)

  const data = await addData(req.body.userName,req.body.name,req.body.price,req.body.type,req.body.desc);
  const menus = await getMenu(req.body.userName)
  // console.log(menus);
  res.send(menus);
})

app.get('/getImage/:userName/:name',(req,res) =>{
    const username = req.params.userName;
    const itemname = req.params.name;
    console.log(username,itemname)
    const fileName = `${itemname}.jpg`;
    const filePath = path.join(__dirname, `images/${username}`, fileName);
    // console.log(filePath);
    // Send the image file
    res.sendFile(filePath);
  }
)

app.get('/getMenu/:userName',async(req,res) =>{
  console.log("in get menu")
  
  const username = req.params.userName;
  console.log(username)
  const menus = await getMenu(username);
  console.log(menus);
  res.json(menus)
})

async function login(userName,passWord){
  let user = ''
  try {
    const database = client.db('easyOrder');
    const users = database.collection('restaurants');
    const query = { userName:userName};
    user = await users.findOne(query);
        if(user.password !== passWord){
          return "Invalid Password"; 
        }
  }
  catch(e){
    return "Invalid Username";
  }

  return user;
}

async function register(userName,passWord){
  let user = ""
  try {
    const database = client.db('easyOrder');
    const users = database.collection('restaurants');
    let query = { userName:userName}
    user = await users.findOne(query);
    if(user){
      return "User Exist";
    }
    query = { userName:userName,password:passWord };
    user = await users.insertOne(query);
  
  } catch(e) {
    console.log(e)
  }
  return user;
}

async function addData(userName,name,price,type,desc){
  let menu = '';
  try{
    const database = client.db('easyOrder');
    const menus = database.collection(userName);
    let query = {name:name,price:price,type:type,desc:desc};
    const menu = await menus.insertOne(query);
  }
  catch(e){
    console.log(e); 
  }
  return menu;
}

async function getMenu(userName){
  await client.connect();
  try{
    const database = client.db('easyOrder');
    const menus = database.collection(userName);
    const menu = await menus.find().toArray();
    return menu;
  }
  catch(e){
    console.log(e);
    return []
  }
}