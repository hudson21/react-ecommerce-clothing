import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_zdkwrH1kGILw1N4OT88JxhS7';

  const onToken = (token) => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    })
    .then(response => {
      alert('Payment was successful')
    })
    .catch(error => {
      console.log(`Payment Error: ${JSON.parse(error)}`);
      alert('There was an issue with your payment. Please make sure you use the provided credit card');
    });
  }

  return(
    <StripeCheckout 
      label='Pay Now'
      name='Ecommerce Clothing Ltd.'
      billingAddress
      shippingAddress
      image='http://svgshare.com/i/CUz.svg'
      description={`Your total is 4${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
}

export default StripeCheckoutButton;