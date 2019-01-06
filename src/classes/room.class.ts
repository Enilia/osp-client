import { Immutable } from './immutable.class'
import { User, UserDTO } from './user.class'

export interface RoomDTO {
  readonly id: string
  readonly clients: UserDTO[]
  readonly owner: UserDTO
}

export class Room extends Immutable<Room> implements RoomDTO {

  public static fromJSON( { id, clients, owner }: RoomDTO ): Room {
    return new Room( id, clients.map(User.fromJSON), User.fromJSON(owner) )
  }

  constructor(
    public readonly id: string = '',
    public readonly clients: Readonly<User[]> = [],
    public readonly owner: User = new User(),
  ) {
    super()
    if( new.target === Room) this.freeze()
  }

  public add( client: UserDTO ): Room {
    return this.set( { clients: [ ...this.clients, User.fromJSON(client) ] })
  }

  public remove( client: UserDTO ): Room {
    return this.set( { clients: this.clients.filter( c => c.socketid !== client.socketid ) })
  }

  public renameUser( client: UserDTO ): Room {
    return this.set( {
      clients: this.clients.map(
        c =>
          c.is( client ) ? c.rename( client.nickname ) : c ),
    } )
  }

  public setOwner( owner: UserDTO ): Room {
    return this.set( { owner: User.fromJSON( owner ) } )
  }

  protected copy( { id, clients, owner }: Room ): Room {
    return new Room( id, clients, owner )
  }

  protected freeze(): void {
    super.freeze()
    Object.freeze( this.clients )
  }

}
