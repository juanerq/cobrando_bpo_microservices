import { validationResult } from 'express-validator'
import { ControllerNext } from '../types'

const validateFields: ControllerNext = (req, _res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(errors.array())
  }
  next()
}

export const validateUpdateParameters: ControllerNext = (req, _res, next) => {
  const parameters: any = req.body
  if (Object.keys(parameters).length === 0) {
    throw new Error('Missing information to update')
  }
  next()
}
export default validateFields
