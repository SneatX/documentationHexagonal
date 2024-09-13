const semver = require("semver")

module.exports = versionMiddleware = (version) =>{
    return function(req, res, next){
        if(req.headers["x-version"]){
            if(semver.eq){
                return next()
            }
            return next("route")
        }else{
            return next("route")
        }
    }
}