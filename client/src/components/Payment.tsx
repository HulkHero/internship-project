import {loadStripe} from '@stripe/stripe-js';
const item={
  name:"chicken",
  price:1000,
  qty:2
}
function Payment() {
  const makePayment=async()=>{
    console.log("hello");
  const stripe = await loadStripe('pk_test_51Nj141DOsxvBXmWQhvQUIY7jmKLOVUSr8IimWuKhCmTjNTbKqxi3AJmmZfU8dPPbjHrTvqCFVvdLTfw6iTvoh4Is001jA7RoYU');
  const body={
    item,
  }
  const header={
    "Content-Type":"application/json"
  }
  const response=await fetch("http://localhost:5000/create-checkout-session",{
    method:"POST",
    headers:header,
    body:JSON.stringify(body)
  })
  const result=await response.json();

  const session=await stripe?.redirectToCheckout({
    sessionId:result.id
  });
  if(session?.error){
    console.log(session.error.message);
  }}
  return (
    <div>
      <h1>hello world</h1>

      <h2>{item.name}</h2>
      <h2>{item.price}</h2>
      <h2>{item.qty}</h2>
      <button onClick={makePayment}>Checkout</button>


    </div>
   
  );
}

export default Payment;
