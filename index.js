const express = require("express");
const app = express();
app.use(express.json());
const Razorpay = require("razorpay");
const cors = require("cors");
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.post("/payments", async (req, res) => {
  var instance = new Razorpay({
    key_id: "rzp_test_O50hljpcNkdZdB",
    key_secret: "dmSbTisM4Dlv0xaEcQEyy3pI",
  });

  let { amount } = req.body;
  let order = await instance.orders.create({
    amount: amount,
    currency: "INR",
    receipt: "receipt",
  });

  res.status(201).send({
    status: true,
    orderId: order.id,
    amount: amount,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Sever is running on 3000");
});
