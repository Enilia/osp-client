import { User } from './user.class'
import { DTO } from '../types/DTO'
import { Immutable } from './immutable.class'

export class Room extends Immutable<Room> {

  public static fromJSON( { id, clients, owner }: RoomDTO ): Room {
    return new Room( id, clients, owner )
  }

  constructor(
    public readonly id: string = '',
    public readonly clients: User[] = [],
    public readonly owner: User = new User(),
  ) {
    super()
    if( new.target === Room) Object.freeze( this )
  }

  public add( client: User ): this {
    return this.clone( { clients: [ ...this.clients, client ] })
  }

  public remove( client: User ): Room {
    return this.clone( { clients: this.clients.filter( c => c.socketid !== client.socketid ) })
  }

}

export type RoomDTO = DTO<Room>
