## Requirements

You need a valid installation of 

 - [NodeJS](https://nodejs.org/en/download)
 - [MySQL](https://dev.mysql.com/doc/)

 ## Setting up the environment

- Set up your MySQL instance with a root password (this is the default configuration you get right after the installation)
- Create a database with the name `proyecto`
- Clone the repository
- Open a terminal in the repository folder and run the following commands

```bash
## Installs the project dependencies
npm install

## You can name the migration whatever you want when asked
npx prisma migrate dev


## Creates the prisma client code
npx prisma generate

## Run the project
npm run dev
```

After running that last command you can open [http://localhost:3000](http://localhost:3000) to see the app running. 

## Making changes to the database

This project uses [Prisma](https://www.prisma.io/docs). 
In order to make changes to the database schema (add new tables, columns, relations, etc) open the `schema.prisma` file and make your changes.

After finishing your changes run the following commands:

```bash
## Creates a new migration and applies it to the database
npx prisma migrate dev


## Creates the new client code
npx prisma generate
```

You can find more information about how prisma works [here](https://www.youtube.com/watch?v=RebA5J-rlwg&t=2682s&ab_channel=WebDevSimplified)

## Making changes to the backend and app

This project uses [NextJS](https://nextjs.org/). Which is a fullstack framework that allows us to have a SSR-Enabled React app and also allows to create a REST api very easily. 

You can find more information [here](https://www.youtube.com/watch?v=tA-_vAz9y78&ab_channel=midulive)