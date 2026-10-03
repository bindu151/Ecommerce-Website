// Load products from browser storage
let products = JSON.parse(localStorage.getItem("products")) || [];

// HTML elements
const productForm = document.getElementById("productForm");
const productTable = document.getElementById("productTable");
const search = document.getElementById("search");

// Save products to localStorage
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

// Display products in the table
function displayProducts(list = products) {
    productTable.innerHTML = "";

    list.forEach(function (product) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${product.photo || ''}" alt="${product.name}" width="50" height="50" style="object-fit:cover; border-radius:6px;"></td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>₹${product.price}</td>
            <td>${product.stock}</td>
            <td><button onclick="deleteProduct(${product.id})">Delete</button></td>
        `;

        productTable.appendChild(row);
    });
}

// Update dashboard stats
function updateDashboard() {
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

    document.getElementById("totalProducts").textContent = totalProducts;
    document.getElementById("totalStock").textContent = totalStock;
    document.getElementById("totalValue").textContent = "₹" + totalValue;
}

// Delete a product
function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    saveProducts();
    displayProducts();
    updateDashboard();
}

// Add Product
productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("productName").value;
    const category = document.getElementById("productCategory").value;
    const price = Number(document.getElementById("productPrice").value);
    const stock = Number(document.getElementById("productStock").value);
    const photoInput = document.getElementById("productPhoto");
    const file = photoInput.files[0];

    function saveProduct(photoData) {
        const product = {
            id: Date.now(),
            name: name,
            category: category,
            price: price,
            stock: stock,
            photo: photoData || ""
        };

        products.push(product);
        saveProducts();
        displayProducts();
        updateDashboard();
        productForm.reset();
    }

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            saveProduct(e.target.result); // base64 image string
        };
        reader.readAsDataURL(file);
    } else {
        saveProduct(""); // no photo selected
    }
});

// Search functionality
if (search) {
    search.addEventListener("input", function () {
        const term = search.value.toLowerCase();
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)
        );
        displayProducts(filtered);
    });
}

// Initial load
displayProducts();
updateDashboard();