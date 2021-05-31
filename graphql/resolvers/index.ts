import "./user";
import user from "./user";
import { NonEmptyArray } from "type-graphql";

export const myResolvers = (): NonEmptyArray<Function> => {
  let resolvers = [];

  resolvers.push(...user);
  return resolvers as NonEmptyArray<Function>;
};
