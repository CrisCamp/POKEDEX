// middlewares/authorization.ts
import { Request, Response, NextFunction } from 'express'
import boom from '@hapi/boom'
import { UserRequestType } from '../types/user.type'

export const authorize = (roles: string[]) => {
  return (req: UserRequestType, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        boom.forbidden('You do not have permission to perform this action')
      )
    }
    next()
  }
}
