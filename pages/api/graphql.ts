import 'reflect-metadata';
import { ApolloServer } from "apollo-server-micro";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { buildSchema } from 'type-graphql';
import {
  UserRelationsResolver,
  UserCrudResolver,
  ListRelationsResolver,
  ListCrudResolver,
} from '../../graphql/generated/type-graphql/index';

export const config = {
  api: {
    bodyParser: false,
    // externalResolver: true,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

	const typeSchema = await buildSchema({
		resolvers: [
			UserRelationsResolver,
			UserCrudResolver,
			ListRelationsResolver,
			ListCrudResolver,
		],
		// emitSchemaFile: path.resolve(__dirname, './generated-schema.graphql'),
		validate: false,
	});

  const apolloServer = new ApolloServer({
    schema: typeSchema,
    context: () => ({ prisma }),
  });

  return apolloServer.createHandler({ path: "/api/graphql" })(req, res);
};
