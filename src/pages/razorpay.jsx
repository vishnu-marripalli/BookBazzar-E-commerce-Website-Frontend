import React from 'react'
import axios from 'axios';
export default function Razorpay() {




    const handlePayment = async () => {
        const paymentData = await axios.post('http://localhost:4000/api/v1/subscription/create-order',{
          plan_id: "1",
          subscription_plan_name:"Basic",
          userid:"1"
       });
        const loadScript = (src) => {
            return new Promise((resolve) => {
              const script = document.createElement("script");
              script.src = src;
              script.onload = () => {
                resolve(true);
              };
              script.onerror = () => {
                resolve(false);
              };
              document.body.appendChild(script);
            });
          };
          const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
          );
        const { order_id, amount, currency } = paymentData.data.data
          console.log(amount)
          
    
        const options = {
            key: "rzp_test_smsKR1iWFpPJQw", // Enter the Key ID generated from the Dashboard
            amount: amount,
            currency: currency,
            name: "Your Company Name",
            description: `Subscription for basic`,
            order_id: order_id, // Razorpay order ID
            handler: function (response) {
              if (response.error) {
                alert(`Payment failed: ${response.error.description}`);
                // Optionally, log this information on the backend for audit add for refund
              }
                axios.post('http://localhost:4000/api/v1/subscription/verify-payment', {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                });
            },
            prefill: {
                name: "Customer Name",
                email: "customer@example.com",
                contact: "9999999999"
            },
            theme: {
                color: "#F37254"
            }
        };
    
        const rzp = new window.Razorpay(options);
        rzp.open();
    };
    

  return (
   <button onClick={handlePayment}>handle payment</button>
  )
}
