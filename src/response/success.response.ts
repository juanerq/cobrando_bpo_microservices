import { ResponseSuccess } from '../types'

export const success: ResponseSuccess = (res, msg, result, status = 200) => {
  return res.status(status).json({
    msg,
    result
  })
}
