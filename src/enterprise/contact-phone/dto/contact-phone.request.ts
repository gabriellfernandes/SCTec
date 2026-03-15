import { IsString, IsUUID } from 'class-validator';

export class ContactPhoneRequest {
  @IsUUID()
  contactId: string;

  @IsString()
  number: string;
}
