export type Brand<T, K> = T & { __brand: K };

export type ErrorLike = { message: string };

export type PropsWithClassName<T> = { className?: string } & T;
