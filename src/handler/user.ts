import { Request, Response } from 'express'
import Users from '../adapter/user'

export const createUser = async (req: Request, res: Response) => {
  const { id, email, registration_attribution, email_verified } = req.body
  try {
    const user = await Users.create({
      id,
      email,
      registration_attribution,
      email_verified: email_verified ?? false,
    })
    res.status(201).json(user)
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await Users.findByPk(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params
  const { metadata, nickname } = req.body
  try {
    const user = await Users.findByPk(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    if (nickname && user.nickname && nickname !== user.nickname) {
      return res.status(200).json({ error: 'Nickname already taken' })
    }
    await user.update({ metadata, nickname })
    res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await Users.findByPk(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    await user.destroy()
    return res.status(204).end()
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getUserByName = async (req: Request, res: Response) => {
  const { name: nickname } = req.params
  try {
    const user = await Users.findOne({ where: { nickname } })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
