import { PeriodoLetivoEntity } from "src/planilhas/periodo-letivo/entities/periodo-letivo.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tb_disciplines' })
export class DisciplineEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: number;

  @ManyToOne(() => PeriodoLetivoEntity)
  @JoinColumn({ name: 'school_period_id' })
  schoolPeriod!: PeriodoLetivoEntity;

  @Column({ type: 'text', nullable: true })
  name!: string;

  @Column({ type: 'varchar', name: 'code', nullable: true, unique: true })
  code!: string;

  @Column({ type: 'date', name: 'start_date', nullable: true })
  startDate!: Date;

  @Column({ type: 'date', name: 'end_date', nullable: true })
  endDate!: Date;

  @Column({ type: 'varchar', length: 100, name: 'category', nullable: true })
  category!: string;

  @Column({ type: 'varchar', length: 100, name: 'course', nullable: true })
  course!: string;

  @Column({ type: 'boolean', default: true, name: 'active', nullable: true })
  active!: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_exceptional', nullable: true })
  isExceptional!: boolean;

  @Column({ type: 'varchar', length: 50, name: 'period', nullable: true })
  period!: string;
  
  @Column({ type: 'varchar', length: 50, name: 'type', nullable: true })
  campus!: string;

  @Column({ type: 'varchar', length: 255, name: 'integration', nullable: true })
  integration!: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt!: Date;

  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}