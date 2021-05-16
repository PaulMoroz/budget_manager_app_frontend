export function checkField(pattern, checkFieldName, errorBlock){
    document.getElementById(errorBlock).style.display = (pattern.test(document.getElementById(checkFieldName).value)===true)?'none':'block';
}

export function checkConfirmationPassword(passwordFieldName, confirmationFieldName, errorBlock){
    document.getElementById(errorBlock).style.display = (document.getElementById(passwordFieldName).value===document.getElementById(confirmationFieldName).value)?'none':'block';
}

export function checkValue(checkFieldName, compareValue, errorBlock){
    document.getElementById(errorBlock).style.display = (document.getElementById(checkFieldName).value===compareValue)?'none':'block';
}
