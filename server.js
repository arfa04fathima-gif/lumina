require('dotenv').config(); 
const mongoose = require('mongoose'); // <--- THIS LINE IS MISSING OR IN THE WRONG PLACE
const express = require('express');
const cors = require('cors');
const app = express(); // This defines 'app' so it can be used later
app.use(express.json());
app.use(cors());
// 1. Define the Product Schema (The Blueprint)
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    description: String
});

// 2. Create the Model
const Product = mongoose.model('Product', productSchema);

// 3. Connect and Seed (Your existing connection block)
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected to MongoDB Atlas!");

        // This will now work because 'Product' is defined above!
        const count = await Product.countDocuments();
        if (count === 0) {
            console.log("Database empty. Adding test product...");
            const testProduct = new Product({
                name: "Test Laptop",
                price: 999,
                category: "Electronics",
                image: "https://via.placeholder.com/150",
                description: "Initial seed product"
            });
            await testProduct.save();
            console.log("✅ SUCCESS: Test product saved! Check Atlas now.");
        }
    })
    .catch(err => console.error("Error:", err));


// Now line 6 (or wherever your connect code is) will work:
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Successfully connected to MongoDB Atlas!"))
    .catch(err => console.error("Connection error:", err));

// ... rest of your product schema and routes ...
// Define what a Cart Item looks like
const cartSchema = new mongoose.Schema({
    productId: String,
    name: String,
    price: Number,
    qty: Number,
    image: String
});
const Cart = mongoose.model('Cart', cartSchema);

// The Route to save "Add to Cart" data
app.post('/api/cart', async (req, res) => {
    try {
        const newItem = new Cart(req.body);
        await newItem.save();
        res.status(201).json({ message: "Saved to MongoDB!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected to MongoDB Atlas!");

        // TEST: Create one product automatically to verify connection
        const count = await Product.countDocuments();
        if (count === 0) {
            console.log("Database empty. Adding test product...");
            const testProduct = new Product({
                name: "Test Laptop",
                price: 999,
                category: "Electronics",
                image: "https://via.placeholder.com/150"
            });
            await testProduct.save();
            console.log("Test product saved! Check Atlas now.");
        }
    })
    .catch(err => console.error("Error:", err));