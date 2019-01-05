import { DTO } from '../types/DTO'

export abstract class Immutable<K, T = DTO<K>> {
  protected clone( diff: Partial<T> ): this {
    const ownPropertyNames = Object.getOwnPropertyNames(diff) as Array<keyof T & string>
    if( ownPropertyNames.length === 0 ) return this
    const props: PropertyDescriptorMap = { }
    for( const prop of ownPropertyNames ) {
      props[prop] = { value: diff[prop] }
    }
    return Object.freeze(
      Object.create( this, props ),
    )
  }
}
