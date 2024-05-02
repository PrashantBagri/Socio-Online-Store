import {body } from "express-validator";
import {PRODUCT_BRAND_MINIMUM_LENGTH, PRODUCT_DESCRIPTION_MINIMUM_LENGTH, PRODUCT_NAME_MINIMUM_LENGTH} from "../Constants.js"

const nameValidator = () =>{
    return body("name")
    .notEmpty()
    .withMessage("Product name cannot be empty")
    .trim()
    .isLength({min : PRODUCT_NAME_MINIMUM_LENGTH})
    .withMessage(`Product name must be atleast ${PRODUCT_NAME_MINIMUM_LENGTH} characters long`)
    .isString()
}

const descriptionValidator = () =>{
    return body("description")
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty.")
    .isLength({min: PRODUCT_DESCRIPTION_MINIMUM_LENGTH})
    .withMessage("Production description is too short.")
}

const stockValidator = () =>{
    return body("stock")
    .not()
    .equals("0")
    .withMessage("Stock cannot be zero")
    .notEmpty()
    .withMessage("Stock cannot be zero.")
}

const brandValidator = () =>{
    return body("brand")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Brand name cannot be empty")
    .isLength({min : PRODUCT_BRAND_MINIMUM_LENGTH});
}

const priceValidator = () =>{
    return body("price")
    .trim()
    .not()
    .equals("0")
    .withMessage("Price cannot be zero")
    .isFloat()
    .withMessage("Please enter a valid price value")
}

const categoryValidator = () =>{
    return body("category")
    .trim()
    .not()
    .equals("")
    .withMessage("Empty not allowed")
    .isString()
    .withMessage("Category should be a string.")
    .notEmpty()
}

export {nameValidator, descriptionValidator, stockValidator, brandValidator, priceValidator, categoryValidator}