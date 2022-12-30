const moogoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')



const UserModel = new moogoose.Schema({
    username: {
        type: String,
        required:true
    },
    password: {
        type: String
    }
})

UserModel.plugin(passportLocalMongoose)
module.exports = moogoose.model('user',UserModel)