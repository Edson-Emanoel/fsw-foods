npm install prisma --save-dev

npx prisma init --datasource-provider postgresql

npx prisma migrate dev --name init_database

npm install -D ts-node

npx prisma db seed

npx shadcn@latest init