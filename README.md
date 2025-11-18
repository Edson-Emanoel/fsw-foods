# FSW Foods

**Template completo de restaurante/delivery — mobile first**

<div align="center">

### Mobile

| Home                                                        | Categorias                                                              | Detalhe do Produto                                                      | Sacola                                                        |
| ----------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------- |
| <img src="./public/MobileHome.png" alt="Home" width="280"/> | <img src="./public/MobileCategories.png" alt="Categorias" width="280"/> | <img src="./public/MobileProductDetail.png" alt="Produto" width="280"/> | <img src="./public/MobileCart.png" alt="Sacola" width="280"/> |

</div>

---

<div align="center">

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2.31-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-6.13.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-black?style=for-the-badge)](https://ui.shadcn.com)

</div>

---

### Tech Stack

- **Next.js 14.2.31** (App Router)
- **React 18** + **TypeScript 5**
- **Tailwind CSS 3.4.1** + `tailwindcss-animate`
- **shadcn/ui** (Dialog, Sheet, Card, Button, Separator)
- **Prisma 6.13.0** + PostgreSQL (com seed via `ts-node`)
- **lucide-react** para ícones

---

### Comandos que foram usados

```bash
# Prisma
npm install prisma --save-dev
npx prisma init --datasource-provider postgresql
npx prisma migrate dev --name init_database
npx prisma db seed        # executa ./prisma/seed.ts
```

# shadcn/ui

npx shadcn@latest init
npx shadcn@latest add card button sheet dialog separator

# Formatação

npm install -D prettier prettier-plugin-tailwindcss
