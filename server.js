require("dotenv").config();
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const express = require("express");
const favicon = require("express-favicon");
const path = require("path");
const bodyParser = require("body-parser");
// TODO: replace my (Dustin's) secret key with Ben's
// const stripe = require('stripe')("sk_test_rFM4fXzGnnHh8yIFZVx6ggg8009BXcg57n")
const stripe = require("stripe")(process.env.STRIPE_SK);

const port = process.env.PORT || 9000;

const app = express();

app.use(favicon(__dirname + "/web-build/favicon.ico"));

app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname, "web-build")));

// for API requests
// app.get("/api", async (req, res) => {
//   res.json({...dummyData});
// });

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'web-build', 'index.html'));
// });

app.get("/img/*", function(req, res) {
  console.log(req.path);
  res.sendFile(path.join(__dirname, "assets", req.path));
});

// for stripe
const jsonParser = bodyParser.json();
app.post("/charge", jsonParser, async (req, res) => {
  try {
    const { tokenId, customerDetails, cartItems, totalPrice } = req.body;
    // if (!VALID_CART_ITEMS) {
    //   throw "Items in cart are no longer available for order."
    // }
    // else if (!VALID_ITEM_PRICES) {
    //   throw "Incorrect cart item prices."
    // }
    // else if (!VALID_TOTAL) {
    //   throw "Cart total does not match item prices."
    // }
    // else {
    let { status } = await stripe.charges.create({
      amount: parseInt(totalPrice * 100),
      currency: "cad",
      description: "making a charge",
      source: tokenId
    });
    res.json({ status, customerDetails, cartItems });
    // }
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

// const WooCommerce = new WooCommerceRestApi({
//   url: 'https://prepdfresh.com',
//   consumerKey: 'ck_f0809b21cd67ec9e8e9f7ac9ecfa6d6b5e5b3274',
//   consumerSecret: 'cs_8d59e0c4276f40f01cb873c7c7680a2f7c1abcee',
//   version: 'wc/v3',
//   queryStringAuth: true // Force Basic Authentication as query string true and using under HTTPS
// });

// WooCommerce.get("orders")
//   .then(response => console.log(JSON.stringify(response.data)))
//   .catch(error => console.log(error.response.data));

app.listen(port);
