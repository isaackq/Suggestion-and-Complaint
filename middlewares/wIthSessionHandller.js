// This middleware is used to add a with method to the response object
exports.withSessionHandler= (req , res , next )=>{
    res.with= (key,value)=> {
    if (!("flashed" in req.session)) {
        req.session.flashed = {}
    }
    const flashed =req.session.flashed;
    req.session.flashed = {...flashed ,[key] : value}
    return res ;
}
    next();
}