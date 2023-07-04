const Handelerror =(func)=>{
    return(async (req,res,next)=>{
        try {
            await func(req,res);
        } catch (error) {
            return next(error)
        }
    })
}

const Handelerrormidelware =(func)=>{
    return(async (req,res,next)=>{
        try {
            await func(req,res,next);
        } catch (error) {
            return next(error)
        }
    })
}

module.exports = {
    Handelerror,
    Handelerrormidelware
}