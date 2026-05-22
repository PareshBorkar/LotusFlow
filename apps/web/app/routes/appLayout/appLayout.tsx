import { useState } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../../components/header/header';
import { Sidebar } from '../../components/sidebar/sidebar';

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className='flex min-h-screen flex-col'>
      <Header
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((value) => !value)}
      />
      <div className='flex flex-1'>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className='min-w-0 flex-1'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
