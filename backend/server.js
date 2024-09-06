import express from "express"; // This is a package that allows us to use express
import dotenv from "dotenv"; // This is a package that allows us to use environment variables
import path from "path"; // This is a package that allows us to use path
import { connectDB } from "./config/db.js"; // This is a package that allows us to use database

import productRoutes from "./routes/product.route.js";// This is a package that allows us to use routes

dotenv.config(); // This is a package that allows us to use environment variables

const app = express(); 
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); // This is a package that allows us to use path

app.use(express.json()); // This is a middleware that allows us to use json

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// This is a server
app.listen(PORT, () => {
    connectDB(); 
    console.log(`Server started on port http://localhost:${PORT}`);
});