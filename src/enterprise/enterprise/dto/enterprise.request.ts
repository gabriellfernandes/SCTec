import {
  ArrayNotEmpty,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ContactRequest {
  @IsOptional()
  @ArrayNotEmpty()
  @IsEmail({}, { each: true })
  emails?: string[];

  @IsOptional()
  @ArrayNotEmpty()
  @IsString({ each: true })
  phones?: string[];
}

export class EnterpriseRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @IsUUID()
  cityId: string;

  @IsUUID()
  segmentId: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ContactRequest)
  contacts: ContactRequest[];

  @IsBoolean()
  active: boolean;
}
