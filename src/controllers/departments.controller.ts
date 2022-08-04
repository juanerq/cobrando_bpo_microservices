import { NextFunction, Request, Response } from 'express'
import DBServices from '../services/department.services'
import to from '../helpers/to'

import * as response from '../response/success.response'

import { DepartmentCreateType, DepartmentType } from '../types'
const dbServices = new DBServices()

export default class DepartmentsController {
  async searchDepartments (req: Request, res: Response, next: NextFunction): Promise<any> {
    const id = +req.params?.id
    const { from = 0, limit = 100 } = req.query
    const pagination = {
      limit: +limit,
      from: +from
    }

    const [error, result]: [Error, DepartmentType[]] = await to(
      (!isNaN(id))
        ? dbServices.findOne(id)
        : dbServices.find(pagination)
    )
    if (error != null) return next(error)

    response.success(res, result.length, result)
  }

  async createDepartment (req: Request, res: Response, next: NextFunction): Promise<any> {
    const data = req.body

    const newDepartment: DepartmentCreateType = {
      name: data.name,
      bubget: data.bubget
    }

    const [error, result]: [Error, DepartmentType] = await to(dbServices.create(newDepartment))
    if (error != null) return next(error)

    response.success(res, 'Created Department', result, 201)
  }

  async updateDepartment (req: Request, res: Response, next: NextFunction): Promise<any> {
    const id: number = +req.params.id
    const data = req.body

    const [error, result]: [Error, DepartmentType] = await to(dbServices.update(id, data))
    if (error != null) return next(error)

    response.success(res, 'Updated Department', result)
  }

  async deleteDepartment (req: Request, res: Response, next: NextFunction): Promise<any> {
    const id: number = +req.params.id

    const [error]: [Error, DepartmentType] = await to(dbServices.delete(id))
    if (error != null) return next(error)

    response.success(res, 'Deleted Department', { id })
  }
}
