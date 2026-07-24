import { lazy } from 'react';

const LazyDirectory = lazy(() => import('./index.tsx'));

export default LazyDirectory;
