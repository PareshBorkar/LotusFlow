import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('pages/home/home.tsx'),
  route('login', 'pages/login/login.tsx'),
  route('roadMap', 'pages/roadMap/roadMap.tsx'),
  route('backlog', 'pages/backlog/backlog.tsx'),
  route('reports', 'pages/reports/reports.tsx'),
] satisfies RouteConfig;
