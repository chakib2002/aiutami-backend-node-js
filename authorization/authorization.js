const is_authorized = (req, res, next )=>{
    if(req.session.passport.user){
        next();
    }else{
        res.status(401)
            .json({
                error: 'Unauthorized' })
    }
}

module.exports={is_authorized}