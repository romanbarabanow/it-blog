const { GraphQLObjectType } = require("graphql");
const createUser = require("./createUser");
const createPost = require("./createPost");
const changePost = require("./changePost");
const auth = require('./auth')
const deletePost = require('./deletePost')
const login = require('./login')
const myPost = require('./myPost')

module.exports = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser,
    createPost,
    changePost,
    auth,
    deletePost,
    login,
    myPost
  },
});
