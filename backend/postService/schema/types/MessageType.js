const { GraphQLObjectType, GraphQLString } = require("graphql");

const MessageType = new GraphQLObjectType({
  name: "MessageType",
  fields: () => ({
    message: { type: GraphQLString },
  }),
});

module.exports = MessageType;
