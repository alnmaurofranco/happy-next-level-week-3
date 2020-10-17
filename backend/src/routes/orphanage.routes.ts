import { Router } from 'express'
import multer from 'multer';
import uploadConfig from '../config/upload';

import { OrphanageController } from '../controllers/OrphanageController';
const { create, getAll, getOrphanage } = new OrphanageController();

const orphanaRouter = Router();
const upload = multer(uploadConfig);

orphanaRouter.get('/', getAll);
orphanaRouter.get('/:id', getOrphanage);
orphanaRouter.post('/', upload.array('images'), create);

export default orphanaRouter;
