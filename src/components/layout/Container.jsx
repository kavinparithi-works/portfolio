import { cn } from '../../lib/cn'

/**
 * Centered, max-width content wrapper with the site's responsive padding.
 * Mirrors the original `.w` utility.
 */
export function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cn('w', className)} {...rest}>
      {children}
    </Tag>
  )
}
