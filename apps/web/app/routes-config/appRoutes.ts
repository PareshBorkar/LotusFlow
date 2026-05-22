export type AppRouteConfig = {
  path?: string;
  file: string;
  index?: boolean;
  public?: boolean;
  title?: string;
  permission?: string;
  icon?: string;
  showInSidebar?: boolean;
  featureFlag?: string;
  children?: AppRouteConfig[];
};

export const appRoutes = [
  {
    file: 'routes/appLayout/appLayout.tsx',
    public: false,
    children: [
      {
        index: true,
        file: 'routes/home/home.tsx',
        public: false,
        title: 'Dashboard',
        permission: 'dashboard:view',
        icon: 'layout-dashboard',
        showInSidebar: true,
      },
      {
        path: 'roadMap',
        file: 'routes/roadMap/roadMap.tsx',
        public: false,
        title: 'Roadmap',
        permission: 'roadmap:view',
        icon: 'map',
        showInSidebar: true,
      },
      {
        path: 'backlog',
        file: 'routes/backlog/backlog.tsx',
        public: false,
        title: 'Backlog',
        permission: 'backlog:view',
        icon: 'list-todo',
        showInSidebar: true,
      },
      {
        path: 'reports',
        file: 'routes/reports/reports.tsx',
        public: false,
        title: 'Reports',
        permission: 'reports:view',
        featureFlag: 'advanced_reports',
        icon: 'bar-chart-3',
        showInSidebar: true,
      },
      {
        path: '403',
        file: 'routes/403/403.tsx',
        public: false,
        title: 'Forbidden',
        showInSidebar: false,
      },
    ],
  },
  {
    path: 'login',
    file: 'routes/login/login.tsx',
    public: true,
    title: 'Login',
    showInSidebar: false,
  },
] satisfies AppRouteConfig[];
