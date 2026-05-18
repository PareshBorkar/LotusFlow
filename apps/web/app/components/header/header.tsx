import { Bell, ChevronDown, HelpCircle, PanelLeftClose, PanelLeftOpen, Search } from 'lucide-react';

type HeaderProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export function Header({ isSidebarOpen, onToggleSidebar }: HeaderProps) {
  return (
    <header className='flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6'>
      {/* Left Section */}
      <div className='flex items-center gap-3'>
        <button
          type='button'
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={isSidebarOpen}
          className='rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700'
        >
          {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
        </button>

        {/* Logo */}
        <div className='flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-sm font-bold text-white'>
          A
        </div>

        {/* Company */}
        <button className='flex items-center gap-1 text-sm font-semibold text-slate-700 transition hover:text-slate-900'>
          Acme
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Right Section */}
      <div className='flex items-center gap-5'>
        {/* Search */}
        <div className='relative hidden md:block'>
          <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />

          <input
            type='text'
            placeholder='Search'
            className='h-10 w-64 rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm outline-none transition focus:border-blue-500 focus:bg-white'
          />

          <span className='absolute right-3 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400'>
            /
          </span>
        </div>

        {/* Icons */}
        <div className='flex items-center gap-4 text-slate-500'>
          <button className='transition hover:text-slate-700'>
            <Bell size={18} />
          </button>

          <button className='transition hover:text-slate-700'>
            <HelpCircle size={18} />
          </button>
        </div>

        {/* Avatar */}
        <button className='overflow-hidden rounded-full ring-2 ring-transparent transition hover:ring-slate-300'>
          <img
            src='https://i.pravatar.cc/40?img=12'
            alt='User Avatar'
            className='h-9 w-9 object-cover'
          />
        </button>
      </div>
    </header>
  );
}
