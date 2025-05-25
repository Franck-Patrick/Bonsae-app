import { DisciplineEntity } from 'src/planilhas/disciplines/entities/discipline.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Unique
} from 'typeorm';

@Entity({ name: 'tb_academic_period' })
@Unique('unique_period', ['academicPeriod'])
export class AcademicPeriodEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  academicPeriod!: string;

  @Column({ type: 'date', name: 'start_date', nullable: true })
  startDate?: Date;

  @Column({ type: 'date', name: 'end_date', nullable: true })
  endDate?: Date;

  @OneToMany(() => DisciplineEntity, discipline => discipline.academicPeriod, {
    cascade: ['insert', 'update'],
  })
  disciplines!: DisciplineEntity[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt!: Date;

  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}