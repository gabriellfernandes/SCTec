import 'dotenv/config';
import { hash } from 'bcryptjs';
import { DataSource } from 'typeorm';
import { UserEntity, UserRole } from '../../auth/user/entity/user.entity';
import { CityEntity } from '../../enterprise/city/entity/city.entity';
import { SegmentEntity } from '../../enterprise/segment/entity/segment.entity';
import { EnterpriseEntity } from '../../enterprise/enterprise/entity/enterprise.entity';
import { ContactEntity } from '../../enterprise/contact/entity/contact.entity';
import { EmailEntity } from '../../enterprise/contact-email/entity/email.entity';
import { PhoneEntity } from '../../enterprise/contact-phone/entity/phone.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_DATABASE ?? 'atec',
  entities: [
    UserEntity,
    CityEntity,
    SegmentEntity,
    EnterpriseEntity,
    ContactEntity,
    EmailEntity,
    PhoneEntity,
  ],
  synchronize: false,
});

type SeedUser = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

type SeedEnterprise = {
  name: string;
  ownerName: string;
  active: boolean;
  cityName: string;
  segmentName: string;
  contacts: Array<{
    name: string;
    department: string;
    emails: string[];
    phones: string[];
  }>;
};

const seedUsers: SeedUser[] = [
  {
    name: 'SCTEC Admin',
    email: 'admin@sctec.local',
    password: 'admin1234',
    role: UserRole.ADMIN,
  },
  {
    name: 'SCTEC Editor',
    email: 'editor@sctec.local',
    password: 'edit1234',
    role: UserRole.EDITOR,
  },
  {
    name: 'SCTEC Viewer',
    email: 'viewer@sctec.local',
    password: 'view1234',
    role: UserRole.VIEWER,
  },
];

const seedCities = [
  { name: 'Florianópolis', aliases: ['Florianopolis'] },
  { name: 'Joinville', aliases: [] },
  { name: 'Blumenau', aliases: [] },
  { name: 'São José', aliases: ['Sao Jose'] },
  { name: 'Chapecó', aliases: ['Chapeco'] },
  { name: 'Criciúma', aliases: ['Criciuma'] },
  { name: 'Itajaí', aliases: ['Itajai'] },
  { name: 'Jaraguá do Sul', aliases: ['Jaragua do Sul'] },
  { name: 'Lages', aliases: [] },
  { name: 'Balneário Camboriú', aliases: ['Balneario Camboriu'] },
  { name: 'Tubarão', aliases: ['Tubarao'] },
];

const seedSegmentNames = [
  'Tecnologia',
  'Comercio',
  'Industria',
  'Servicos',
  'Agronegocio',
];

const seedEnterprises: SeedEnterprise[] = [
  {
    name: 'InovaSC Labs',
    ownerName: 'Marina Costa',
    active: true,
    cityName: 'Florianópolis',
    segmentName: 'Tecnologia',
    contacts: [
      {
        name: 'Camila Rocha',
        department: 'Operacoes',
        emails: ['camila@inovasc.com.br'],
        phones: ['(48) 98811-2233'],
      },
      {
        name: 'Thiago Lemos',
        department: 'Comercial',
        emails: ['thiago@inovasc.com.br'],
        phones: ['(48) 99122-3344'],
      },
    ],
  },
  {
    name: 'Vale Comercio Sul',
    ownerName: 'Ricardo Almeida',
    active: true,
    cityName: 'Joinville',
    segmentName: 'Comercio',
    contacts: [
      {
        name: 'Fernanda Luz',
        department: 'Atendimento',
        emails: ['fernanda@valecomercio.com.br'],
        phones: ['(47) 99633-4455'],
      },
    ],
  },
  {
    name: 'Metalurgia Serra Azul',
    ownerName: 'Carlos Mendes',
    active: false,
    cityName: 'Blumenau',
    segmentName: 'Industria',
    contacts: [
      {
        name: 'Patricia Nunes',
        department: 'Compras',
        emails: ['patricia@serraazul.ind.br'],
        phones: ['(47) 99744-5566'],
      },
    ],
  },
  {
    name: 'ServiMais SC',
    ownerName: 'Luciana Prado',
    active: true,
    cityName: 'Chapecó',
    segmentName: 'Servicos',
    contacts: [
      {
        name: 'Eduardo Pires',
        department: 'Relacionamento',
        emails: ['eduardo@servimais.com.br'],
        phones: ['(49) 99855-6677'],
      },
    ],
  },
  {
    name: 'AgroLitoral Cooperativa',
    ownerName: 'Joao Batista',
    active: true,
    cityName: 'Criciúma',
    segmentName: 'Agronegocio',
    contacts: [
      {
        name: 'Vanessa Ribeiro',
        department: 'Suprimentos',
        emails: ['vanessa@agrolitoral.coop.br'],
        phones: ['(48) 99966-7788'],
      },
    ],
  },
];

async function upsertUsers(): Promise<void> {
  const userRepository = dataSource.getRepository(UserEntity);

  for (const seedUser of seedUsers) {
    const passwordHash = await hash(seedUser.password, 10);
    const existing = await userRepository.findOne({
      where: { email: seedUser.email },
      withDeleted: true,
    });

    if (existing?.deletedAt) {
      await userRepository.recover(existing);
    }

    const entity = existing ?? userRepository.create();
    entity.name = seedUser.name;
    entity.email = seedUser.email;
    entity.passwordHash = passwordHash;
    entity.role = seedUser.role;
    entity.active = true;

    await userRepository.save(entity);
  }

  console.log(`[seed] users upserted: ${seedUsers.length}`);
}

async function upsertCities(): Promise<Map<string, CityEntity>> {
  const cityRepository = dataSource.getRepository(CityEntity);

  for (const seedCity of seedCities) {
    const existing = await cityRepository.findOne({
      where: [{ name: seedCity.name }, ...seedCity.aliases.map((alias) => ({ name: alias }))],
      withDeleted: true,
    });

    if (existing?.deletedAt) {
      await cityRepository.recover(existing);
    }

    const entity = existing ?? cityRepository.create();
    entity.name = seedCity.name;
    await cityRepository.save(entity);
  }

  const cityMap = new Map<string, CityEntity>();
  const cities = await cityRepository.find({
    where: seedCities.map((seedCity) => ({ name: seedCity.name })),
  });

  for (const city of cities) {
    cityMap.set(city.name, city);
  }

  console.log(`[seed] cities ensured: ${seedCities.length}`);
  return cityMap;
}

async function upsertSegments(): Promise<Map<string, SegmentEntity>> {
  const segmentRepository = dataSource.getRepository(SegmentEntity);

  for (const segmentName of seedSegmentNames) {
    const existing = await segmentRepository.findOne({
      where: { name: segmentName },
      withDeleted: true,
    });

    if (existing?.deletedAt) {
      await segmentRepository.recover(existing);
    }

    const entity = existing ?? segmentRepository.create();
    entity.name = segmentName;
    await segmentRepository.save(entity);
  }

  const segmentMap = new Map<string, SegmentEntity>();
  const segments = await segmentRepository.find({
    where: seedSegmentNames.map((name) => ({ name })),
  });

  for (const segment of segments) {
    segmentMap.set(segment.name, segment);
  }

  console.log(`[seed] segments ensured: ${seedSegmentNames.length}`);
  return segmentMap;
}

async function upsertEnterprises(
  cityMap: Map<string, CityEntity>,
  segmentMap: Map<string, SegmentEntity>,
): Promise<void> {
  const enterpriseRepository = dataSource.getRepository(EnterpriseEntity);

  for (const seedEnterprise of seedEnterprises) {
    const city = cityMap.get(seedEnterprise.cityName);
    const segment = segmentMap.get(seedEnterprise.segmentName);

    if (!city || !segment) {
      throw new Error(
        `Missing city/segment for enterprise ${seedEnterprise.name}. city=${seedEnterprise.cityName} segment=${seedEnterprise.segmentName}`,
      );
    }

    const existing = await enterpriseRepository.findOne({
      where: { name: seedEnterprise.name },
      withDeleted: true,
    });

    if (existing?.deletedAt) {
      await enterpriseRepository.recover(existing);
    }

    const entity = existing ?? enterpriseRepository.create();
    entity.name = seedEnterprise.name;
    entity.ownerName = seedEnterprise.ownerName;
    entity.active = seedEnterprise.active;
    entity.city = city;
    entity.segment = segment;

    await enterpriseRepository.save(entity);
  }

  console.log(`[seed] enterprises upserted: ${seedEnterprises.length}`);
}

async function syncContacts(): Promise<void> {
  const enterpriseRepository = dataSource.getRepository(EnterpriseEntity);
  const contactRepository = dataSource.getRepository(ContactEntity);

  for (const seedEnterprise of seedEnterprises) {
    const enterprise = await enterpriseRepository.findOne({
      where: { name: seedEnterprise.name },
      relations: {
        contacts: {
          emails: true,
          phones: true,
        },
      },
    });

    if (!enterprise) {
      continue;
    }

    const contacts = seedEnterprise.contacts.map((seedContact) => {
      const contact = new ContactEntity();
      contact.enterprise = enterprise;
      contact.name = seedContact.name;
      contact.department = seedContact.department;
      contact.active = true;

      contact.emails = seedContact.emails.map((address) => {
        const email = new EmailEntity();
        email.address = address;
        email.active = true;
        return email;
      });

      contact.phones = seedContact.phones.map((number) => {
        const phone = new PhoneEntity();
        phone.number = number;
        phone.active = true;
        return phone;
      });

      return contact;
    });

    await contactRepository
      .createQueryBuilder()
      .delete()
      .from(ContactEntity)
      .where('enterprise_id = :enterpriseId', { enterpriseId: enterprise.id })
      .execute();

    if (contacts.length > 0) {
      await contactRepository.save(contacts);
    }
  }

  console.log('[seed] contacts synced for enterprises');
}

async function run(): Promise<void> {
  await dataSource.initialize();

  try {
    await upsertUsers();
    const cityMap = await upsertCities();
    const segmentMap = await upsertSegments();
    await upsertEnterprises(cityMap, segmentMap);
    await syncContacts();

    console.log('[seed] completed successfully');
  } finally {
    await dataSource.destroy();
  }
}

run().catch((error) => {
  console.error('[seed] failed', error);
  process.exit(1);
});
