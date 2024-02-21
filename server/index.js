import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config({ path: "../.env" });

const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.send("Hello from DALL-E!<br><br><li><b>GET:</b> /api/v1/post : fetch all the image data</li><li><b>POST:</b> /api/v1/dalle : generate image with given prompt { prompt }</li><li><b>POST:</b> /api/v1/post : Share the generated image with community {name, prompt, photo(base64)}</li>");
})

const startServer = async () => {

    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
    } catch (error) {
        console.log(error);
    }

}

startServer();