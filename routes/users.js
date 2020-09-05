var express = require('express');
var router = express.Router();
var passport = require('passport')
const { validationResult } = require('express-validator');
const csurf = require('csurf')
const PollSchema=require('../models/question')
var { signupValidator, signinValidator, checkPassword,isloggedIn } = require('../middlewares/auth')

var csrfProtection = csurf({ cookie: true })
/*
router.use(csrfProtection)
*/
/*router.get('/getcsrf', function (req, res, next) {
  
  res.json({ csrf: req.csrfToken() });  

})*/;

router.post('/signup', 
  checkPassword,
  signupValidator
  ,
  function (req, res, next) {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.errors.map(data => 
        data.msg
      )      
        return res.json({error:err} );
    }    
    
        
      passport.authenticate('local.signup',function (err, user, info) {
        if (err) {
          return next(err);
        }
        
        if (info) {
          
          return res.json(info );
        }

        
        return res.json({user:user})
      })(req, res, next);
})

/*(req, res, next) => {
  console.log(req.body,123)
  next()
  
}*/
router.post('/login', signinValidator,  (req, res, next)=> {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const err = errors.errors.map(data => 
            data.msg
          )
            return res.json({error:err});
        }

        passport.authenticate('local.signin',  (err, user, info)=> {
          if (err) { return next(err); }          
          PollSchema
          .find()
          .then(data => { 
              if(req.user){
                  const polls = data;
                  const voted=req.user.hasVoted
                  const poll=(polls.filter(el=>!voted.includes(el._id)))
                 return res.json({poll,results:data,auth:req.isAuthenticated(),user:req.user})
              }
  
              res.json({poll:[],results:[],auth:req.isAuthenticated(),user:req.user})
              
          })
          .catch(err => {
              console.log(err);
          })

        })(req, res, next);
})



router.get('/logout', isloggedIn,(req, res, next) => {
  
  
  req.logout()

  res.json({success:'logged Out Successfully'})
})

router.get('/isloggedin', (req, res) => {  
  
 res.json({auth:req.isAuthenticated(),user:req.user})
})
router.get('/getuser', (req, res) => {
  if (req.user) {
    res.json(req.user)
  }
  else {
    res.json({})
  }
})
module.exports = router;
