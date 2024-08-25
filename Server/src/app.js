import express from 'express';
import cors from 'cors';
import Constants from './constant.js';
import connectDb from './db/db.connect.js';
import postRoutes from './routes/post.router.js';
import userRoutes from './routes/user.routes.js';
import categoryRoutes from './routes/category.routes.js'
import productRoutes from './routes/product.routes.js'
import orderRoutes from './routes/order.routes.js'
const app = express();
app.use(cors());
const port = Constants.PORT;

app.use(express.json());
connectDb(Constants.URI)
app.use('/post', postRoutes);
app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);


app.listen(port, () => {
    console.log(`Server listening on PORT http://localhost:${port}`);

})