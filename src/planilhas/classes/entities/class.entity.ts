import { DisciplineEntity } from "src/planilhas/disciplines/entities/discipline.entity";
import { PeriodoLetivoEntity } from "src/planilhas/periodo-letivo/entities/periodo-letivo.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tb_classes' })
export class ClassEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: number;

  @ManyToOne(() => PeriodoLetivoEntity)
  @JoinColumn({ name: 'school_period_id' })
  schoolPeriod!: PeriodoLetivoEntity;

  @ManyToOne(() => DisciplineEntity)
  @JoinColumn({ name: 'academic_classes_id' })
  academicClass!: DisciplineEntity;

  @Column({ type: 'text', nullable: true })
  name!: string;

  @Column({ type: 'varchar', length: 50, name: 'code', nullable: true })
  code!: string;

  @Column({ type: 'varchar', length: 12, name: 'shift', nullable: true })
  shift!: string;

  @Column({ type: 'boolean', default: true, name: 'active', nullable: true })
  active!: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_exceptional', nullable: true })
  isExceptional!: boolean;

  @Column({ type: 'varchar', length: 255, name: 'integration', nullable: true })
  integration!: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt!: Date;

  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}