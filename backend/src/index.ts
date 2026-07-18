import express, {Application} from 'express'
import cors from 'cors'
import 'dotenv/config'
import mainRouter from './routes';
import errorMiddleware from './middlewares/error.middleware';

const app: Application = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/v1', mainRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
