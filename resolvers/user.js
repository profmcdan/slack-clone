import bcrypt from "bcrypt";
import { formatErrors } from "../helpers/errorsManager";

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
        const user = await models.User.create(args);
        return {
          ok: true,
          user
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    }
  }
};
