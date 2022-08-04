import { Model } from 'sequelize/types'
import sequelize from '../database/connection'
import to from '../helpers/to'
import { DepartmentCreateType, DepartmentUpdateType, PaginationType } from '../types'
const { Department } = sequelize.models

export default class DepartentServices {
  async find ({ from, limit }: PaginationType): Promise<Model[]> {
    const query = {
      offset: from,
      limit: limit
    }

    return await Department.findAll(query)
  }

  async findOne (id: number): Promise<any> {
    const department = await Department.findByPk(id, { include: ['employee'] })
    if (department == null) throw new Error('Department not found')

    return department
  }

  async create (data: DepartmentCreateType): Promise<Model> {
    return await Department.create(data)
  }

  async update (id: number, data: DepartmentUpdateType): Promise<Model> {
    const [error, department]: any = await to(this.findOne(id))
    if (department == null || error != null) throw new Error('Department not found')

    return department.update(data)
  }

  async delete (id: number): Promise<Model> {
    const [error, department]: any = await to(this.findOne(id))
    if (department == null || error != null) throw new Error('Department not found')

    return department.destroy()
  }
}
