import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContactEntity } from '../../contact/entity/contact.entity';

@Entity('email')
export class EmailEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => ContactEntity, (contact) => contact.emails, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contact_id' })
  contact: ContactEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
