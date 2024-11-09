import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session'
import MongoStore from 'connect-mongo';
import userRouter from './routes/authRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import seoRouter from './routes/seoRoutes.js'



dotenv.config();
const app = express();

//middleware 
app.use(express.json());
app.use(cors({origin:'http://localhost:5173' , credentials:true}));


//session set
app.use(
    session({
        secret:process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:false,
        store:MongoStore.create({mongoUrl:process.env.MONGO_URL}),
        cookie:{maxAge: 1000 * 60 * 60 * 24} //1 day
    })
)


//routers
app.use('/api/auth',userRouter);
app.use('/api/admin' , adminRouter);
app.use('/api/seo' , seoRouter)





//connect with database (Mongodb)
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true ,useUnifiedTopology:true})
.then(()=>console.log("Database connected successfuly"))
.catch((err)=>console.log(err))







app.listen(process.env.PORT || 5001 , ()=> console.log(`server running on port ${process.env.PORT || 5001}`)
)