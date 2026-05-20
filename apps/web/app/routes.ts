import {
  type RouteConfig,
  type RouteConfigEntry,
  index,
  layout,
  route,
} from '@react-router/dev/routes';
import { appRoutes } from './routes-config/index';
import type { AppRouteConfig } from './routes-config/appRoutes';

function createRoute(routeConfig: AppRouteConfig): RouteConfigEntry {
  if (routeConfig.index) {
    return index(routeConfig.file);
  }

  const children: RouteConfigEntry[] | undefined = routeConfig.children?.map(createRoute);

  if (children && routeConfig.path === undefined) {
    return layout(routeConfig.file, children);
  }

  return route(routeConfig.path, routeConfig.file, children);
}

const routes: RouteConfig = appRoutes.map(createRoute);

export default routes;
