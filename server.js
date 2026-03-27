require('dotenv').config(); // This loads the .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Use the variable from your .env file


mongoose.connect(MONGO_URI)
    .then(() => console.log("Successfully connected to MongoDB Atlas!"))
    .catch(err => console.error("Connection error:", err));

// ... rest of your product schema and routes ...

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