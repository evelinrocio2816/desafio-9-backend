const UserModel = require("../models/user.models.js");

class UserRepository {
    async findByEmail(email) {
        return UserModel.findOne({ email });
    }
}

module.exports = UserRepository;
