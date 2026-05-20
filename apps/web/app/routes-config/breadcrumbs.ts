import { appRoutes } from './appRoutes';
import type { AppRouteConfig } from './appRoutes';

function flattenRoutes(routes: AppRouteConfig[]): AppRouteConfig[] {
  return routes.flatMap((route) => [route, ...flattenRoutes(route.children ?? [])]);
}

export function getBreadcrumb(pathname: string) {
  return flattenRoutes(appRoutes).find((route) => {
    if (route.index && pathname === '/') {
      return true;
    }

    return route.path ? pathname.includes(route.path) : false;
  });
}
