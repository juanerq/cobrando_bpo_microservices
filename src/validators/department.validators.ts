import { check } from 'express-validator'
import validateFields, { validateUpdateParameters } from '../middlewares/validate-fields'

export const validateCreateDepartment: any = [
  check('name', 'Wrong or missing name').notEmpty().isString().not().isNumeric(),
  check('bubget', 'Wrong or missing bubget').notEmpty().isNumeric().not().isString(),
  validateFields
]

export const validateUpdateDepartment: any = [
  validateUpdateParameters,
  check('name', 'Wrong or missing name').optional().notEmpty().isString().not().isNumeric(),
  check('bubget', 'Wrong or missing bubget').optional().notEmpty().isNumeric().not().isString(),
  validateFields
]
