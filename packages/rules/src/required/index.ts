export default function <T>(value: T) {
  if (value === null || value === undefined) return false
  if (Array.isArray(value) && !value.length) return false

  return !!String(value).trim().length
}