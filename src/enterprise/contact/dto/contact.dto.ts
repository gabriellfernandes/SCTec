import { ContactEmailDto } from '../../contact-email/dto/contact-email.dto';
import { ContactPhoneDto } from '../../contact-phone/dto/contact-phone.dto';

export class ContactDto {
  id: string;
  enterpriseId: string;
  emails: ContactEmailDto[];
  phones: ContactPhoneDto[];
}
