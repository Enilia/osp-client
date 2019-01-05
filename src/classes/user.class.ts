import { DTO } from '../types/DTO'
import { Immutable } from './immutable.class';

export class User extends Immutable<User> {

  public static fromJSON( { socketid, id, nickname }: UserDTO ): User {
    return new User( socketid, id, nickname )
  }

  constructor(
    public readonly socketid: string = '',
    public readonly id: string = '',
    public readonly nickname: string = '',
  ) {
    super()
    if( new.target === User) Object.freeze( this )
  }

}

export type UserDTO = DTO<User>
