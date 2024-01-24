
export const isLogin=(req,res,next)=>{
    const token=req.headers['authorization']
    if(token){
        return next()
    }
    res.status(401).json({
        success:false,
        message:'user not login'
    })
}
