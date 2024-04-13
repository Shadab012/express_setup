import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'
import userModel from './userModel'
import { User } from './userTypes'
import { sign } from 'jsonwebtoken'
import { config } from '../../config/config'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    const error = createHttpError(400, 'All fields are required')
    return next(error)
  }

  try {
    const user = await userModel.findOne({ email })
    if (user) {
      const error = createHttpError(400, 'User already exists with this email.')
      return next(error)
    }
  } catch (err) {
    return next(createHttpError(500, 'Error while getting user'))
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  let newUser: User
  try {
    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    })
  } catch (err) {
    return next(createHttpError(500, 'Error while creating user.'))
  }

  try {
    const token = sign({ sub: newUser._id }, config.jwt_secret as string, {
      expiresIn: '7d',
      algorithm: 'HS256',
    })
    res.status(201).json({ accessToken: token })
  } catch (err) {
    return next(createHttpError(500, 'Error while signing the jwt token'))
  }
}

export { createUser }
