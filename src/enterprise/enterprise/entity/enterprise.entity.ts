import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('enterprise')
export class EnterpriseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'owner_name' })
  ownerName: string;

  @Column()
  city: string;

  @Column()
  segment: string;

  @Column()
  contact: string;

  @Column({ default: true })
  active: boolean;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
