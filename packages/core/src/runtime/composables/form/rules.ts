export type RuleFunction<T> = (value: T) => boolean | string
export type RuleExpression<T> = RuleFunction<T>

// const rules: Record<string, Valida = {};