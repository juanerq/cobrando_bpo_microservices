import { Model, DataTypes, Sequelize } from 'sequelize'
import { EmployeeType } from '../types'

import { DEPARTMENT_TABLE_NAME } from './department.model'

export const EMPLOYEE_TABLE_NAME = 'employees'

export const EmployeeSchema = {
  code: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nit: {
    type: DataTypes.STRING(9),
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  surname1: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  surname2: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  departmentCode: {
    type: DataTypes.INTEGER,
    field: 'code_department',
    references: {
      model: DEPARTMENT_TABLE_NAME,
      key: 'code'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

export class Employee extends Model<EmployeeType> {
  static associate (models: any): void {
    this.belongsTo(models.Department, { as: 'department' })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: EMPLOYEE_TABLE_NAME,
      modelName: 'Employee',
      timestamps: false
    }
  }
}
