import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ContactRequest {
  @IsUUID()
  enterpriseId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  department: string;
}
