import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class EnterpriseRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsIn(['Technology', 'Commerce', 'Industry', 'Services', 'Agribusiness'])
  segment: string;

  @IsEmail()
  contact: string;

  @IsBoolean()
  active: boolean;
}
