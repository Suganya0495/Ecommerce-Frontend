import React from "react";

function Success() {
  return (
    <div className="container text-center mt-5">
      <h2 className="text-success">🎉 Payment Successful!</h2>
      <p>Your order has been placed successfully.</p>
      <a href="/" className="btn btn-primary mt-3">
        Continue Shopping
      </a>
    </div>
  );
}

export default Success;