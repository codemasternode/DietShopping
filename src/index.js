import express from "express";
import cors from "cors";
import mongodbConnection from "./config/db";
import authRoutes from "./routes/auth";
import path from 'path'
import cookieParser from 'cookie-parser'
import "dotenv/config"

let PORT = process.env.PORT || 5000


const app = express();
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'http://localhost:5000'] }));

if (process.env.NODE_ENV !== "test") {
  mongodbConnection();
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoutes());


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});


process.on("exit", () => {
  server.close();
});


export default app;