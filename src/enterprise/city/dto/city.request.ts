import { IsNotEmpty, IsString } from 'class-validator';

export class CityRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
}
