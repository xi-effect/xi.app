export type CamelToSnakeCase<S extends string> = S extends `${infer Head}${infer Tail}`
  ? Tail extends Uncapitalize<Tail>
    ? `${Lowercase<Head>}${CamelToSnakeCase<Tail>}`
    : `${Lowercase<Head>}_${CamelToSnakeCase<Uncapitalize<Tail>>}`
  : S;
