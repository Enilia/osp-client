import { Immutable } from './immutable.class'

export interface OSPErrorDTO {
  readonly message: string
}

export class OSPError extends Immutable<OSPError> implements OSPErrorDTO {

  public static fromJSON( { message }: OSPErrorDTO ): OSPError {
    return new OSPError( message )
  }

  constructor(
    public readonly message: string = '',
  ) {
    super()
    if( new.target === OSPError) this.freeze()
  }

  public setError( message: string ): OSPError {
    return this.set( { message } )
  }

  protected copy( { message }: OSPError ): OSPError {
    return new OSPError( message )
  }

}
