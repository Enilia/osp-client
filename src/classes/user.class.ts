import { Immutable } from './immutable.class'

export interface UserDTO {
  readonly socketid: string
  readonly id: string
  readonly nickname: string
}

export class User extends Immutable<User> implements UserDTO {

  public static fromJSON( { socketid, id, nickname }: UserDTO ): User {
    return new User( socketid, id, nickname )
  }

  constructor(
    public readonly socketid: string = '',
    public readonly id: string = '',
    public readonly nickname: string = '',
  ) {
    super()
    if( new.target === User) this.freeze()
  }

  public rename( nickname: string ): User {
    return this.set( { nickname } )
  }

  public is( client: UserDTO ): boolean {
    return client.socketid === this.socketid
  }

  protected copy( { socketid, id, nickname }: User ): User {
    return new User( socketid, id, nickname )
  }

}
