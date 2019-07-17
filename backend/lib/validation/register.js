const Validator = require('validator');
const isEmpty = require('./is-empty');

function validateRegisterInput(data) {
    let errors = {};
    data.displayname = !isEmpty(data.displayname) ? data.displayname : '';
    data.login = !isEmpty(data.login) ? data.login : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

    if(!Validator.isLength(data.displayname, { min: 2, max: 30 })) {
        errors.displayname = 'Name must be between 2 to 30 chars';
    }

    if(Validator.isEmpty(data.displayname)) {
        errors.displayname = 'Name field is required';
    }

    if(!Validator.isEmail(data.login)) {
        errors.login = 'Email is invalid';
    }

    if(Validator.isEmpty(data.login)) {
        errors.login = 'Email is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if(!Validator.isLength(data.password_confirm, {min: 6, max: 30})) {
        errors.password_confirm = 'Password must have 6 chars';
    }

    if(!Validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = 'Password and Confirm Password must match';
    }

    if(Validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

module.exports = validateRegisterInput;
