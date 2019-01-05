import { User } from './user.interface'

export interface Room {
  id: string,
  clients: User[],
}
