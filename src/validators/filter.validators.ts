import { check } from 'express-validator'
import validateFields from '../middlewares/validate-fields'

export const validateFilters: any = [
  check('id', 'Id is required').optional().isNumeric(),
  check('from', 'Invalid from').optional().isNumeric().isInt({ min: 0 }),
  check('limit', 'Invalid limit').optional().isNumeric().isInt({ min: 1 }),
  validateFields
]

export const validateId: any = [
  check('id', 'Id is invalid').isNumeric(),
  validateFields
]
