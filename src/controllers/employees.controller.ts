import { NextFunction, Request, Response } from 'express'
import DBServices from '../services/employee.services'
import to from '../helpers/to'

import * as response from '../response/success.response'

import { EmployeeCreateType, EmployeeType } from '../types'
const dbServices = new DBServices()

export default class EmployeesController {
  async searchEmployees (req: Request, res: Response, next: NextFunction): Promise<any> {
    const id = +req.params?.id
    const { from = 0, limit = 100 } = req.query
    const pagination = {
      limit: +limit,
      from: +from
    }

    const [error, result]: [Error, EmployeeType[]] = await to(
      (!isNaN(id))
        ? dbServices.findOne(id)
        : dbServices.find(pagination)
    )
    if (error != null) return next(error)

    response.success(res, result.length, result)
  }

  async createEmployee (req: Request, res: Response, next: NextFunction): Promise<any> {
    const data = req.body

    const newEmployee: EmployeeCreateType = {
      nit: data.nit,
      name: data.name,
      surname1: data.surname1,
      surname2: data.surname2,
      departmentCode: data.departmentCode
    }
    console.log(newEmployee)

    const [error, result]: [Error, EmployeeType] = await to(dbServices.create(newEmployee))
    if (error != null) return next(error)

    response.success(res, 'Created Employee', result, 201)
  }

  async updateEmployee (req: Request, res: Response, next: NextFunction): Promise<any> {
    const id: number = +req.params.id
    const data = req.body

    const [error, result]: [Error, EmployeeType] = await to(dbServices.update(id, data))
    if (error != null) return next(error)

    response.success(res, 'Updated Employee', result)
  }

  async deleteEmployee (req: Request, res: Response, next: NextFunction): Promise<any> {
    const id: number = +req.params.id

    const [error]: [Error, EmployeeType] = await to(dbServices.delete(id))
    if (error != null) return next(error)

    response.success(res, 'Deleted Employee', { id })
  }
}
