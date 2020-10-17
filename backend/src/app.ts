import express from 'express';
import path from 'path';
import 'express-async-errors';
import cors from 'cors'
import routes from './routes';
import errorHandler from './errors/handler';

class App {
    public app: express.Application;

    constructor() {
        this.app = express()

        this.middleware()
        this.route()
    }

    private middleware() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
        this.app.use(errorHandler)
    }

    public route() {
        this.app.use('/', routes)
    }
}

export default new App().app;