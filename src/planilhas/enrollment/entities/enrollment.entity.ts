import { ClassEntity } from "src/planilhas/classes/entities/class.entity";
import { UserEntity } from "src/planilhas/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tb_enrollment' })
export class EnrollmentEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: number;

  @ManyToOne(() => ClassEntity, turma => turma.enrollments)
  @JoinColumn({ name: 'classes_id' })
  turma!: ClassEntity;

  @ManyToOne(() => UserEntity, user => user.enrollments)
  @JoinColumn({ name: 'users_id' })
  user!: UserEntity;

  @Column({ type: 'int', name: 'team_id', nullable: true })
  teamId?: number;

  @Column({ type: 'boolean', default: false, name: 'temporary', nullable: true })
  temporary?: boolean;

  @Column({ type: 'boolean', default: false, name: 'professor', nullable: true })
  professor?: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}