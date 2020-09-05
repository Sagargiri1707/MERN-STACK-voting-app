const router = require('express').Router()
const PollSchema = require('../models/question')
const userSchema=require('../models/user')
router.get('/getpolls', (req, res, next) => {
    PollSchema
        .find()
        .then(data => { 
            if(req.user){
                const polls = data;
                const voted=req.user.hasVoted
                const poll=(polls.filter(el=>!voted.includes(el._id)))
               return res.json({poll,results:data})
            }

            res.json({poll:[],results:[]})
            
        })
        .catch(err => {
            console.log(err);
        })
})
router.post('/addpoll', (req, res) => {
    var { post, contenders } = req.body
    contenders = contenders.map(data => {
        return {option:data}
    })    
    
    PollSchema
        .find({ post })
        .then(e => {
            
            if (e.length>0)
               return res.json({ err: 'Question already exists' })
            else {
                
            const pollSchema = new PollSchema({
                post,
                contenders
            })
            pollSchema
                .save()
                .then(data => {
                    return  res.json(data)            
                })
                .catch(err => {
                    console.log(err);
                    
                }
                
            )
            }
        })
        .catch(err => {
            console.log(err);
        })
    
    
})
router.post('/submitpoll', (req, res) => {
    
    req.body.map(data => {
        PollSchema
            .findByIdAndUpdate(data.quesId)
            .then(question => {
                question
                    .contenders
                    .map(options => {                        
                        
                        if ( options._id == data.ansId)
                        {
                            
                            options.votes++
                            question.save()                            
                            return
                        }
                    })
            })
         
            .catch(err => {
            console.log(err);
            
            })
        
        userSchema
            .updateOne({ _id: data.userId }, {
                $addToSet:{hasVoted:data.quesId}
            })
            .catch(err => {
            console.log(err);
        })

    })

})
router.post('/deletepoll',  (req, res) => {
        const { data } = req.body
        data.map((ques) => {
             PollSchema
                 .findByIdAndDelete(data)
                 .then(() => {
                    PollSchema
                        .find({})
                        .then(data => {  
                                res.json(data)
                        })  
                        .catch(err => {
                            throw err
                        })
                 })
                .catch(err => {
                throw err
            })
        })
    
         

    
})


module.exports=router