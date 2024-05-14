export const catchAsyncError=(Propsfun)=>{
    return (req,res,next)=>{
        Promise.resolve(Propsfun(req,res,next).catch(next));
    }
}