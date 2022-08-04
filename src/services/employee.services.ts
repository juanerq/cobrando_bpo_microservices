import { Model } from 'sequelize/types'
import sequelize from '../database/connection'
import to from '../helpers/to'
import { Department } from '../models/department.model'
import { EmployeeCreateType, EmployeeUpdateType, PaginationType } from '../types'
const { Employee } = sequelize.models

export default class UserServices {
  async find ({ from, limit }: PaginationType): Promise<Model[]> {
    const query = {
      offset: from,
      limit: limit
    }

    return await Employee.findAll(query)
  }

  async findOne (id: number): Promise<any> {
    const employee: any = await Employee.findByPk(id)
    if (employee == null) throw new Error('Employee not found')

    const department = await Department.findByPk(employee.code_department)
    if (department != null) employee.departmentCode = department

    return employee
  }

  async create (data: EmployeeCreateType): Promise<any> {
    return await Employee.create(data)
  }

  async update (id: number, data: EmployeeUpdateType): Promise<Model> {
    const [error, employee]: any = await to(this.findOne(id))
    if (employee == null || error != null) throw new Error('Employee not found')

    return employee.update(data)
  }

  async delete (id: number): Promise<Model> {
    const [error, employee]: any = await to(this.findOne(id))
    if (employee == null || error != null) throw new Error('Employee not found')

    return employee.destroy()
  }
}
