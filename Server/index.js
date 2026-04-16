const express = require('express');
const { connectDB } = require('./config/database');
const cookieparser = require('cookie-parser');
const { cloudinaryConnect } = require('./config/cloudinary');
const fileupload = require('express-fileupload');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const courseRoutes = require('./routes/courseRoutes');
const cors = require('cors');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(fileupload(
    {
        useTempFiles: true,
        tempFileDir: "/tmp/"
    }
));
app.use(cookieparser());
app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);


connectDB();
cloudinaryConnect();


// adding routes mapping
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/profile', profileRoutes);


app.get('/', (req, res) => {
    res.send("<h1>Parth Magar</h1>");
});

app.listen(PORT, () => {
    console.log('Server is running on port no: ',PORT);
});