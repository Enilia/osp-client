
type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K }[keyof T]
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

export type DTO<T> = Readonly<NonFunctionProperties<T>>
