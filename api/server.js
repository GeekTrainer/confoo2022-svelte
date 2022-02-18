import 'dotenv/config';
import * as database from './database.js';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json())

app.get('/api/breeds', async (req, res) => {
    try {
        database.connect();
        res.json(await database.getBreeds())
    } finally {
        database.close();
    }
})

app.get('/api/dogs')

app.listen(3000, () => console.log('Server up'));
