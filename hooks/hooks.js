export const handleSaveError=(error,data,next)=>{
    error.status=400;
    next();
}

export const handleUpdate=function(next){
    this.options.runValidators=true;
    next();
}