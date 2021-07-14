import User from "../models/User"

export const getUserQuery = (userId) => {
  return User.findById(userId)
}