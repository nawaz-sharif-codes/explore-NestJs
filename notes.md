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
> nest g module auth

## How to create a Controller

> nest g controller [path]

## How to create a Service

> nest generate service [path]

## ConfigModule & ConfigService

> ConfigService is NestJS's official way of reading environment variables. Instead of accessing process.env throughout your application, NestJS centralizes configuration into one module that can be injected wherever it's needed.

```js
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

## MongoDB

- MongoDB is a flexible schema, Document Database. A document can contain nested objects.

```
{
  name: "Nawaz",
  address: {
    city: "Hyderabad",
    state: "Telangana",
    country: "India"
  }
}
```

```
---------------------------------------------------------
| SQL             | MongoDB                             |
| --------------- | ----------------------------------- |
| Database        | Database                            |
| Table           | Collection                          |
| Row             | Document                            |
| Column          | Field                               |
| JOIN            | Reference / Embedding / Aggregation |
| Schema required | Flexible by default                 |
---------------------------------------------------------
```

> Internally MongoDB converts it into a compact binary format that's efficient to store and query.

> Benefits

- Faster reads
- Faster writes
- Supports more data types than JSON
- Better indexing

## CRUD in MongoDB

### CREATE - creating documents

> insertOne() - creates a single document

```js
db.employees.insertOne({
  name: 'Nawaz',
  age: 26,
  department: 'Engineering',
});
```

> insertMany() - Insert multiple documents in one request, used for bulk operations

```js
db.employees.insertMany([
  {
    name: 'Alice',
    age: 30,
  },
  {
    name: 'Bob',
    age: 28,
  },
]);
```

### READ - for reading documents

> find() - Returns multiple documents.

```js
db.employees.find()

#Result - Returns a array
[
   {...},
   {...},
   {...}
]
```

> findOne() - returns the first matching document

```js
db.employees.findOne({
   email: "nawaz@gmail.com"
})

Result - Not an array, returns a single document

{
   name:"Nawaz",
   ...
}
```

> Filtering

Example:

```js
db.employees.find({
  department: 'Engineering',
});
```

### Comparison Operators - $gt,$gte,$lt,$lte,$ne

```js
db.employees.find({
   age: { $gt: 25 }
})

Greater than or equal

{
   age: { $gte: 25 }
}

Less than

{
   age: { $lt: 40 }
}

Less than or equal

{
   age: { $lte: 40 }
}

Not equal

{
   department: { $ne: "HR" }
}
```

### Combining Conditions

```js
db.employees.find({
  age: { $gte: 25 },
  department: 'Engineering',
});
```

### Projections

> In MongoDB, projection means choosing which fields to return from a document. Instead of returning the entire document, you return only the fields you need.

- Syntax

```js
db.collection.find(
  <filter>,
  <projection>

  db.users.find(
  { email: "nawaz@gmail.com" },
  {
    name: 1,
    contactNumber: 1
  }
)
)
```

### Projections in Mongoose

```js
//for include
const user = await this.userModel.findById(id).select('name email');

//for exclude
const user = await this.userModel.findById(id).select('-password');
```

```
-----------------------------------------------------------------------------------------
| Operation                         | MongoDB                 | Mongoose                |
| --------------------------------- | ----------------------- | ----------------------- |
| Include fields                    | `{ name: 1, email: 1 }` | `.select('name email')` |
| Exclude fields                    | `{ password: 0 }`       | `.select('-password')`  |
| Exclude `_id`                     | `{ _id: 0 }`            | `.select('-_id')`       |
| Include password hidden by schema | N/A                     | `.select('+password')`  |
-----------------------------------------------------------------------------------------
```

### Sorting

```js
Ascending: db.employees.find().sort({
  age: 1,
});

Descending: db.employees.find().sort({
  salary: -1,
});
```

### Limiting & Skipping

```js
Limiting

Get first five employees.

db.employees.find().limit(5)
Skipping

Useful for pagination.

db.employees.find()
.skip(10)
.limit(10)
```

### UPDATE

> updateOne()

```js
db.employees.updateOne(
  {
    email: 'nawaz@gmail.com',
  },
  {
    $set: {
      salary: 150000,
    },
  },
);
```

> updateMany()

```js
db.employees.updateMany(
  {
    department: 'Engineering',
  },
  {
    $set: {
      isActive: true,
    },
  },
);
```

### DELETE

> deleteOne()

```js
db.employees.deleteOne({
   email: "abc@gmail.com"
})

Deletes the first matching document.
```

> deleteMany()

```js
db.employees.deleteMany({
   isActive: false
})

Deletes all inactive employees.
```

## How this maps to Mongoose

```
-------------------------------------------------------------
| MongoDB        | Mongoose                                 |
| -------------- | ---------------------------------------- |
| `insertOne()`  | `Model.create()` or `new Model().save()` |
| `insertMany()` | `Model.insertMany()`                     |
| `find()`       | `Model.find()`                           |
| `findOne()`    | `Model.findOne()`                        |
| `updateOne()`  | `Model.updateOne()`                      |
| `updateMany()` | `Model.updateMany()`                     |
| `deleteOne()`  | `Model.deleteOne()`                      |
| `deleteMany()` | `Model.deleteMany()`                     |
-------------------------------------------------------------
```

## Advanced Query Operators

```
---------------------------------------------------------------------------
| Operator     | Purpose                                                  |
| ------------ | -------------------------------------------------------- |
| `$in`        | Match any value from a list                              |
| `$nin`       | Exclude values from a list                               |
| `$or`        | At least one condition must match                        |
| `$and`       | All conditions must match                                |
| `$exists`    | Check if a field exists                                  |
| `$regex`     | Pattern matching / search                                |
| `$size`      | Match array length                                       |
| `$all`       | Array must contain all specified values                  |
| `$elemMatch` | Match a single array element against multiple conditions |
---------------------------------------------------------------------------

```

### $in - returns all the documents which meets condition
```js
db.employees.find({
  department: {
    $in: ['Engineering', 'HR'],
  },
});
```

### $nin - opposite of $in

```js
db.employees.find({
  department: {
    $nin: ["Engineering"]
  }
})
```

### $or 

```js
db.employees.find({
  $or: [
    { department: "Engineering" },
    { salary: { $gt: 150000 } }
  ]
})
```

### and

```js
db.employees.find({
  department: "Engineering",
  age: { $gt: 25 }
})
```

### $exists

```js
db.users.find({
  phone: {
    $exists: true
  }
})
```

## Why do we need Index?

```js
db.users.findOne({email: "nawaz@gmail.com"})
```
> MongoDB searches/scans all the documents of the collection one by one to get email: "nawaz@gmail.com" which makes the query time slower. To fix this we need to create Index on the most searched fields. Now when MongoDB searches on Index, Index directly points to the document.

> An index is a separate data structure maintained by MongoDB.

```
It stores:

Indexed Field
↓
Pointer
↓
Actual Document
```

### How to create an Index

```js
For Ascending : 
db.users.createIndex({
   email:1
})

For Descending : 
db.users.createIndex({
   salary:-1
})

Ascending vs Descending - It affects how MongoDB traverses the index efficiently for sorting.Direction matters mainly for sort operations and compound indexes.

Ascending : 

10,20,30,40,50

Descending :

50,40,30,,20,10
```

## Compound Index 

> Suppose your application frequently runs:

```js
db.users.find({
   department:"Engineering",
   age:26
})
```


> Instead of two separate indexes: department & age

> Create one compound index:
```js
db.users.createIndex({
   department:1,
   age:1
})

- MongoDB can efficiently answer queries using both fields together.
```
> Order Matters
```
After creating compound Index of department and age 

Case 1 : Querying with only department field -- Good
Case 2 : Querying with both department & age field -- Good
Case 3 : Querying with only age field -- not optimal

Why? 
MongoDB uses the leftmost prefix rule.
```

## Unique Index - Duplicates are rejected automatically.

```js
db.users.createIndex(
   {
      email:1
   },
   {
      unique:true
   }
)
```

## TTL Index

TTL means: Time To Live

```js
db.otps.createIndex(
   {
      expiresAt:1
   },
   {
      expireAfterSeconds:0
   }
)
```

Suppose OTP expires after 10 minutes.

Instead of writing a cleanup job which deletes expired OTP

- MongoDB can delete them automatically.
- When the expiresAt time passes, MongoDB's background TTL monitor removes the document automatically (not necessarily at the exact second).

## Explain()

One of the most powerful tools in MongoDB.

Instead of guessing...

Ask MongoDB what it did.

```js
db.users.find({
   email:"nawaz@gmail.com"
}).explain()
```

The output includes:

Which index was used
Whether a collection scan occurred
Documents examined
Keys examined
Execution time

In production, explain() is invaluable when diagnosing slow queries.

## @nestjs/mongoose

```
NestJS
   │
   ▼
Mongoose (@nestjs/mongoose)
   │
   ▼
MongoDB Driver
   │
   ▼
MongoDB Server (Atlas)
```

```
What Does MongooseModule.forRoot() Do?

NestJS Application Starts
          │
          ▼
Loads AppModule
          │
          ▼
Loads MongooseModule.forRoot(...)
          │
          ▼
Creates MongoDB Connection
          │
          ▼
Registers Connection in NestJS DI Container
          │
          ▼
Other Modules Can Use It
```

```
What Does forFeature() Do?

Now suppose you have a User schema.

User Schema

You want to use it inside UserService.

How does NestJS know about it?

That's the job of forFeature().

Conceptually:

User Schema
      │
      ▼
Create User Model
      │
      ▼
Register in DI Container
      │
      ▼
Inject into UserService
```

So:

forRoot() creates the database connection.
forFeature() registers models for a specific module.

### Installation
```js
- pnpm install @nestjs/mongoose mongoose

- Recommended App Module 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI"),
      }),
    }),
  ],
})
export class AppModule {}
```

### Why forRootAsync()?

```
Most tutorials use:

MongooseModule.forRoot(uri);

That works, but forRootAsync() is more flexible.

It lets you:

Read from ConfigService.
Load secrets from a secret manager.
Configure TLS.
Add retry options.
Build the connection dynamically.

In production, this flexibility is valuable.
```

### What is a Schema?

A Schema is a blueprint that describes:

- What fields exist
- Their data types
- Validation rules
- Default values
- Indexes
- Relationships
- How documents behave

In Mongoose:

```
Schema
     │
     ▼
Documents

Every document created from the schema follows the same structure.
```

### The Three Building Blocks

- Every Mongoose schema has three important pieces.

```js
Class
   │
   ▼
@Schema()
   │
   ▼
SchemaFactory
```

### Step 1 — The Class

- A schema starts as a TypeScript class.

Example:

```js
export class User {
  name: string;

  age: number;

  email: string;
}
```

### Step 2 — @Schema()

- Now we decorate the class.

```js
@Schema()
export class User {}
```

- This tells NestJS: "This class should become a Mongoose schema."

### Step 3 — @Prop()

- Each property that should be stored in MongoDB needs `@Prop()`.
- Without @Prop(), the field is not included in the schema.

### Step 4 — SchemaFactory

Now convert the class into a real Mongoose schema.

```js
export const UserSchema = SchemaFactory.createForClass(User);
```

```js
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

### Schema Options

- The @Schema() decorator accepts configuration options.

#### 1. timestamps
```js
@Schema({
  timestamps: true,
})
```

```
Now Mongoose automatically adds:

{
  "createdAt": "...",
  "updatedAt": "..."
}

> Whenever you save a document:

Create User
↓
createdAt = now
updatedAt = now

> When you update:

Update User
↓
updatedAt changes

createdAt stays the same
```

#### 2. collection

By default:

export class User {} becomes `users`

- Mongoose pluralizes the model name.

- If you want a custom collection:

```js
@Schema({
  collection: "customers",
})

Now data is stored in: customers collection
```

#### 3. versionKey: false

```
MongoDB stores:

{
  "__v": 0
}

This is the version key.

It helps Mongoose track document versions and supports features like optimistic concurrency.

Many tutorials disable it immediately:

versionKey: false

Don't do this blindly.

Only disable it if you understand why your application doesn't need it.
```

#### 4. strict: true

```
Suppose schema: 

@Schema({timestamps: true,
collection: 'users',
versionKey: false,
strict: true})

export class User{
  @Prop()
  name : string,
  @Prop()
  email : string
}

Someone inserts:

{
  "name": "Nawaz",
  "email": "abc@gmail.com",
  "salary": 100000
}

With strict mode enabled (the default):

salary
↓
Ignored

Only schema-defined fields are stored.

This helps keep your database clean.
```

### @Prop() options

#### 1. Default Values

```js
@Prop({
  default: true,
})
isActive: boolean;

- Now every new user automatically gets:

{
  "isActive": true
}

No need to repeat it in your service layer.
```

#### 2. Required Fields

```js
@Prop({
  required: true,
})
email: string;

- Now if object doesnt contain email

{name: 'nawaz'}

- fails validation.

- Mongoose rejects it before writing to MongoDB.
```

#### 3. Enum Values

Suppose users can have only: ADMIN,USER,MANAGER

```js
Schema:

@Prop({
  enum: ["ADMIN", "USER", "MANAGER"],
})
role: string;
```
Now:

CEO

is rejected.


## Validate at the Right Layer

```
Client Request

↓

DTO Validation

↓

Business Logic

↓

Mongoose Schema Validation

↓

MongoDB
```


## ValidationPipe
> A built-in, out-of-the-box mechanism to validate and automatically transform incoming client request payloads before they reach your route handlers

### What Is a Pipe?

- A pipe is a class that runs on controller arguments before the controller method executes.

Example : The request doesn't conceptually jump directly into createUser().

```js
@Post()
createUser(@Body() body: CreateUserDto) {
  console.log(body);
}
```

```
HTTP Request
     │
     ▼
   Pipes
     │
     ▼
Controller Method
```
### A pipe has two primary responsibilities:
```
Pipe
 ├── Transformation
 └── Validation
 ```

#### Transformation
> Converts input from one form to another form.

Consider: GET /users/123

Controller:
```js
@Get(":id")
findUser(@Param("id") id: number) {
  console.log(typeof id);
}
```

```
You wrote:

id: number

But HTTP path parameters arrive as strings.

The actual input is:

"123"

not:

123

Remember our previous lesson?

TypeScript does not exist at runtime.

So this:

id: number

does not automatically mean the incoming HTTP value is a number.
```

#### Using ParseIntPipe

```js
@Get(":id")
findUser(
  @Param("id", ParseIntPipe) id: number,
) {
  console.log(typeof id);
}
```

> Flow

```
"123"
  │
  ▼
ParseIntPipe
  │
  ▼
123
  │
  ▼
Controller
```

```
The pipe transformed:

string → number

If the client sends:

/users/nawaz

ParseIntPipe fails.

The controller does not execute.
```

#### Validation

Now consider:
```js
{
  "email": "hello",
  "age": -10
}
```
A validation pipe asks:

Is email valid?
      │
      ├── No ❌
      │
      ▼
Throw Exception

The request stops before reaching your controller.

HTTP Request
     │
     ▼
ValidationPipe
     │
     ├── Invalid ──► 400 Bad Request
     │
     ▼
Controller

This is important.

Your controller should ideally receive already validated input.

### NestJS Request Lifecycle

```
HTTP Request
      │
      ▼
Middleware
      │
      ▼
Guards
      │
      ▼
Interceptors
      │
      ▼
Pipes
      │
      ▼
Controller
      │
      ▼
Service
```

## What Is ValidationPipe?

```js
import { ValidationPipe } from "@nestjs/common";

- Its job is to validate incoming controller arguments against DTO validation metadata.
```

Typical setup : 
```js
- On controller method
@Post()
@UsePipes(new ValidationPipe({ transform: true }))
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

```js
- To enable this behavior globally, set the option on a global pipe:
app.useGlobalPipes(
  new ValidationPipe(),
);
```
Conceptually:

```js
transform(value, metadata) {
  console.log(metadata.metatype);
}
```

1. Example of Custom ValidationPipe : 

```js
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
} from "@nestjs/common";

@Injectable()
export class LoggingPipe implements PipeTransform {
  transform(
    value: unknown,
    metadata: ArgumentMetadata,
  ) {
    console.log("VALUE:", value);
    console.log("METADATA:", metadata);

    return value;
  }
}
```

2. Example of Custom AgeValidationPipe :

```js
@Injectable()
export class AgeValidationPipe implements PipeTransform {
  transform(value: number) {
    if (value < 18) {
      throw new BadRequestException(
        "Age must be at least 18",
      );
    }

    return value;
  }
}
```

Controller
```js
@Post()
createUser(
  @Body("age", AgeValidationPipe)
  age: number,
) {
  return age;
}
```


## class-transformer

1. Use class-transformer globally

### transform: true

This enables automatic transformation.
```js
app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
```


2. Explicit conversion

```js
fetchUser(@Param('id', ParseIntPipe) id: number) {}
fetchUser(@Param('sort', ParseBoolPipe) id: boolean) {}
```

### whitelist: true

This is very important for production.

DTO:
```js
class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;
}
```
Client sends:

```js
{
  "email": "nawaz@gmail.com",
  "name": "Nawaz",
  "isAdmin": true
}
```

Dangerous field:

isAdmin

With:
```js
new ValidationPipe({
  whitelist: true,
})
```

Nest removes properties that do not have validation decorators in the DTO.

Controller receives:

```js
{
  "email": "nawaz@gmail.com",
  "name": "Nawaz"
}
```

isAdmin is stripped.

### forbidNonWhitelisted: true

With only:

whitelist: true

unknown fields are removed.

But maybe you want the API to reject the request completely.

Use:

```js
new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
})
```

Client:

```js
{
  "email": "nawaz@gmail.com",
  "isAdmin": true
}
```

Result:

400 Bad Request

Nest requires whitelist: true with forbidNonWhitelisted: true for this behavior.

## class-validator

- class-validator provides decorator-based runtime validation and is the standard validation approach documented by NestJS.

```
TypeScript type     → Compile-time safety
class-validator     → Runtime validation
```

```
HTTP JSON
   │
   ▼
ValidationPipe
   │
   ▼
class-transformer
   │
   ▼
DTO Instance
   │
   ▼
class-validator
   │
   ├── Invalid → 400
   │
   ▼
Controller
```

Installation

```js
npm install class-validator class-transformer
```

Then configure the global pipe:

```js
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}

bootstrap();
```

### String Validators

1. @IsString()
```
@IsString() - Theory: Value must be a JavaScript string.
```

2. @IsNotEmpty()
```
@IsNotEmpty() - Theory: Value must not be an empty string.
```

3. @MinLength()
```
@MinLength() - Minimum string length.

```
4. @MaxLength()
```
@MaxLength() - Maximum string length.
```

4. @Length(min,max)
```
@Length() - Minimum and maximum length together.
```

> Visit : https://chatgpt.com/c/6a4a89d0-c8fc-83e8-9895-048db383c7b8 for detailed explanations on the ValidationPipe, class-transformer & class-validator.

---




