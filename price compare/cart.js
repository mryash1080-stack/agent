const cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cartItems");

let total = 0, original = 0;

if(cart.length===0){
  container.innerHTML="<p style='text-align:center;color:#555;'>Your cart is empty!</p>";
}

cart.forEach(item => {
  const div = document.createElement("div");
  div.className = "cart-item";
  const itemTotal = item.price * item.qty;
  const itemOriginal = item.original * item.qty;
  total += itemTotal;
  original += itemOriginal;
  div.innerHTML = `
    <img src="https://via.placeholder.com/60" alt="${item.name}" class="food-img">
    <div>
      <h4>${item.name}</h4>
      <p>Platform: ${item.platform}</p>
      <p>Qty: ${item.qty}</p>
    </div>
    <div>
      <p>₹${itemTotal}</p>
    </div>`;
  container.appendChild(div);
});

document.getElementById("total").textContent = "Total Paid: ₹" + total;
document.getElementById("original").textContent = "Original Price: ₹" + original;
document.getElementById("savings").textContent = "💰 You Saved ₹" + (original-total);

document.getElementById("buyNow").addEventListener("click", () => {
  if(cart.length===0){ alert("Cart is empty!"); return; }
  alert(`Payment Successful! Total Paid: ₹${total}`);
  localStorage.removeItem("cart");
  window.location.href="index.html";
});
