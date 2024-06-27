
import express from 'express';
import dotenv from 'dotenv';
import memberRoutes from './routes/members';
import errorHandler from './utils/errorHandler';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;



app.use(express.json());
app.use(cors());

app.use('/api', memberRoutes);

app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
