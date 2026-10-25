import { cn } from '../../lib/cn'

/**
 * Centered, max-width content wrapper with the site's responsive padding.
 */
export function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cn('site', className)} {...rest}>
      {children}
    </Tag>
  )
}
