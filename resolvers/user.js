import bcrypt from "bcrypt";
import { formatErrors } from "../helpers/errorsManager";
import { tryLogin } from "../helpers/auth";

export default {
  Query: {
    getUser: (parent, { id }, { models }) =>
      models.User.findOne({ where: { id } }),
    getUsers: (parent, args, { models }) => models.User.findAll()
  },
  Mutation: {
    login: async (parent, { email, password }, { models, SECRET, SECRET2 }) => {
      return tryLogin(email, password, models, SECRET, SECRET2);
    },
    register: async (parent, args, { models }) => {
      try {
        if (args.password.length < 5 || args.password.length > 100) {
          return {
            ok: false,
            errors: [
              {
                path: "password",
                message: "Password must between 5 and 100 characters"
              }
            ]
          };
        }
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
