const { GraphQLSchema } = require("graphql");
const mutation = require("./RootMutation");
const query = require("./RootQuery");

const schema = new GraphQLSchema({ query, mutation });

module.exports = schema;
