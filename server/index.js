import express from "express";
import cors from "cors";
import connectDB from "./db/connection.js";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";



const app = express();



app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);   
app.use("/api/category", categoryRoutes);
app.use( "/api/supplier",supplierRoutes);
app.use("/api/order",orderRoutes);
app.use( "/api/product", productRoutes);
app.use( "/api/user",userRoutes);
app.use( "/api/profile",profileRoutes);
app.use("/api/dashboard",dashboardRoutes);






app.get("/", (req, res) => {
    res.send("Server Running");
});



app.listen(process.env.PORT, () => {
    connectDB();
    console.log("Server running on port 3000");
});


