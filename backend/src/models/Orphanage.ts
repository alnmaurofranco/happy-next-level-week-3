import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Image } from './Images';

@Entity('orphanages')
export default class Orphanage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column({ type: 'decimal', scale: 2, precision: 10 })
    latitude: number;

    @Column({ type: 'decimal', scale: 2, precision: 10 })
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    @OneToMany(() => Image, image => image.orphanage, {
        cascade: ['insert', 'update'], onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'orphanage_id' })
    images: Image[];
}