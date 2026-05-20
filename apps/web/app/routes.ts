import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home/home.tsx'),
  route('login', 'routes/login/login.tsx'),
  route('roadMap', 'routes/roadMap/roadMap.tsx'),
  route('backlog', 'routes/backlog/backlog.tsx'),
  route('reports', 'routes/reports/reports.tsx'),
] satisfies RouteConfig;
