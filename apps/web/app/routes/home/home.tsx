import { useState } from 'react';
import { Header } from '../../components/header/header';
import { Sidebar } from '../../components/sidebar/sidebar';
import { KanbanBoard } from '../../components/kanbanBoard/kanbanBoard';

export function meta() {
  return [{ title: 'LotusFlow' }, { name: 'description', content: 'Welcome to LotusFlow' }];
}

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function toggleSidebar() {
    setIsSidebarOpen((currentValue) => !currentValue);
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
      <div className='flex flex-1'>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className='min-w-0 flex-1'>
          <KanbanBoard />
        </main>
      </div>
    </div>
  );
}
