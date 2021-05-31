import 'reflect-metadata';
import { buildTypeDefsAndResolvers } from "type-graphql";
import { makeExecutableSchema } from "graphql-tools";

import {
  ListCrudResolver,
  ListRelationsResolver,
  UserCrudResolver,
  UserRelationsResolver,
} from './generated/type-graphql/index';

export const schema = async () => {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [
			ListCrudResolver,
			ListRelationsResolver,
			UserCrudResolver,
			UserRelationsResolver,
		],
    emitSchemaFile: "./generated-schema.graphql",
    validate: false,
  });
  return makeExecutableSchema({ typeDefs, resolvers: resolvers });
};
