    import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
    import { ManyToOne, JoinColumn } from "typeorm";
    import { RoleEntity } from "./role.entity.js";

    @Entity('users')
    export class UserEntity{

        @ManyToOne(() => RoleEntity, { nullable: false })
        @JoinColumn({ name: "role_fk", referencedColumnName: "role_pk" })
        role: RoleEntity;

        @PrimaryColumn('uuid')
        user_pk: string

        @Column({ type: "varchar", length: 255, unique: true })
        user_email: string

        @Column({ type: "varchar", length: 20, unique: true })
        user_name: string

        @Column({ type: "varchar", length: 255 })
        user_password: string

        @Column({ type: "uuid", nullable: true })
        verification_key: string | null;
        
        @Column({ type: "uuid", nullable: true, unique: true })
        reset_password_key: string | null;

        @CreateDateColumn({ type: "timestamptz" })
        created_at: Date;

        @Column({ type: "timestamptz", nullable: true })
        verified_at: Date | null;

        @UpdateDateColumn({ type: "timestamptz" })
        updated_at: Date;

        @DeleteDateColumn({ type: "timestamptz", nullable: true })
        deleted_at: Date | null;
    }