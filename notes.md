## Explore-NestJs

## How to install NestJs cli?
> pnpm install -g @nestjs/cli

## How to create a NestJs application
> nest new <project-name>

## Decorators
> @Injectable, @Get etc., are decorators which add extra behaviour/metadata to the function or class.

## How to create resources in NestJs
> nest generate <resource_name> [path]

## How to create a Module
> nest g module [path]
~ nest g module auth

## How to create a Controller
> nest g controller [path]

## How to create a Service
> nest generate service [path]

## ConfigModule & ConfigService
>ConfigService is NestJS's official way of reading environment variables. Instead of accessing process.env throughout your application, NestJS centralizes configuration into one module that can be injected wherever it's needed.

```
Step 1: Install it
> npm install @nestjs/config

Step 2: Create a .env
PORT=3000
SALT_ROUNDS=10
JWT_SECRET=my-secret-key
DATABASE_URL=postgres://localhost:5432/mydb

Step 3: Import ConfigModule

Open app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}

- What does this do?

> It loads the .env file when the application starts. Make ConfigService available

- What is isGlobal: true?

Without it:

@Module({
    imports: [ConfigModule]
})

Every module must import ConfigModule.

Example:

AuthModule

↓

imports: [ConfigModule]
UserModule

↓

imports: [ConfigModule]
PaymentModule

↓

imports: [ConfigModule]

This gets repetitive.

With

ConfigModule.forRoot({
    isGlobal: true
})

Every module can inject ConfigService automatically.

No need to import ConfigModule everywhere.

Step 4: Inject ConfigService

Instead of

const rounds = process.env.SALT_ROUNDS;

do

constructor(
    private readonly configService: ConfigService,
) {}

Now NestJS creates the ConfigService instance for you.

This is called Dependency Injection (DI).

Step 5: Read variables

Suppose

SALT_ROUNDS=10

Then

const rounds = this.configService.get<number>('SALT_ROUNDS');

returns

10

Similarly,

JWT_SECRET=my-secret
const secret = this.configService.get<string>('JWT_SECRET');

returns

my-secret
```