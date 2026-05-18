export const initialColumns: any = [
  {
    title: 'TO DO',
    count: 14,
    tasks: [
      {
        id: 'NP-123',
        title: 'Implement user avatar upload',
        tag: 'Frontend',
        storyPoints: 5,
      },
      {
        id: 'NP-124',
        title: 'Add global search functionality',
        tag: 'Backend',
        storyPoints: 3,
      },
      {
        id: 'NP-125',
        title: 'Create notifications preferences',
        tag: 'Frontend',
        storyPoints: 2,
      },
    ],
  },
  {
    title: 'IN PROGRESS',
    count: 5,
    tasks: [
      {
        id: 'NP-126',
        title: 'Integrate payment gateway',
        tag: 'Backend',
        storyPoints: 5,
      },
      {
        id: 'NP-127',
        title: 'Build admin dashboard analytics',
        tag: 'Frontend',
        storyPoints: 3,
      },
      {
        id: 'NP-128',
        title: 'Add activity log',
        tag: 'Backend',
        storyPoints: 2,
      },
    ],
  },
  {
    title: 'IN REVIEW',
    count: 3,
    tasks: [
      {
        id: 'NP-129',
        title: 'Improve mobile responsiveness',
        tag: 'Frontend',
        storyPoints: 5,
      },
      {
        id: 'NP-130',
        title: 'Optimize database queries',
        tag: 'Backend',
        storyPoints: 3,
      },
      {
        id: 'NP-131',
        title: 'Add unit tests for user service',
        tag: 'Backend',
      },
    ],
  },
  {
    title: 'DONE',
    count: 8,
    tasks: [
      {
        id: 'NP-120',
        title: 'Setup CI/CD pipeline',
        tag: 'DevOps',
        storyPoints: 5,
      },
      {
        id: 'NP-121',
        title: 'Design system components',
        tag: 'Frontend',
        storyPoints: 3,
      },
      {
        id: 'NP-122',
        title: 'User authentication flow',
        tag: 'Backend',
        storyPoints: 8,
      },
    ],
  },
];

export const sprints = [
  {
    sprint: 'Sprint 12',
    dates: 'May 1 – May 14',
    tasks: [
      {
        title: 'User management',
        start: 0,
        width: 2,
        color: 'bg-purple-100 text-purple-700',
      },
    ],
  },
  {
    sprint: 'Sprint 13',
    dates: 'May 15 – May 28',
    tasks: [
      {
        title: 'Payment integration',
        start: 1,
        width: 3,
        color: 'bg-blue-100 text-blue-700',
      },
      {
        title: 'Search improvements',
        start: 4,
        width: 3,
        color: 'bg-green-100 text-green-700',
      },
    ],
  },
  {
    sprint: 'Sprint 14',
    dates: 'May 29 – Jun 11',
    tasks: [
      {
        title: 'Analytics dashboard',
        start: 3,
        width: 2,
        color: 'bg-yellow-100 text-yellow-700',
      },
    ],
  },
  {
    sprint: 'Sprint 15',
    dates: 'Jun 12 – Jun 25',
    tasks: [
      {
        title: 'Notifications',
        start: 1,
        width: 2,
        color: 'bg-purple-100 text-purple-700',
      },
      {
        title: 'Mobile improvements',
        start: 4,
        width: 3,
        color: 'bg-green-100 text-green-700',
      },
    ],
  },
  {
    sprint: 'Sprint 16',
    dates: 'Jun 26 – Jul 9',
    tasks: [
      {
        title: 'Performance optimization',
        start: 2,
        width: 2,
        color: 'bg-blue-100 text-blue-700',
      },
    ],
  },
];

export const months = ['MAY', 'JUN', 'JUL', 'AUG'];

export const epics = [
  {
    name: 'All Issues',
    count: 25,
    active: true,
  },
  {
    name: 'User Management',
    count: 6,
  },
  {
    name: 'Payments',
    count: 5,
  },
  {
    name: 'Analytics',
    count: 4,
  },
  {
    name: 'Notifications',
    count: 3,
  },
  {
    name: 'Platform',
    count: 7,
  },
];

export const issues = [
  {
    id: 'NP-132',
    title: 'Add two-factor authentication',
    priority: 'High',
    avatar: 'https://i.pravatar.cc/40?img=12',
    done: false,
  },
  {
    id: 'NP-133',
    title: 'Implement password reset flow',
    priority: 'Medium',
    avatar: 'https://i.pravatar.cc/40?img=32',
    done: false,
  },
  {
    id: 'NP-134',
    title: 'Create user profile page',
    priority: 'Medium',
    avatar: 'https://i.pravatar.cc/40?img=18',
    done: false,
  },
  {
    id: 'NP-135',
    title: 'Add billing history',
    priority: 'High',
    avatar: 'https://i.pravatar.cc/40?img=45',
    done: false,
  },
  {
    id: 'NP-136',
    title: 'Export analytics data',
    priority: 'Low',
    avatar: 'https://i.pravatar.cc/40?img=22',
    done: true,
  },
  {
    id: 'NP-137',
    title: 'Email notification templates',
    priority: 'Medium',
    avatar: 'https://i.pravatar.cc/40?img=50',
    done: false,
  },
  {
    id: 'NP-138',
    title: 'Improve error handling',
    priority: 'Medium',
    avatar: 'https://i.pravatar.cc/40?img=25',
    done: false,
  },
];

export const reportLinks = [
  'All reports',
  'Sprint report',
  'Burndown chart',
  'Velocity chart',
  'Cumulative flow',
  'Control chart',
  'Epic report',
  'Release report',
];

export const stats = [
  {
    label: 'Committed',
    value: 14,
  },
  {
    label: 'Completed',
    value: 12,
  },
  {
    label: 'In progress',
    value: 2,
  },
  {
    label: 'Not started',
    value: 0,
  },
];

export const burndownData = [
  {
    date: 'May 1',
    ideal: 14,
    actual: 14,
  },
  {
    date: 'May 2',
    ideal: 12,
    actual: 13,
  },
  {
    date: 'May 4',
    ideal: 10,
    actual: 11,
  },
  {
    date: 'May 6',
    ideal: 8,
    actual: 9,
  },
  {
    date: 'May 8',
    ideal: 6,
    actual: 8,
  },
  {
    date: 'May 10',
    ideal: 4,
    actual: 5,
  },
  {
    date: 'May 12',
    ideal: 2,
    actual: 4,
  },
  {
    date: 'May 14',
    ideal: 0,
    actual: 0,
  },
];
