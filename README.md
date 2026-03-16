# SCTEC API (Back-end)

API REST para gerenciamento de empreendimentos catarinenses, desenvolvida com NestJS, TypeORM e PostgreSQL.

Este projeto atende ao desafio de CRUD do programa SCTEC com foco em organização modular, regras de domínio claras e execução simples em ambiente local.

## Repositórios relacionados

- Back-end (este projeto): `https://github.com/gabriellfernandes/SCTec`
- Front-end: `https://github.com/gabriellfernandes/SCTec-front-end`

## Objetivo da solução

A API centraliza o cadastro e a manutenção de informações sobre empreendimentos em Santa Catarina, cobrindo:

- nome do empreendimento
- nome do responsável
- município
- segmento
- meios de contato
- status (ativo/inativo)

Além do CRUD principal de empresas, a solução expõe módulos de apoio (cidades, segmentos e contatos) e autenticação com perfis de acesso.

## Stack utilizada

- Node.js 22
- NestJS 11
- TypeScript
- TypeORM
- PostgreSQL 16
- Docker e Docker Compose
- JWT (autenticação)
- class-validator e class-transformer

## Arquitetura

O projeto segue arquitetura modular por domínio.

Cada módulo é dividido em camadas com responsabilidade explícita:

- `controller/`: entrada HTTP e delegação
- `dto/`: contratos de entrada e saída
- `entity/`: entidades TypeORM
- `service/provider.ts`: leitura/consulta
- `service/manager.ts`: escrita e persistência
- `service/request-manager.ts`: orquestração de escrita
- `service/response-mapper.ts`: mapeamento de entity para DTO

Estrutura principal:

```text
src/
  app.module.ts
  main.ts
  auth/
    auth/
    user/
  enterprise/
    enterprise/
    city/
    segment/
    contact/
    contact-email/
    contact-phone/
  database/
    data-source.ts
    migrations/
  shared/
    dto/
    service/
    http/
```

## Modelo de domínio

Relacionamentos implementados:

- `enterprise` N:1 `city`
- `enterprise` N:1 `segment`
- `enterprise` 1:N `contact`
- `contact` 1:N `email`
- `contact` 1:N `phone`

Observações de modelagem:

- `city` e `segment` funcionam como entidades de referência.
- `contact` suporta campos de identidade (`name`, `department`) além de emails e telefones.
- Exclusões seguem soft delete em todas as entidades.

## Segurança e acesso

A API utiliza JWT com dois guards globais:

- `JwtAuthGuard`: exige token por padrão
- `RolesGuard`: valida perfil por rota

Perfis disponíveis:

- `admin`
- `editor`
- `viewer`

Regras gerais:

- leitura: `admin`, `editor`, `viewer`
- escrita (create/update): `admin`, `editor`
- exclusão: `admin`

Rotas públicas:

- `POST /api/auth/login`

Rotas autenticadas:

- `GET /api/auth/me`
- todos os demais recursos

## Endpoints principais

Base URL local: `http://localhost:3000/api`

### Auth

- `POST /auth/login`
- `GET /auth/me`

### Enterprises

- `POST /enterprises`
- `GET /enterprises`
- `GET /enterprises/:id`
- `PATCH /enterprises/:id`
- `DELETE /enterprises/:id`

Filtros e ordenação em listagem:

- `cityId`
- `segmentId`
- `sort`: `name | ownerName | active | cityName | segmentName`
- `order`: `ASC | DESC`
- `page`, `limit`

### Cities

- `POST /cities`
- `GET /cities`
- `GET /cities/:id`
- `PATCH /cities/:id`
- `DELETE /cities/:id`

### Segments

- `POST /segments`
- `GET /segments`
- `GET /segments/:id`
- `PATCH /segments/:id`
- `DELETE /segments/:id`

### Contacts

- `POST /contacts`
- `GET /contacts`
- `GET /contacts/:id`
- `PATCH /contacts/:id`
- `DELETE /contacts/:id`

### Contact Emails

- `POST /contact-emails`
- `GET /contact-emails`
- `GET /contact-emails/:id`
- `PATCH /contact-emails/:id`
- `DELETE /contact-emails/:id`

### Contact Phones

- `POST /contact-phones`
- `GET /contact-phones`
- `GET /contact-phones/:id`
- `PATCH /contact-phones/:id`
- `DELETE /contact-phones/:id`

## Regras de negócio implementadas

- Não permite excluir município com empresas vinculadas (retorna `409 Conflict`).
- Não permite excluir segmento com empresas vinculadas (retorna `409 Conflict`).
- Validação de payload com `ValidationPipe` global (`whitelist`, `transform`, `forbidNonWhitelisted`).
- Paginação padrão com cabeçalhos HTTP (`x-total`, `x-page`, `x-limit`, `x-total-pages`).

## Variáveis de ambiente

Arquivo base: `.env.example`

```env
NODE_ENV=development
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=atec
DB_SYNC=false

JWT_SECRET=change_me
CORS_ORIGIN=http://localhost:5173,http://127.0.0.1:5173
```

## Como executar

### Opção 1: Docker Compose (recomendado)

No diretório `project/back-end`:

```bash
docker compose up -d --build
```

Isso sobe:

- PostgreSQL em `localhost:5432`
- API em `localhost:3000`

### Opção 2: execução local

1. Instale dependências:

```bash
npm install
```

2. Configure `.env` com base no `.env.example`.

3. Execute migrations:

```bash
npm run migration:run
```

4. Execute o seed inicial:

```bash
npm run seed
```

5. Inicie a API:

```bash
npm run start:dev
```

Credenciais criadas pelo seed:

- admin: `admin@sctec.local` / `admin1234`
- editor: `editor@sctec.local` / `edit1234`
- viewer: `viewer@sctec.local` / `view1234`

## Migrations

Comandos úteis:

```bash
npm run migration:run
npm run migration:revert
npm run migration:generate
```

Data source do TypeORM CLI:

- `src/database/data-source.ts`

## Scripts úteis

```bash
npm run start:dev
npm run build
npm run start:prod
npm run lint
npm run test
npm run seed
```

## Dados iniciais (seed)

O seed cria dados reais para facilitar validação funcional da API:

- 3 usuários fixos (`admin`, `editor`, `viewer`)
- municípios de Santa Catarina com grafia correta (ex.: Florianópolis, Joinville, Blumenau, Tubarão, Lages)
- segmentos obrigatórios do desafio
- empresas com relacionamento completo de cidade e segmento
- contatos com `name`, `department`, emails e telefones

Usuários fixos do seed:

- admin: `admin@sctec.local` / `admin1234`
- editor: `editor@sctec.local` / `edit1234`
- viewer: `viewer@sctec.local` / `view1234`

Municípios seedados:

- Florianópolis
- Joinville
- Blumenau
- São José
- Chapecó
- Criciúma
- Itajaí
- Jaraguá do Sul
- Lages
- Balneário Camboriú
- Tubarão

Comportamento do seed:

- idempotente para usuários, cidades, segmentos e empresas
- atualiza credenciais e perfis dos usuários seed
- sincroniza contatos das empresas seed para manter consistência de ambiente

Arquivo:

- `src/database/seeds/seed.ts`

## Exemplos de requests

Documentação de payloads e chamadas por rota:

- `docs/api-examples.md`

Observação sobre API docs:

- no momento não há Swagger/OpenAPI publicado;
- a referência oficial da API está em `docs/api-examples.md`.

## Exemplo de autenticação

Request:

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@sctec.local",
  "password": "your_password"
}
```

Response (resumo):

```json
{
  "accessToken": "...",
  "expiresIn": "1h",
  "user": {
    "id": "...",
    "name": "...",
    "email": "...",
    "role": "admin",
    "active": true
  }
}
```

## CORS e integração com front-end

- Prefixo global de rotas: `/api`
- CORS configurado por `CORS_ORIGIN`
- Origens padrão: `http://localhost:5173` e `http://127.0.0.1:5173`

## Status do escopo

Itens atendidos no back-end:

- CRUD de empreendimentos
- CRUD de municípios
- CRUD de segmentos
- CRUD de contatos (incluindo emails e telefones)
- filtros de listagem por cidade e segmento
- paginação e ordenação
- autenticação e autorização por perfil

## Link do vídeo pitch

- `https://drive.google.com/file/d/1AUmTMw4Ahx6utli9To85rgX0Y_HBaInE/view?usp=sharing`
