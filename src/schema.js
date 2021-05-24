import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

const allTypeDefs = loadFilesSync(`${__dirname}/api/**/*.typedefs.js`);
const allResolvers = loadFilesSync(`${__dirname}/api/**/*.resolvers.js`);

export const typeDefs = mergeTypeDefs(allTypeDefs);
export const resolvers = mergeResolvers(allResolvers);