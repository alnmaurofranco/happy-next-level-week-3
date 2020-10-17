import { createServer } from 'http';
import app from './app';
import './database/connection';

const server = createServer(app);

server.listen(3333, () => {
    console.log(`Servidor iniciado`);
});