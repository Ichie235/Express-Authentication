const moogoose = require('mongoose');



const UserModel = new moogoose.Schema({
    username: {
        type: String,
        required
    },
    password: {
        type: String,
        required
    }
})


module.exports = moogoose.model('user',UserModel)