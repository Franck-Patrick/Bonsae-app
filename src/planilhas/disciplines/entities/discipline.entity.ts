import { AcademicPeriodEntity } from "src/planilhas/academic-period/entity/academic-period.entity";
import { ClassEntity } from "src/planilhas/classes/entities/class.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tb_disciplines' })
@Unique('unique_discipline', ['code'])
export class DisciplineEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: number;

  @ManyToOne(() => AcademicPeriodEntity, period => period.disciplines, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'academic_period_id' })
  academicPeriod!: AcademicPeriodEntity;

  @OneToMany(() => ClassEntity, classe => classe.discipline, {
    cascade: ['insert', 'update'],
  })
  classes!: ClassEntity[];

  @Column({ type: 'text', nullable: false })
  name!: string;

  @Column({ type: 'varchar', name: 'code', nullable: false, unique: true })
  code!: string;

  @Column({ type: 'date', name: 'start_date', nullable: true })
  startDate?: Date;

  @Column({ type: 'date', name: 'end_date', nullable: true })
  endDate?: Date;

  @Column({ type: 'varchar', length: 100, name: 'category', nullable: true })
  category?: string;

  @Column({ type: 'varchar', length: 100, name: 'course', nullable: true })
  course?: string;

  @Column({ type: 'boolean', default: true, name: 'active' })
  active!: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_exceptional' })
  isExceptional!: boolean;

  @Column({ type: 'varchar', length: 50, name: 'period', nullable: true })
  period?: string;

  @Column({ type: 'varchar', length: 50, name: 'campus', nullable: true })
  campus?: string;

  @Column({ type: 'varchar', length: 255, name: 'integration', nullable: true })
  integration?: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt!: Date;

  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}