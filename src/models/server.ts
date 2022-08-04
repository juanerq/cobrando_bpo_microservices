import express, { Application } from 'express'
import cors from 'cors'

import { errorHandler, ormErrorHandler, error404, logErrors, errorsListHandler } from '../middlewares/errors.handler'

import employeeRoutes from '../routes/employees.routes'
import departmentRoutes from '../routes/departments.routes'
import config from '../config/config'

export default class Server {
  private readonly app: Application
  private readonly port: string
  basePath = '/api'
  apiPaths = {
    employees: '/employees',
    departments: '/departments'
  }

  constructor () {
    this.port = config.port ?? '3000'
    this.app = express()

    this.middlewares()
    this.routes()
  }

  middlewares (): void {
    this.app.use(express.json(), cors())
  }

  routes (): void {
    this.app.use(`${this.basePath}${this.apiPaths.employees}`, employeeRoutes)
    this.app.use(`${this.basePath}${this.apiPaths.departments}`, departmentRoutes)

    this.app.use(logErrors)
    this.app.use(error404)
    this.app.use(errorsListHandler)
    this.app.use(ormErrorHandler)
    this.app.use(errorHandler)
  }

  listen (): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}
