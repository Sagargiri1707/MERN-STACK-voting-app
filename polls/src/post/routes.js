
const axios = require('axios')

module.exports.GetCsrf=() => {
    return(
        axios
        .get('/user/getcsrf')
            .then(res => {                
                return res
        })
      )
}

module.exports.Isloggedin = () => {
    return (
        axios
            .get('/user/isloggedin')
            .then(res => {
                
                return (res)
            }))
    }

    module.exports.Signin = (data) => {
        
        return (axios
            .post("/user/login", data)
            .then(res => {
                    
                return (res)
            }))

    }
    module.exports.Signup = (data) => {

        
     return (  axios
            .post('/user/signup', data)
            .then(res => {
                return (res)            
            })
          )
        
    }
    module.exports.deletepoll = (data) => {
        return (axios
            .post('/poll/deletepoll', data)
            .then(res => {

                return (res)
            
            }
        ))
    }
    module.exports.getpolls = () => {
     return (  axios
            .get('/poll/getpolls')
            .then(res => {
                return (res)            
        }))
}
    module.exports.submitpoll = (data) => {
        
     return(   axios
            .post('/poll/submitpoll', data)
            .then(res => {

                return (res)                
            })
     )   
    }
    module.exports.addpoll = (data) => {
        
       return (axios
            .post('/poll/addpoll', 
                data
            )
            .then(res => {

                return (res)
                
            })
)
}
module.exports.getUser = () => {
        
    return (axios
         .get('/user/getuser')
         .then(res => {
             return (res)
         })
)
}
module.exports.logout = () => {
        
    return (axios
         .get('/user/logout')
         .then(res => {
             return (res)
         })
)
}