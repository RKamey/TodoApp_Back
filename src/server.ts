import app from './app';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;

dotenv.config({ path: path.resolve(__dirname, '../.env')});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});