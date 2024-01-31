import express from 'express'
import {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByName,
} from '../handler/user'

import { validateUserCreation, validateUserUpdate } from '../utils/validation'

const router = express.Router()

router.post('/', validateUserCreation, createUser)
router.get('/:id', getUserById)
router.patch('/:id', validateUserUpdate, updateUserById)
router.delete('/:id', deleteUserById)
router.get('/screenname/:name', getUserByName)

export default router
