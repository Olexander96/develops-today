import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import countryRoutes from './routes/country.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/countries', countryRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
