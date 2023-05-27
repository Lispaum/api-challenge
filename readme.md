### To run tests:

docker compose up -d

npm run test:coverage

### Requisitos:

[x] No banco, ter uma tabela 'usuario' com os campos:

id _int_  
nome _string_  
email _string_  
senha _string_  
telefone _string_  
dataCriacao _date_

[x] É necessário implementar as operações de CRUD:  
[x] A operação de CREATE (POST) deve validar os campos do usuário, verificar se o email já está cadastrado e se a senha tem pelo menos 8 caracteres  
[x] A operação de READ (GET) deve ser capaz de buscar todos os usuários cadastrados na tabela 'usuario' e também buscar um usuário específico por ID.  
[x] A operação de UPDATE (PUT) também deve validar os campos do usuário, seguindo as mesmas condições da operação de CREATE.  
[x] Já a operação de DELETE (DELETE) deve ser capaz de remover um usuário específico por ID.

São esperados 5 Endpoints.  
POST - para cadastro de um novo usuario,  
GET - um para listagem de todos  
GET - para buscar um usuario por id  
PUT - para alteração de um usuario  
Delete - para deletar um usuario.

[x]  
1 - Criar um endpoint específico para realizar um LOGIN, onde irá passar email e senha no corpo da requisição, retornando um token JWT.  
2 - Autenticar as rotas de PUT, GET e DELETE com o Bearer Token no header.

Você pode utilizar quaisquer bibliotecas e ferramentas que desejar, desde que a API funcione corretamente e os testes passem. Boa sorte!

### dependecies list

`npm init -y`  
`npm i typescript @types/node tsx tsup eslint @rocketseat/eslint-config prisma @types/bcryptjs vitest vite-tsconfig-paths supertest @types/supertest npm-run-all -D`  
`npm i fastify @fastify/jwt dotenv zod @prisma/client bcryptjs`  
`npx tsc --init`
