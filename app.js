// const { query } = require("express");
const express = require("express");
const app = express ();
const port = 3000;

const goodsRouter = require('./routes/goods.js');
const cartsRouter = require('./routes/carts.js');
const connect = require("./schemas");
connect();

app.use(express.json());
app.use("/api",[goodsRouter, cartsRouter]);

app.get('/', (req,res) =>{
    res.send("hi kurt");
});

app.listen(port, ()=> {
    console.log(port, "start")

})


// app.post("/",(req,res) => {
//     console.log(req.body);

//     res.send("기본 url에 post 가 정상적으로 실행됨")
// })

// app.get("/",(req,res)=>{
//     console.log(req,query);

//     const obj = {
//         "key":"kurt"
//     }

//     res.json(obj);
// })

// app.get("/:id",(req,res)=>{
//     console.log(req.params);

//     res.send(":id URI 에 정상적으로 반홤됨");
// })




// const requestMiddleware = (req,res,next)=>{
//     console.log("Request URL", req.originalURL, " - ", new Date());
//     next();
// };

// app.use(requestMiddleware);

