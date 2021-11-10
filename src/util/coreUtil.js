const logger= require("../startup/logsUp")(module);

function buildValidationResult(validationResult){
    logger.info(`Building error message for validationResult::`, validationResult);
    let errMsg = "";
    if(validationResult.error.details){
        validationResult.error.details.forEach((value, index, array) => {
            errMsg = errMsg + value.message + ". ";
        });
    } else{
        errMsg= validationResult.error.message;
    }
    return errMsg;    
}

function validate(ipObj, schemaJ) {
    logger.info(`Validating ipObj::`, ipObj);
    const validationResult= schemaJ.validate(ipObj);
    if(validationResult && validationResult.error){
        return buildValidationResult(validationResult);
    }else{
        return null;
    }       
}

function covertUnixToJsDate(timestamp) {
    try{
        timestamp= parseInt(timestamp);
        let jsDate= new Date(timestamp);
        return {isSuccess: true, date: jsDate};
    }catch (e){
        return {isSuccess: false};
    }
}

module.exports={
    validate,
    buildValidationResult,
    covertUnixToJsDate
};