import { DataTypes, Model } from 'sequelize'
import { sequelize } from './db'

interface User {
  id: string
  email: string
  registration_attibution?: string
  email_verified: boolean
  metadata?: Metadata
  nickname?: string
}

interface Metadata {
  first: string
  last: string
  user_newsletter: string
  user_weathernewsletter: string
  custom_picture: string
  termsAndCondition: {
    gamecenter: Date
    openweb: Date
    sinclair: Date
  }
}

class Users extends Model<User> implements User {
  public id!: string
  public email!: string
  public registration_attibution: string | undefined
  public email_verified!: boolean
  public metadata: Metadata | undefined
  public nickname: string | undefined

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Users.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registration_attibution: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    timestamps: true,
  }
)

Users.sync({ force: false })
  .then(() => {
    console.log('User table synchronized successfully.')
  })
  .catch((err) => {
    console.error('Error synchronizing User table:', err)
  })
export default Users
