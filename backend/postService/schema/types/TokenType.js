const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

const tokenType = new GraphQLObjectType({
  name: "tokenType",
  fields: () => ({
    token: { type: GraphQLString },
    name: {type: GraphQLString}
  }),
});

module.exports = tokenType;
