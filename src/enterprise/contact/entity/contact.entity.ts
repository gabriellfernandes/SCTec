import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmailEntity } from '../../contact-email/entity/email.entity';
import { EnterpriseEntity } from '../../enterprise/entity/enterprise.entity';
import { PhoneEntity } from '../../contact-phone/entity/phone.entity';

@Entity('contact')
export class ContactEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: true })
  active: boolean;

  @Column({ name: 'name', type: 'varchar', nullable: true })
  name?: string | null;

  @Column({ name: 'department', type: 'varchar', nullable: true })
  department?: string | null;

  @ManyToOne(() => EnterpriseEntity, (enterprise) => enterprise.contacts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'enterprise_id' })
  enterprise: EnterpriseEntity;

  @OneToMany(() => EmailEntity, (email) => email.contact, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  emails: EmailEntity[];

  @OneToMany(() => PhoneEntity, (phone) => phone.contact, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  phones: PhoneEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
