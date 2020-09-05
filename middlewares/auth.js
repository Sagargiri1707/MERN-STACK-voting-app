const { check } = require('express-validator');


module.exports.signinValidator = [
    
    check("email", "email id cannot be blank").notEmpty(),
    check("email","Write a valid email id").isEmail(),
    check("password", "Write a password").notEmpty(),
    check('password', "password must be atleast 4 character").isLength({
        min: 4,
        max:150
    })
]

module.exports.signupValidator = [
        
        check("email", "email id cannot be blank").notEmpty(),
        check("email","Write a valid email id").isEmail(),
        check("name","Write a valid name").notEmpty(),
        check('name', "name must be atleast 4 character").isLength({
            min: 4,
            max:70
        }),
        check("password", "Write a password").notEmpty(),
        check("password2", "repeat the password again").notEmpty(),
        check('password', "password must be atleast 4 character").isLength({
            min: 4,
            max:150
        }),
        check('password2', "repeat password must be atleast 4 character").isLength({
            min: 4,
            max:150
        }),

]

module.exports.checkPassword = (req, res, next) => {
   
    
    if (req.body.password === req.body.password2)
    {
        next()
    }
    else {
        return res.json({
         err: "Passwords dont match"
        }
        )
    }
}

module.exports.isloggedIn = (req, res, next) => {
    
    if (req.isAuthenticated()) {
        next()
    }
    else 
        return res.json(
            {err: "Not logged in"}
        )
}