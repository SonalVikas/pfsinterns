// const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const Razorpay = require("razorpay");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_API_SECRET
// });

// exports.processPayment = catchAsyncErrors(async (req, res, next) => {
//   const myPayment = await razorpay.paymentIntents.create({
//     amount: req.body.amount,
//     currency: "INR",
//     metadata: {
//       company: "ECOMMERCE",
//     },
//   });

//   res
//     .status(200)
//     .json({ success: true, client_secret: myPayment.client_secret });
// });
// exports.sendRazorpayApiKey = catchAsyncErrors(async (req, res, next) => {
//     res.status(200).json({ razorpayApiKey: process.env.RAZORPAY_KEY_ID});
//   });

const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "ECOMMERCE",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

