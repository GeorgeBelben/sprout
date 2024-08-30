export type Brand<K> = K & { __brand: "brand" };

export type ErrorLike = { message: string };

export type PropsWithClassName<T> = { className?: string } & T;
