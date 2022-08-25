require("dotenv").config();
const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.secret_key);
app.use(express.static("."));
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  let customer = await stripe.customers.create();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1299 * 100,
    currency: "usd",
    customer: customer.id,
  });
  const clientSecret = paymentIntent.client_secret;
  
  res.send({
    clientSecret: clientSecret,
    customer: customer.id,
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Node server listening on port ${process.env.PORT}!`)
);
