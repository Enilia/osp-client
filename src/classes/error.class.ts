import { DTO } from '../types/DTO'
import { Immutable } from './immutable.class';

export class OSPError extends Immutable<OSPError> {

  public static fromJSON( { message }: OSPErrorDTO ): OSPError {
    return new OSPError( message )
  }

  constructor(
    public readonly message = '',
  ) {
    super()
    if( new.target === OSPError) Object.freeze( this )
  }

}

export type OSPErrorDTO = DTO<OSPError>
