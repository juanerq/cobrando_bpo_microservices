import { Response, Request, NextFunction } from 'express'

// Employee types

export interface EmployeeType {
  code: number
  nit: number
  name: string
  surname1: string
  surname2: string
  departmentCode: number
}

export interface EmployeeUpdateType {
  nit?: number
  name?: string
  surname1?: string
  surname2?: string
  departmentCode?: number
}

export type EmployeeCreateType = Omit<EmployeeType, 'code'>

// Department types

export interface DepartmentType {
  code: number
  name: string
  bubget: number
}

export interface DepartmentUpdateType {
  name?: string
  bubget?: number
}

export type DepartmentCreateType = Omit<DepartmentType, 'code'>

// Filter types

export interface PaginationType {
  limit?: number
  from?: number
}

// Functions types

export type Controller = (req: Request, res: Response) => void

export type ControllerNext = (req: Request, res: Response, next: NextFunction) => any

export type ResponseSuccess = (res: Response, msg: any, result: any, status?: number) => void

export type ErrorHanlder = (err: Error, req: Request, res: Response, next: NextFunction) => any

export type ErrorHanlderBoom = (err: Boom, req: Request, res: Response, next: NextFunction) => void

export interface ErrorExpressValidator {
  msg: string
  param: string
  location: string
}
