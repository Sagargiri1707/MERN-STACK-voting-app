const mongoose = require('mongoose')
var bcrypt=require('bcrypt-nodejs')

const userSchema =  mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    hasVoted: {
        type: [mongoose.Schema.ObjectId],
        ref:"Question"
    }

})

userSchema.methods.validPassword = function (password) {
    if (this.password != null) {
        return bcrypt.compareSync(password,this.password)
    }
    else {
        return false
    }
}


userSchema.methods.encrpytPassword = (password) => {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null)
}

module.exports=mongoose.model("User",userSchema)