const express = require('express');
const dotenv = require ("dotenv");
const {connect} = require ("./src/utils/db");
const {isAuth} = require ("./src/middlewares/auth")
const cloudinary = require("cloudinary").v2
const cors = require('cors')

const petsRouter = require ("./src/api/routes/pets.routes")
const animalProtectorRouter = require ("./src/api/routes/animalProtector.routes")
const userRouter = require ("./src/api/routes/users.routes")
const PORT = process.env.PORT || 7000;
dotenv.config();

const app = express();
connect ();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_KEY,
    api_secret:process.env.CLOUD_SECRET
});

app.use (cors ({
    origin: "*",
    credentials: true
}))


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/pets", petsRouter);
app.use("/animalProtector", animalProtectorRouter);
app.use("/users", userRouter);
app.listen(PORT, () => console.log(`listening on port: http://localhost:${PORT}`));