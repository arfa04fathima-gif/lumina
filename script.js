const API_URL = 'http://localhost:5000/api';
let products = [];
let cart = JSON.parse(localStorage.getItem('lumina_cart')) || [];

// --- INITIALIZE ---
window.onload = async () => {
    await fetchProducts();
    updateCartUI();
    showPage('home');
};

// --- API CALLS ---
async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        products = await response.json();
        renderGrids();
    } catch (err) {
        console.error("Database connection failed. Is the server running?", err);
    }
}

// --- UI RENDERING ---
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    document.getElementById(`${pageId}-page`).classList.add('active-page');
    if (pageId === 'cart') renderCartPage();
    window.scrollTo(0, 0);
}

function renderGrids() {
    const homeGrid = document.getElementById('home-grid');
    const shopGrid = document.getElementById('shop-grid');

    if (homeGrid) homeGrid.innerHTML = createCards(products.slice(0, 4));
    if (shopGrid) shopGrid.innerHTML = createCards(products);
}

function createCards(list) {
    return list.map(p => `
        <div class="card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">$${p.price}</p>
            <button class="btn-primary" onclick="addToCart('${p._id}')">Add to Bag</button>
        </div>
    `).join('');
}

// --- CART LOGIC ---
function addToCart(id) {
    const product = products.find(p => p._id === id);
    const exists = cart.find(item => item._id === id);
    if (exists) exists.qty++;
    else cart.push({ ...product, qty: 1 });
    updateCartUI();
    alert(`${product.name} added to bag!`);
}

function updateCartUI() {
    localStorage.setItem('lumina_cart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.reduce((a, b) => a + b.qty, 0);
}

function renderCartPage() {
    const container = document.getElementById('cart-items');
    if (cart.length === 0) {
        container.innerHTML = "<h3>Your bag is empty.</h3>";
        return;
    }
    container.innerHTML = cart.map(item => `
        <div style="display:flex; align-items:center; gap:20px; padding:20px 0; border-bottom:1px solid #eee;">
            <img src="${item.image}" style="width:80px; border-radius:12px;">
            <div style="flex:1"><h4>${item.name}</h4><p>$${item.price} x ${item.qty}</p></div>
        </div>
    `).join('');const seedOnce = async () => {
  try {
    // This checks if the collection is empty
    const count = await Product.countDocuments(); 
    if (count === 0) {
      await Product.create({
        name: "Lumina Laptop",
        price: 999,
        category: "Electronics",
        description: "High-performance laptop for AIML studies."
      });
      console.log("🚀 SUCCESS: First product sent to MongoDB!");
    }
  } catch (err) {
    console.log("❌ Seed Error:", err);
  }
};

}