import sequelize from '../database/connection'
const { Department } = sequelize.models

export const existsDepartment = async (id: number): Promise<boolean> => {
  const existsDepartment = await Department.findByPk(id)
  if (existsDepartment == null) {
    throw new Error('This department is not exists')
  }
  return true
}
