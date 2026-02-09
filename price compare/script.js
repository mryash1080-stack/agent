let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".toggle-menu").forEach(btn => {
  btn.addEventListener("click", () => {
    const menu = btn.closest(".restaurant-card").querySelector(".menu");
    menu.classList.toggle("open");
    btn.textContent = menu.classList.contains("open") ? "Hide Menu ⌃" : "View Menu ⌄";
  });
});

document.querySelectorAll(".plus").forEach(btn => btn.onclick = () => btn.previousElementSibling.textContent++);
document.querySelectorAll(".minus").forEach(btn => btn.onclick = () => {
  const span = btn.nextElementSibling;
  if(span.textContent>1) span.textContent--;
});

document.querySelectorAll(".add-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const qty = btn.parentElement.querySelector(".qty span").textContent;
    const swiggy = +btn.dataset.swiggy;
    const zomato = +btn.dataset.zomato;
    const platform = swiggy <= zomato ? "Swiggy" : "Zomato";
    const price = Math.min(swiggy,zomato);
    const original = Math.max(swiggy,zomato);
    cart.push({name: btn.dataset.name, platform, price, original, qty: +qty});
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  });
});

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".menu-item").forEach(item => {
      item.style.display = filter==="all" || item.classList.contains(filter) ? "flex" : "none";
    });
  };
});

document.getElementById("searchInput").addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".menu-item").forEach(item => {
    const name = item.querySelector("h4").textContent.toLowerCase();
    const rest = item.closest(".restaurant-card").querySelector("h3").textContent.toLowerCase();
    item.style.display = name.includes(query) || rest.includes(query) ? "flex" : "none";
  });
});
