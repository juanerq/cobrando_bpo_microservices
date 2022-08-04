import express from 'express'
import DepartmentsController from '../controllers/departments.controller'

import { validateCreateDepartment, validateUpdateDepartment } from '../validators/department.validators'
import { validateFilters, validateId } from '../validators/filter.validators'
const router = express.Router()
const departmentsController = new DepartmentsController()

router.route('/')
  .post(validateCreateDepartment, departmentsController.createDepartment)

router.route('/:id?')
  .get(validateFilters, departmentsController.searchDepartments)

router.route('/:id')
  .put(validateUpdateDepartment, departmentsController.updateDepartment)
  .delete(validateId, departmentsController.deleteDepartment)

export default router
