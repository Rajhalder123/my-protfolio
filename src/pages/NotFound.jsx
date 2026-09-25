import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/hooks';
import Icon from '../components/ui/Icon';

export default function NotFound() {
  usePageMeta({ title: 'Page not found' });
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-start justify-center pb-20 pt-32">
      <p className="label">404</p>
      <h1 className="h-section mt-3">This page doesn't exist</h1>
      <p className="lede mt-4 max-w-lg">The link may be old or mistyped. The work and case studies are on the home page.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className="btn btn-primary">
          <Icon name="arrowLeft" />
          Go to home page
        </Link>
        <Link to="/#work" className="btn btn-secondary">
          See selected work
        </Link>
      </div>
    </section>
  );
}
