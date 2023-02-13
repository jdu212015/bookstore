// Fetch JSON data from books.json file
fetch("books.json")
  .then(response => response.json())
  .then(data => {
    // Display books in the page
    let bookList = document.querySelector("#book-list");
    for (let book of data) {
      let div = document.createElement("div");
      div.classList.add("book");
      div.innerHTML = `
        <img src="${book.cover}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <p>${book.price}</p>
        <button data-id="${book.id}">Add to Cart</button>
      `;
      bookList.appendChild(div);
    }

    // Handle "Add to Cart" button clicks
    bookList.addEventListener("click", event => {
      if (event.target.tagName === "BUTTON") {
        let button = event.target;
        let bookId = button.getAttribute("data-id");
        addToCart(bookId, button);
      }
    });

    // Add a book to the cart
    function addToCart(bookId) {
      let book = data.find(book => book.id === bookId);
      if (!book) return;
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let item = cart.find(item => item.id === bookId);
      if (item) {
        item.quantity++;
      } else {
        cart.push({
          id: bookId,
          title: book.title,
          price: book.price,
          quantity: 1
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    }

    // Display the cart in the page
    function displayCart() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let cartBody = document.querySelector("#cart-body");
      cartBody.innerHTML = "";
      let total = 0;
      for (let item of cart) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${item.title}</td>
          <td>${item.price}</td>
          <td>${item.quantity}</td>
          <td>${item.price * item.quantity}</td>
          <td><button class="remove-btn" data-id="${item.id}">Remove</button></td>
        `;
        cartBody.appendChild(tr);
        total += item.price * item.quantity;
      }
      document.querySelector("#total").innerHTML = `Total: ${total}`;
    }

    // Remove a book from the cart
    function removeFromCart(bookId) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let index = cart.findIndex(item => item.id === bookId);
      if (index === -1) return;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      let button = document.querySelector(`button[data-id="${bookId}"]`);
      if (button) button.disabled = false;
      displayCart();
      }
      // Handle "Remove" button clicks
document.querySelector("#cart-body").addEventListener("click", event => {
  if (event.target.classList.contains("remove-btn")) {
    let button = event.target;
    let bookId = button.getAttribute("data-id");
    removeFromCart(bookId);
  }
});

displayCart();
});
