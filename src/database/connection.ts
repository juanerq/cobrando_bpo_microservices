import { Sequelize } from 'sequelize'
import config from '../config/config'
import setupModels from '../models/index'

const URI: any = config.dbUri

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false
})

void (async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error(error)
  }
})()

void setupModels(sequelize)

void sequelize.sync()

export default sequelize
