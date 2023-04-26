const { GraphQLObjectType } = require("graphql");

const posts = require('./post')
const info = require('./myInfo')

module.exports = new GraphQLObjectType({
  name: "Query",
  fields: { posts, info },
});
