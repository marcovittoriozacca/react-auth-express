const handleErrorsMsgs = (field, array) => {
    if(typeof array === "object"){
        const errFound = array.filter((e,i) => e.path === field);
        
        if(errFound.length > 0){
            const { msg } = errFound[0];
            return (<span className="text-red-500 italic">{msg}</span>);
        }
    }else{
        return null
    }
}

const handleSingleError = (error) => {
    if(!error){
        return null
    }
    if(typeof error !== "string"){
        return null
    }
    return (<span className="text-red-500 italic">{error}</span>);
    
}

const MultiError = ({field, array}) => {
    return(handleErrorsMsgs(field, array))
}

const SingleError = ({error}) => {
    return(handleSingleError(error))
}

export {
    MultiError,
    SingleError
}