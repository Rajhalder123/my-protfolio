import { Link, useLocation } from 'react-router-dom';

/**
 * One link component for every kind of destination:
 * routes (/work/x), in-page sections (#work), files, mailto and external URLs.
 */
export default function SmartLink({ href, children, download, className, ...rest }) {
  const { pathname } = useLocation();

  if (!href) return null;

  if (href.startsWith('#')) {
    if (pathname === '/') {
      return (
        <a href={href} className={className} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link to={`/${href}`} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  if (href.startsWith('/') && !download && !href.startsWith('/static/')) {
    return (
      <Link to={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={className}
      download={download}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
