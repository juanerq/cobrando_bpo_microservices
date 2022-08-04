import { ValidationError } from 'sequelize'
import { Controller, ErrorExpressValidator, ErrorHanlder } from '../types'
import { server } from '../app'

export const logErrors: ErrorHanlder = (err, _req, _res, next) => {
  console.error(err)
  return next(err)
}

export const errorHandler: ErrorHanlder = (err, _req, res, _next) => {
  const error = {
    name: err.name,
    msg: err.message
    // stack: err.stack
  }
  return res.status(400).json(error)
}

export const errorsListHandler: ErrorHanlder = (err, _req, res, next) => {
  if (err instanceof Array) {
    const errors: ErrorExpressValidator[] = err
    res.status(400).json(errors[0])
  } else {
    next(err)
  }
}

export const ormErrorHandler: ErrorHanlder = (err, _req, res, next) => {
  if (err instanceof ValidationError) {
    const error = {
      name: err.name,
      msg: err.errors[0].message,
      error: err.errors
    }
    res.status(409).json(error)
  }

  return next(err)
}

export const error404: Controller = (_req, res) => {
  const error = {
    name: 'NotFound',
    msg: 'Not Found',
    paths: Object.values(server.apiPaths).map(path => server.basePath + path)
  }
  res.status(404).json(error)
}
