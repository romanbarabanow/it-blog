const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

const PostType = new GraphQLObjectType({
  name: "PostType",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    img_link: { type: GraphQLString },
    tittle: { type: GraphQLString },
    text: { type: GraphQLString },
  }),
});

module.exports = PostType;
