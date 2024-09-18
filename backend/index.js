import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import router from './Routes/user.route.js';
import companyRoute from './Routes/company.route.js';
import jobRoute from './Routes/job.route.js';
import applicationRoute from './Routes/application.route.js';
dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/user",router);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application",applicationRoute);



app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})