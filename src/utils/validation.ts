import { body, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import Users from '../adapter/user'

interface CustomRequest extends Request {
  idExist?: boolean
  emailExist?: boolean
  nickNameExist?: boolean
}

export const validateUserCreation = [
  body('id').notEmpty().withMessage('ID required'),
  body('email').notEmpty().isEmail().withMessage('Invalid email address'),
  checkIdExists,
  checkEmailExists,
  (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    if (req?.idExist) {
      return res.status(400).json({ error: 'ID already exists' })
    }
    if (req?.emailExist) {
      return res.status(400).json({ error: 'Email already exists' })
    }
    next()
  },
]

export async function checkIdExists(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req?.body?.id ?? req?.params?.id
    const existingUser = await Users.findByPk(userId)
    req.idExist = existingUser ? true : false
    next()
  } catch (error) {
    console.error('Error checking ID existence:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export async function checkEmailExists(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userEmail = req.body.email
    const existingUser = await Users.findOne({ where: { email: userEmail } })
    req.emailExist = existingUser ? true : false
    next()
  } catch (error) {
    console.error('Error checking email existence:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const validateUserUpdate = [
  checkNicNameExists,
  body('nickname').custom((value, { req }) => {
    if (
      !value &&
      (!req.body.metadata || !req.body.metadata.sweepstake) &&
      req?.nickNameExist
    ) {
      throw new Error('Nickname is mandatory for non-sweepstake users')
    }
    return true
  }),
  (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    if (req?.nickNameExist) {
      return res.status(404).json({ error: 'Nickname already taken!' })
    }
    next()
  },
]

export async function checkNicNameExists(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const nickname = req.body?.nickname
    if (nickname) {
      const user = await Users.findOne({ where: { nickname } })
      req.nickNameExist = !user
        ? false
        : user.id === req.params.id
        ? false
        : true
    } else {
      const user = await Users.findByPk(req.params.id)
      req.nickNameExist = user && user.nickname ? false : true
    }
    next()
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
