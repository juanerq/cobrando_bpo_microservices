import express from 'express'
import EmployeesController from '../controllers/employees.controller'

import { validateCreateEmployee, validateUpdateEmployee } from '../validators/employee.validators'
import { validateFilters, validateId } from '../validators/filter.validators'
const router = express.Router()
const employeesController = new EmployeesController()

router.route('/')
  .post(validateCreateEmployee, employeesController.createEmployee)

router.route('/:id?')
  .get(validateFilters, employeesController.searchEmployees)

router.route('/:id')
  .put(validateUpdateEmployee, employeesController.updateEmployee)
  .delete(validateId, employeesController.deleteEmployee)

export default router
