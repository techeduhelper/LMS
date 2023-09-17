import Validator from 'validator';
import isEmpty from './is-empty.js';

const validateStudentLoginInput = (data) => {
    let errors = {}
    data.registrationNumber = !isEmpty(data.registrationNumber) ? data.registrationNumber : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isLength(data.registrationNumber, { min: 15, max: 15 })) {
        errors.registrationNumber = 'Registration Number must be 12 characters long';
    }

    if (Validator.isEmpty(data.registrationNumber)) {
        errors.registrationNumber = 'Registration Number field is required';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

export default validateStudentLoginInput;
