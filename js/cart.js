const cartContainer = document.getElementById("cart-items");
const totalElement = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>კალათა ცარიელია 🛒</p>";
    totalElement.textContent = "ჯამი: 0 ლ";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="80">
      <div>
        <h3>${item.name}</h3>
        <p>ფასი: ${item.price} ლ</p>
        <p>რაოდენობა: ${item.quantity}</p>
        <button class="remove-btn" data-index="${index}">წაშლა</button>
      </div>
    `;

    cartContainer.appendChild(itemDiv);
    total += item.price * item.quantity;
  });

  totalElement.textContent = `ჯამი: ${total.toFixed(2)} ლ`;

  // წაშლის ღილაკის ფუნქცია
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = this.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });
}

renderCart();
