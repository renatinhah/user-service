import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ default: 'user' })
    role: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'datetime', nullable: true })
    lastLogin: Date | null;
}
