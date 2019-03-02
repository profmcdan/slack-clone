import bcrypt from "bcrypt";

export default {
  Query: {
    getUser: (parent, { id }, { models }) =>
      models.User.findOne({ where: { id } }),
    getUsers: (parent, args, { models }) => models.User.findAll()
  },
  Mutation: {
    register: async (parent, args, { models }) => {
      try {
        const hashedPassword = await bcrypt.hash(args.password, 12);
        args.password = hashedPassword;
        await models.User.create(args);
        return true;
      } catch (err) {
        return false;
      }
    }
  }
};
