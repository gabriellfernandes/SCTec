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
import { CityEntity } from '../../city/entity/city.entity';
import { ContactEntity } from '../../contact/entity/contact.entity';
import { SegmentEntity } from '../../segment/entity/segment.entity';

@Entity('enterprise')
export class EnterpriseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'owner_name' })
  ownerName: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => CityEntity, { nullable: false })
  @JoinColumn({ name: 'city_id' })
  city: CityEntity;

  @ManyToOne(() => SegmentEntity, { nullable: false })
  @JoinColumn({ name: 'segment_id' })
  segment: SegmentEntity;

  @OneToMany(() => ContactEntity, (contact) => contact.enterprise, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  contacts: ContactEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
