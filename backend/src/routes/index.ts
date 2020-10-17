import { Router, Request, Response } from 'express'
import orphanaRouter from './orphanage.routes';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'Welcome' })
});

routes.use('/orphanages', orphanaRouter);

export default routes