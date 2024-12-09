//dependencies
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Required for static pages
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API route
//Initial .get to check server running.
app.get('/api', (req, res) => {
    res.send('Hello Kiernan :)');
});

// Serve static files
const buildPath = path.join(__dirname, 'view/build');
app.use(express.static(buildPath));

//App is listening on port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

