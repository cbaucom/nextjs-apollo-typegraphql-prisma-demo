# NextJS-Apollo-TypeGraphQL-Prisma

A next js app with apollo, typegraphql and prisma.

## Running

There is already a sql database with example data included.

Make sure you run `npx prisma generate` first in order to generate the definition files.

If the data is not there, try running the following:

```
npx prisma migrate dev --name init
```

That will sync thhe database with your schema.

You can also seed your database with the following command:

`npx prisma db seed --preview-feature`

To start the dev server run `yarn dev`

## The different steps

![The setup](https://i.imgur.com/TnU4l2W.png)

### NextJs

NextJs is a react framework that allows you to devlop a seamless front-end and back-end experience. In this case, we can utalise its backend ability to set up our graphql server.

See their [site](https://nextjs.org/) for information.

### GraphQL

GraphQL is alternative way to create APIs for your site. Instead of having individual endpoints as REST does, graphQL uses a query-like syntax to handling information.

See their [site](https://graphql.org/) for information.

### Apollo-server

Apollo-server is used in order to host the graphQL client. It is the interface to handling all graphQL querires. There are other alternatives like [graphql-yoga](https://github.com/prisma-labs/graphql-yoga). Each service will provide different features.

We use the Apollo-server-micro version has it enables us to host an apollo client on a http request setup.

I chose Apollo as it was used in the initial example. See their [site](https://www.apollographql.com/) for information.

### Prisma

Prisma allows us to interface with our database. While apollo only handles the logic of recieving queries, Prisma helps to retrieve and modify data in the database. By creating a schema that Prisma will, it will provide the basic create, retrieve, update, and delete functionality in code.

### TypeGraphQL

GraphQL requires a schema in order to resolve quries. The schema defines the api of your app. This is usually done in a non-typed way within code. TypeGraphQL offers a typed way in order to expose object types and use them around your code.

Their website can be found [here](https://typegraphql.com/).

### typegraphql-prisma

`typegraphql-prisma` gives us the ability to create the relavent typed graphql classes and resolvers to use in our server. This means we can just specify the schema in prisma, and `typegraphql-prisma` will automatically create everything we need to use.

## The Journey

Begin by following the nextJs and apollo integration example on their repo. See the example [here](https://github.com/vercel/next.js/tree/canary/examples/api-routes-apollo-server-and-client).

### Setting up Prisma

For Prisma, I decided to use a local sqlite database file. The schema file was set up to do this, as well as setting up a simple model to use.

In order to create the database, I decided to use [prisma migrate](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-migrate) to handle its creation.

We run the prisma generate function to create all the files we need to use.

We hook the into prisma by first instantiating the client, then pass it as the context when starting the apollo server client as seen in `api/graphql.ts`.

With the context in place, we are able to access the database within the resolver.

### Setting up TypeGraphQL

TypeGraphQL was the hardest part as we had to deal with decorators in nextJs. In the end, it was simply just to set the right babel parameters in order for it to work.

Initially we must first set the right config for typescript in `tsconfig.json` by following the [installation guide](https://typegraphql.com/docs/installation.html).

We then have to create a custom `.babelrc` to handle issues when compiling. These two plugins were needed in order for the nextJs to understand the decorators.

```json
(["@babel/plugin-proposal-decorators", { "legacy": true }],
["@babel/plugin-proposal-class-properties", { "loose": true }])
```

Lastly, an issue occured where TypeGraphQL could not read the primary types (String) as set from typescript. In order to solve this, we use:

```json
    "babel-plugin-transform-typescript-metadata",
```

### Setting up typegraphql-prisma

Todo

