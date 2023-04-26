const UserType = require('../types/UserType')
const {GraphQLString} = require("graphql/type");
const jwt = require('jsonwebtoken')
const User = require('../../mongo/User')

module.exports = {
  type: UserType,
  args: {
    token: {type: GraphQLString}
  },
  async resolve(parent,args){
    const email = jwt.decode(args.token, "superseckerkey")
    const info = await User.findOne({email: email.email})
    if(info === null) {
      throw new Error('Error')
    }
    return {
      id: info.id,
      name: info.name,
      avatar_link: info.avatar_link,
      description: info.description,
      email: info.email,
      password:info.password,
    }
  }
}