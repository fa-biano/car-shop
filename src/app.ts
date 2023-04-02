import express from 'express';
import errorHandler from './Middlewares/ErrorHandler';
import carRouter from './Routes/CarRouter';
import motorcycleRouter from './Routes/MotorcycleRouter';

const app = express();
app.use(express.json());

app.use('/cars', carRouter);
app.use('/motorcycles', motorcycleRouter);

app.use(errorHandler);

export default app;
