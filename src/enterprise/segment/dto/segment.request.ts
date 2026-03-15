import { IsNotEmpty, IsString } from 'class-validator';

export class SegmentRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
}
