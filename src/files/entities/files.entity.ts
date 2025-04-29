import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Archivo {
    @PrimaryGeneratedColumn('uuid')
    archivo_id: string;

    @Column({ type: "uuid" })
    solicitud_id: string

    @Column({ type: "varchar", length:  100 })
    file_url: string;

    @Column({ type: "varchar", length:  15, nullable: true })
    tipo: string;

    @Column({ type: "date", nullable: true })
    fecha_solicitud: Date;
}
