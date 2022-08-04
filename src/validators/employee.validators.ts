import { check } from 'express-validator'
import { existsDepartment } from '../helpers/db-validators'
import validateFields, { validateUpdateParameters } from '../middlewares/validate-fields'

export const validateCreateEmployee: any = [
  check('nit', 'Wrong or missing nit').notEmpty().isNumeric().not().isString(),
  check('name', 'Wrong or missing name').notEmpty().isString().not().isNumeric(),
  check('surname1', 'Wrong or missing surmane1').notEmpty().isString().not().isNumeric(),
  check('surname2', 'Wrong or missing surmane2').notEmpty().isString().not().isNumeric(),
  check('departmentCode').custom(existsDepartment),
  validateFields
]

export const validateUpdateEmployee: any = [
  validateUpdateParameters,
  check('nit', 'Wrong or missing nit').optional().notEmpty().isNumeric().not().isString(),
  check('name', 'Wrong or missing name').optional().notEmpty().isString().not().isNumeric(),
  check('surname1', 'Wrong or missing surmane1').optional().notEmpty().isString().not().isNumeric(),
  check('surname2', 'Wrong or missing surmane2').optional().notEmpty().isString().not().isNumeric(),
  check('departmentCode').optional().custom(existsDepartment),
  validateFields
]
