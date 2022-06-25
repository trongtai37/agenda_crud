import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AgendaStatus {
  IN_COMING = 'IN_COMING',
  IN_PROGRESS = 'IN_PROGRESS',
  ARCHIVED = 'ARCHIVED',
}

@Entity({ name: 'agenda' })
export class Agenda extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'title',
    type: 'varchar',
  })
  title: string;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'status',
    enum: AgendaStatus,
    default: AgendaStatus.IN_COMING,
  })
  status: AgendaStatus;

  @Column({
    name: 'start_time',
    type: Date,
  })
  startTime: Date;

  @Column({
    name: 'end_time',
    type: Date,
  })
  endTime: Date;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
