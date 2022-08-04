import { Model, DataTypes, Sequelize } from 'sequelize'
import { DepartmentType } from '../types'

export const DEPARTMENT_TABLE_NAME = 'departments'

export const DepartmentSchema = {
  code: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  bubget: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}

export class Department extends Model<DepartmentType> {
  static associate (models: any): void {
    this.hasMany(models.Employee, {
      as: 'employee',
      foreignKey: 'code_department'
    })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: DEPARTMENT_TABLE_NAME,
      modelName: 'Department',
      timestamps: false
    }
  }
}
