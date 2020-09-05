const mongoose = require('mongoose')
const optionSchema =  mongoose.Schema({
    option: String,
    votes: {
        type: Number,
        default: 0
    },
    votedBy: {
        type: [mongoose.Schema.ObjectId],
        ref:"User"
    }
})

const QuestionSchema =  mongoose.Schema({
    post: {
        type: String,
        required:true
    },
    contenders: {
        type:[optionSchema]
    }
})

module.exports = mongoose.model("Question", QuestionSchema)
