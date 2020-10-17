import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanagesViews from '../views/orphanages_views';
import * as Yup from 'yup';

export class OrphanageController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return res.status(200).json(orphanagesViews.renderMany(orphanages));
    }

    public async getOrphanage(req: Request, res: Response) {
        const { id } = req.params;
        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail({
            where: { id }, relations: ['images']
        });

        return res.status(200).json(orphanagesViews.render(orphanage));
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body;

        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return {
                path: image.filename
            }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required(),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        })

        await schema.validate(data, {
            abortEarly: false,
        });

        const orphanage = orphanagesRepository.create(data);
        const orphanages = await orphanagesRepository.save(orphanage)

        return res.status(201).json({ orphanages });
    }

    public async update(req: Request, res: Response, next: NextFunction) { }

    public async remove(req: Request, res: Response, next: NextFunction) { }
}