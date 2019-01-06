import { DTO } from '../types/DTO'

export abstract class Immutable<K, T = DTO<K>> {

  public static fromJSON( ...args: any[] ): any {
    throw new Error('not implemented')
  }

  protected abstract copy( dto: K ): K

  protected freeze(): void {
    Object.freeze( this )
  }

  protected set( diff: Partial<T> ): K {
    const ownPropertyNames = Object.getOwnPropertyNames(diff) as Array<keyof T & string>
    if( ownPropertyNames.length === 0 ) return this as any
    const props: PropertyDescriptorMap = { }
    for( const prop of ownPropertyNames ) {
      props[prop] = { value: diff[prop] }
    }
    return this.copy(
      Object.create( this, props ),
    )
  }

}
