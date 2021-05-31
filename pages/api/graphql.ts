import 'reflect-metadata';
import { ApolloServer } from "apollo-server-micro";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { buildSchema } from 'type-graphql';
import {
  ListCrudResolver,
  ListRelationsResolver,
  UserCrudResolver,
  UserRelationsResolver,
} from '../../graphql/generated/type-graphql/index';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

	const typeSchema = await buildSchema({
		resolvers: [
			ListCrudResolver,
			ListRelationsResolver,
			UserCrudResolver,
			UserRelationsResolver,
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
