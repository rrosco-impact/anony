const authorizedRoles = (...allowedRoles) => {
    return(req,res,next) => {
        if(!allowedRoles.includes(req.user.user_type)) {
            return res.status(403).json({message: "Access Denied"});
        }
        next();
    };
};


export default authorizedRoles;