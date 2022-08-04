import { Sequelize } from 'sequelize'
import { Employee, EmployeeSchema } from './employee.model'
import { Department, DepartmentSchema } from './department.model'

const setupModels = async (sequelize: Sequelize): Promise<any> => {
  Department.init(DepartmentSchema, Department.config(sequelize))
  Employee.init(EmployeeSchema, Employee.config(sequelize))

  Department.associate(sequelize.models)
}

export default setupModels
