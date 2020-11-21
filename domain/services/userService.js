var User = require("../models/user");

const userService = {
  signUp: async (name, email, password) => {
    const result = await User.findOne({ email : email });
    if (!result) {
      const newUser = User({
        name, email, password
      });
      await newUser.save();
      return newUser;
    } else {
      throw new Error("USER_EXISTED");
    }
  },
  signIn : async (email, password) => {
    let result = await User.find({email, password});
    if (result) {
      return result;
    } else {
      throw new Error("error/User_not_found");
    }
  },
  editUser: async (name, email) => {
    let result = await User.findOne({email});
    if (result) {
      result.name = name;
      result.save();
    } else {
      throw new Error("error/User_not_found");
    }
  }
};

module.exports = userService;
