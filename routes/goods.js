const express = require("express");
const cart = require("../schemas/cart.js");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("this is root page")
});

router.get('/about',(req,res) =>{
  res.send("goods.js about PATH")
})


router.get('/goods',(req,res) =>{
  res.send("goods.js ")
})

const goods = [
    {
      goodsId: 4,
      name: "상품 4",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
      category: "drink",
      price: 0.1,
    },
    {
      goodsId: 3,
      name: "상품 3",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
      category: "drink",
      price: 2.2,
    },
    {
      goodsId: 2,
      name: "상품 2",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
      category: "drink",
      price: 0.11,
    },
    {
      goodsId: 1,
      name: "상품 1",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
      category: "drink",
      price: 6.2,
    },
  ];

router.get("/goods/:goodsId", (req,res )=>{
    res.json({goods: goods});
});

router.get('/goods/:goodsId', (req,res)=>{
    const {goodsId} = req.params;
  
    const [detail] = goods.filter((goods)=> 
             goods.goodsId == Number(goodsId));
    res.json({
        detail
    })
});

const Cart = require("../schemas/cart.js")
router.post("/goods/:goodsId/cart", async(req,res)=>{
  // const goodsId = req.params.goodsId;
  const {goodsId} = req.params
  // const quantity = req.body.quantity;
  const {quantity} = req.body;

  const existCarts = await cart.find({goodsId});
  if (existCarts.length){
    return res.status(400).json({
      success:false,
      errorMessage: " already exits goods"
    })
  }

  await Cart.create({goodsId,quantity});

  res.json({result: "success"});
})


router.put("/goods/:goodsId/cart", async(req,res)=>{
  const {goodsId} = req.params
  const {quantity} = req.body;

  const existCarts = await cart.find({goodsId});
  if (existCarts.length){
    await Cart.updateOne(
      {goodsId: goodsId},
      {$set: {quantity:quantity}}
    )
  }
  res.status(200).json({success:true})
})

router.delete("/goods/:goodsId/cart", async(req,res)=>{
  const {goodsId} = req.params;

  const existCarts = await Cart.find({goodsId});
  if(existCarts.length){
    await Cart.deleteOne({goodsId})
  }
  res.json({result:"success delete!!"})
})

const Goods = require("../schemas/goods.js")
router.post("/goods", async(req,res)=>{
  console.log("안되")
  const {goodsId, name, thumbnailUrl, category, price} = req.body; 

  const goods = await Goods.find({goodsId});

  if( goods.length ) {
    return res.status(400).json({
      success:false,
      errorMessage: "Dosen't exist goodsID"
    });
  }
  const createdGoods = await Goods.create({goodsId,name, thumbnailUrl, category, price});

  res.json({goods: createdGoods})
})

module.exports = router;