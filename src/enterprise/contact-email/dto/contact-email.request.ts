import { IsEmail, IsUUID } from 'class-validator';

export class ContactEmailRequest {
  @IsUUID()
  contactId: string;

  @IsEmail()
  address: string;
}
