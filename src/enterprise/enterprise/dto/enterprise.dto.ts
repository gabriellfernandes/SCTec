import { CityDto } from '../../city/dto/city.dto';
import { ContactDto } from '../../contact/dto/contact.dto';
import { SegmentDto } from '../../segment/dto/segment.dto';

export class EnterpriseDto {
  id: string;
  name: string;
  ownerName: string;
  active: boolean;
  city: CityDto;
  segment: SegmentDto;
  contacts: ContactDto[];
}
