import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authController from "./controllers/authController.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import postController from "./controllers/postController.js";
import postRouter from "./routes/postRouter.js";
import middleware from "./middleware/middleware.js";
// configuracion
const __filname = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filname);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,"public/assets")));

// ALMACENAMIENTO DE ARCHIVOS
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets");
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname);
    }
});
const upload = multer({storage});
// RUTAS PARA ALMACENAR IMAGENES
app.post("/auth/register",upload.single("picture"),authController.register);
app.post("/posts",middleware.verifyToken,upload.single("picture"),postController.create);
// RUTAS
app.use("/auth",authRouter);
app.use("/user",userRouter);
app.use("/posts",postRouter);
// MONGOOSE CONFIG
const port = process.env.PORT || 5001;
mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(()=>{
    app.listen(port, () => console.log(`Servidor en el puerto: ${port}`));
}).catch((error) => console.log(error.message));    
