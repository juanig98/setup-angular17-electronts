// import { Exclude } from 'class-transformer';

import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity({ name: "Users" })
export class UserEntity {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number

    @Column({ name: "firstName", length: 128 })
    firstName: string;

    @Column({ name: "lastName", length: 128 })
    lastName: string;

    @Column({ name: "userTypeId", default: 1 })
    userTypeId: number;

    @Column({ name: "birthdate", type: 'date' })
    birthdate: Date;

    @Column({ name: "phoneNumber", length: 15 })
    phoneNumber: string;

    @Column({ name: "phoneNumberAlt", length: 15, nullable: true })
    phoneNumberAlt: string;

    @Column({ name: "email", length: 256, unique: true })
    email: string;

    @Column({ name: "password", length: 256 })
    // @Exclude()
    password: string;

    @Column({ name: "status", type: "enum", enum: ['VALID', 'NOT_VALIDATED', 'INACTIVE', 'DELETED'], default: "NOT_VALIDATED" })
    // @Exclude()
    status: 'VALID' | 'NOT_VALIDATED' | 'INACTIVE' | 'DELETED';

    @Column({ name: 'activatedAt', nullable: true })
    // @Exclude()
    activatedAt: Date;

    @Column({ name: "activationToken", length: 512, nullable: true })
    // @Exclude()
    activationToken: string;

    @Column({ name: "passwordRecoveryAt", nullable: true })
    // @Exclude()
    passwordRecoveryAt: Date;

    @Column({ name: "passwordRecoveryToken", length: 512, nullable: true })
    // @Exclude()
    passwordRecoveryToken: string;

    @UpdateDateColumn({ name: "updatedAt" })
    // @Exclude()
    updatedAt: Date;

    @CreateDateColumn({ name: "createdAt" })
    // @Exclude()
    createdAt: Date;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
