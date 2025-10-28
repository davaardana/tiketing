import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-slate-200">
    <Compass className="mb-6 h-16 w-16 text-brand" />
    <h1 className="text-3xl font-semibold text-white">Page not found</h1>
    <p className="mt-3 max-w-md text-sm text-slate-400">
      The view you are looking for could not be located. It may have been moved or requires additional permissions.
    </p>
    <Link
      to="/dashboard"
      className="mt-6 inline-flex items-center rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground shadow transition hover:bg-indigo-500"
    >
      Return to dashboard
    </Link>
  </div>
);

export default NotFound;
