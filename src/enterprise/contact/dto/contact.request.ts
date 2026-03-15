import { IsUUID } from 'class-validator';

export class ContactRequest {
  @IsUUID()
  enterpriseId: string;
}
