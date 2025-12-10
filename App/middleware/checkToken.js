let jwt = require('jsonwebtoken')

let checkToken = (req,res,next)=>{
 //   console.log(req.headers)
  //    console.log(req.headers.authorization)

        try{
        let token = req.headers.authorization.split(" ")[1]
     //   console.log(token)

        let decode = jwt.verify(token, process.env.TOKENKEY)

        // req.body me userId key manually create ki hai kiyo ki jab tak id nahi mileghi tho user ka password change nahi hoga id se hi pata chalega konse user ka password change karna hai 
        req.body.userId = decode.id;
        
     //   console.log(decode)
        next()
        }
        catch(error){
      //    console.log(error);
        }

        
}

module.exports = {checkToken}