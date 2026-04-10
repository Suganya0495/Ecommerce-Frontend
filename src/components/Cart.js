import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // ✅ ADD THIS
  const user_id = localStorage.getItem("user_id");

  // 🔄 Fetch cart items
  useEffect(() => {
    if (!user_id) {
      alert("Please login first ❌");
      return;
    }

    axios.get(`https://suganyamanikandan1.pythonanywhere.com/api/cart/${user_id}/`)
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  }, [user_id]);

  // 💰 Total calculation
  const total = cart.reduce((sum, item) => sum + item.total, 0);

  // ❌ Remove item
  const removeItem = async (id) => {
    try {
      await await axios.post("https://suganyamanikandan1.pythonanywhere.com/api/remove-from-cart/",  {
        cart_id: id,
      });

      alert("Item removed ❌");

      // Update UI without reload
      setCart(cart.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
      alert("Failed to remove item ❌");
    }
  };

  // 💳 Payment
  const handlePayment = async () => {
    try {
      if (total === 0) {
        alert("Cart is empty ❌");
        return;
      }

       const res = await axios.post(
  "https://suganyamanikandan1.pythonanywhere.com/api/create-order/",
        { amount: total }
      );

      const order = res.data;

      const options = {
        key: "rzp_test_Sbdo1FDKCO4S0f", // 🔥 your test key
        amount: order.amount,
        currency: "INR",
        name: "MyShop",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {
          await await axios.post(
  "https://suganyamanikandan1.pythonanywhere.com/api/save-order/",
            {
              user_id: user_id,
              amount: total,
              payment_id: response.razorpay_payment_id,
            }
          );

          navigate("/success");
          setCart([]); // clear cart UI
        },

        theme: {
          color: "#0d6efd",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      alert("Payment Failed ❌");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">🛒 Your Cart</h3>

      {cart.length === 0 ? (
        <h5 className="text-center">No items in cart</h5>
      ) : (
        <>
          <table className="table table-bordered text-center shadow">
            <thead className="table-dark">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th> {/* ✅ NEW */}
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.product_name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.total}</td>

                  {/* ❌ REMOVE BUTTON */}
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end">
            <h4 className="fw-bold">Total: ₹{total}</h4>

            <button
              className="btn btn-success mt-2 px-4"
              onClick={handlePayment}
            >
              Pay Now 💳
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;