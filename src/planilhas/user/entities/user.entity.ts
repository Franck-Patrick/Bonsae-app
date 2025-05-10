import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique
} from 'typeorm';

@Entity({ name: 'tb_user' })
@Unique('unique_user', ['profileId', 'name', 'registrationNumber', 'email']) 

export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: number;

  @Column({ type: 'int', name: 'id_old_bonsae', nullable: true })
  idOldBonsae!: number;

  @Column({ type: 'int', name: 'id_audora', nullable: true })
  idAudora!: number;

  @Column({ type: 'bigint', name: 'profile_id', nullable: true })
  profileId!: number;

  @Column({ type: 'boolean', default: true, name: 'active', nullable: true })
  active!: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name!: string;

  @Column({ type: 'varchar', length: 50, name: 'registration_number', nullable: true })
  registrationNumber!: string;

  @Column({ type: 'varchar', length: 100, name: 'email', nullable: true })
  email!: string;

  @Column({ type: 'boolean', default: false, name: 'receive_emails', nullable: true })
  receiveEmails!: boolean;

  @Column({ type: 'varchar', length: 100, name: 'gmail', nullable: true })
  gmail!: string;

  @Column({ type: 'text', name: 'gcalendar_Credentials', nullable: true })
  gcalendarCredentials!: string;

  @Column({ type: 'boolean', default: false, name: 'approve_api', nullable: true })
  aprroveApi!: boolean;

  @Column({ type: 'varchar', length: 255, name: 'approve_msg', nullable: true })
  approveMsg!: string;

  @Column({ type: 'varchar', length: 20, name: 'telephone', nullable: true })
  telephone!: string;

  @Column({ type: 'varchar', length: 255, name: 'password', nullable: true })
  password!: string;

  @Column({ type: 'varchar', length: 14, name: 'cpf', nullable: true })
  cpf!: string;

  @Column({ type: 'int', name: 'period_id', nullable: true })
  periodId!: number;

  @Column({ type: 'varchar', length: 20, name: 'oab', nullable: true })
  oab!: string;

  @Column({ type: 'char', length: 2, name: 'oab_uf', nullable: true })
  oabUf!: string;

  @Column({ type: 'time', name: 'workload_real', nullable: true })
  workloadReal!: string;

  @Column({ type: 'time', name: 'workload_simulated', nullable: true })
  worloadSimulated!: string;

  @Column({ type: 'text', name: 'observations', nullable: true})
  observations!: string;

  @Column({ type: 'varchar', length: '255', name: 'profile_pic', nullable: true })
  profilePic!: string;

  @Column({ type: 'varchar', length: 100, name: 'course', nullable: true })
  course!: string;

  @Column({ type: 'int', name: 'course_id', nullable: true })
  courseId!: number;

  @Column({ type: 'boolean', default: false, name: 'is_admin', nullable: true })
  isAdmin!: boolean;

  @Column({ type: 'varchar', length: 100, name: 'remember_token', nullable: true })
  rememberToken!: string;

  @Column({ type: 'varchar', length: 255, name: 'access_token', nullable: true })
  accessToken!: string;

  @Column({ type: 'varchar', length: 255, name: 'browser_agent', nullable: true })
  browserAgent!: string;

  @Column({ type: 'date', name: 'date_accept', nullable: true })
  dateAccept!: Date;

  @Column({ type: 'datetime', name: 'last_login', nullable: true })
  lastLogin!: Date;

  @Column({ type: 'datetime', name: 'last_logout', nullable: true })
  lastLogout!: Date;

  @Column({ type: 'time', name: 'logged_time', nullable: true })
  loggedTime!: string;

  @Column({ type: 'time', name: 'all_time_logged', nullable: true })
  allTimeLogged!: string;

  @Column({ type: 'time', name: 'average_logged_time', nullable: true })
  averageLoggedTime!: string;

  @Column({ type: 'int', default: 0, name: 'times_active', nullable: true })
  timesActive!: number;

  @Column({ type: 'varchar', length: 45, name: 'ip', nullable: true })
  ip!: string;

  @Column({ type: 'tinyint', default: 0, name: 'permission', nullable: true })
  permission!: number;

  @Column({ type: 'varchar', length: 255, name: 'integration', nullable: true })
  integration!: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt!: Date;

  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}