import {
  BadgeCheck,
  BookOpen,
  Boxes,
  ClipboardList,
  FolderKanban,
  Gauge,
  HelpCircle,
  LayoutGrid,
  ListTodo,
  PanelLeft,
  Settings,
  Sparkles,
  Star,
  Users,
  X,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SidebarItemProps = {
  icon: ReactNode;
  label: string;
  active?: boolean;
  rightContent?: ReactNode;
  isOpen?: boolean;
  path?: string;
  disabled?: boolean;
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  if (!isOpen) {
    // return null;
  }

  return (
    <aside
      className={`flex h-[calc(100vh-4rem)] flex-shrink-0 flex-col border-r border-slate-200 bg-white ${isOpen ? 'w-72' : 'w-16'} transition-width duration-300`}
    >
      {isOpen && (
        <div className='flex items-center justify-between border-b border-slate-100 px-4 py-3'>
          <span className='text-sm font-semibold text-slate-700'>Navigation</span>
          <button
            type='button'
            onClick={onClose}
            aria-label='Close sidebar'
            className='rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700'
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* Top Menu */}
      <div className='border-b border-slate-100 px-4 py-4'>
        <nav className='space-y-1'>
          <SidebarItem icon={<LayoutGrid size={17} />} label='Your work' isOpen={isOpen} />

          <SidebarItem icon={<Gauge size={17} />} label='Recent' isOpen={isOpen} />

          <SidebarItem icon={<Star size={17} />} label='Starred' isOpen={isOpen} />

          <SidebarItem
            icon={<FolderKanban size={17} />}
            label='Projects'
            rightContent={<span className='text-slate-400 hover:text-slate-600'>+</span>}
            isOpen={isOpen}
          />
        </nav>
      </div>

      {/* Project Section */}
      <div className='flex-1 overflow-y-auto px-4 py-4'>
        {/* Project Card */}
        {isOpen && (
          <div className='mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3'>
            <div className='flex items-start justify-between'>
              <div className='flex gap-3'>
                {/* Logo */}
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-sm'>
                  <Sparkles size={18} />
                </div>

                {/* Content */}
                <div>
                  <h2 className='text-sm font-semibold text-slate-800'>Nova Platform</h2>

                  <p className='text-xs text-slate-500'>Software project</p>
                </div>
              </div>

              <span className='text-slate-400 hover:text-slate-600'>˅</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className='space-y-1'>
          <SidebarItem
            icon={<BookOpen size={17} />}
            label='Roadmap'
            path='/roadmap'
            isOpen={isOpen}
          />
          <SidebarItem icon={<PanelLeft size={17} />} label='Board' path='/' isOpen={isOpen} />
          <SidebarItem
            icon={<ListTodo size={17} />}
            label='Backlog'
            path='/backlog'
            isOpen={isOpen}
          />
          <SidebarItem icon={<Gauge size={17} />} label='Reports' path='/reports' isOpen={isOpen} />
          <SidebarItem
            icon={<Boxes size={17} />}
            label='Active sprints'
            path='/sprints'
            isOpen={isOpen}
            disabled={true}
          />

          <SidebarItem
            icon={<ClipboardList size={17} />}
            label='Issues'
            path='/issues'
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<BadgeCheck size={17} />}
            label='Components'
            path='/components'
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<LayoutGrid size={17} />}
            label='Releases'
            path='/releases'
            isOpen={isOpen}
          />
          <SidebarItem icon={<Settings size={17} />} label='Project settings' isOpen={isOpen} />
        </nav>
      </div>

      {/* Footer */}
      <div className='border-t border-slate-100 px-4 py-4'>
        <nav className='space-y-1'>
          <SidebarItem icon={<Users size={17} />} label='Invite people' isOpen={isOpen} />

          <SidebarItem icon={<HelpCircle size={17} />} label='Give feedback' isOpen={isOpen} />
        </nav>
      </div>
    </aside>
  );
}

function SidebarItem({
  icon,
  label,
  active = false,
  rightContent = null,
  isOpen = true,
  path = '',
  disabled = false,
}: SidebarItemProps) {
  const baseClassName = isOpen
    ? 'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition'
    : 'flex items-center justify-between rounded-lg py-2.5 text-sm font-medium transition';

  const stateClassName = (isActive: boolean) =>
    isActive || active
      ? 'bg-blue-50 text-blue-700'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900';

  if (!isOpen) {
    // Collapsed state - only show icons
    const content = (
      <div className='flex items-center gap-3'>
        <span>{icon}</span>
      </div>
    );

    if (path) {
      return (
        <NavLink
          to={path}
          end={path === '/'}
          className={({ isActive }) => `${baseClassName} ${stateClassName(isActive)}`}
          aria-label={label}
          onClick={(e: any) => {
            if (disabled) {
              alert('This feature is coming soon!');
              e.preventDefault();
            }
          }}
        >
          {content}
        </NavLink>
      );
    }

    return (
      <button type='button' className={`${baseClassName} ${stateClassName(false)}`}>
        {content}
      </button>
    );
  }

  const content = (
    <>
      <div className='flex items-center gap-3'>
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      {rightContent}
      {/* to generate content like + in the sidebar Item */}
    </>
  );

  if (path) {
    return (
      <NavLink
        to={path}
        end={path === '/'}
        className={({ isActive }) => `${baseClassName} ${stateClassName(isActive)}`}
        onClick={(e: any) => {
          if (disabled) {
            alert('This feature is coming soon!');
            e.preventDefault();
          }
        }}
      >
        {content}
      </NavLink>
    );
  }

  return (
    <button type='button' className={`${baseClassName} ${stateClassName(false)}`}>
      {content}
    </button>
  );
}
