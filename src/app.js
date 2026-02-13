import Express from 'express';
import { createServer } from 'node:http';
import path from 'node:path';
const app = Express();

const httpServer = createServer(app);
const PORT = Number(process.env.PORT || 3000);

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const publicDir = path.join(process.cwd(), "public");

app.use(Express.static(publicDir));

const apiRouter = Express.Router();
apiRouter.get('/hello', (req, res) => {
    res.json({ message: 'Hello, World!' });
});
apiRouter.get("/:path", (req, res) => {
    res.status(404).json({ error: "API entrypoint not found" });
});


app.use('/api', apiRouter);


app.get("/", (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
});
app.get("/:path", (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
});
