import { appRoutes } from './appRoutes';

import { canAccessRoute } from './guards';

export function getSidebarRoutes() {
  return appRoutes.filter((route) => {
    if (!route.showInSidebar) {
      return false;
    }
    return canAccessRoute(route);
  });
}
