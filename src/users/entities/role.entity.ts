import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('roles')
export class RoleEntity{
    @PrimaryColumn('uuid')
    role_pk: string

    @Column({ type: "varchar", length: 10, unique: true })
    role: string
}