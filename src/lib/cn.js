/**
 * Conditionally join class names, dropping any falsy values.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
