# Chumbo Chili store

## About project
This project is an ecommerce store selling chili. It was made as a demo project to demonstrate the technical skills and knowledge of the author as a full stack web developer.

#### Technologies used
- [Svelte 5](https://svelte.dev/)
- [Sveltekit](https://svelte.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Postgresql](https://www.postgresql.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN Svelte](https://shadcn-svelte.com/)
- [Zod](https://zod.dev/)
- [Sveltekit Superforms](https://superforms.rocks/)

#### How to run project

1. Clone project 
a. with **https**. Run ```https://github.com/fanderssondev/chumbo-chili-store.git```
b. with **ssh**. Run ```git clone git@github.com:fanderssondev/chumbo-chili-store.git```
c. with **GitHub CLI**. Run ```gh repo clone fanderssondev/chumbo-chili-store```

2. Install dependecies. Run ```npm i```

3. Copy the **.env.example** file. 
a. Run ```cp ./.env.example ./.env```
b. Change the connection URL string to connect with database

4. Push database migratation. Run ```npx prisma db push```