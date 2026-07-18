import express, {Application} from 'express'
import cors from 'cors'
import 'dotenv/config'
import mainRouter from './routes';
import errorMiddleware from './middlewares/error.middleware';

const app: Application = express();

const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;
const BACKEND_PORT = process.env.BACKEND_PORT || 4000;
app.use(
  cors({
    origin: `http://localhost:${FRONTEND_PORT}`,
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/v1', mainRouter);

app.use(errorMiddleware);



app.listen(BACKEND_PORT, () => {
  console.log(`Server running on http://localhost:${BACKEND_PORT}`);
});
