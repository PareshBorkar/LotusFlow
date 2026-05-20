import { useState } from 'react';
import TaskModal from './taskModal';
type TaskTag = 'Frontend' | 'Backend' | 'DevOps';

interface TaskSingleProps {
  id: string;
  title: string;
  tag: TaskTag;
  storyPoints?: number;
  status: string;
}

export default function TaskCard({ id, title, tag, storyPoints, status }: TaskSingleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const tagStyles: Record<TaskTag, string> = {
    Frontend: 'bg-purple-100 text-purple-700',
    Backend: 'bg-green-100 text-green-700',
    DevOps: 'bg-slate-200 text-slate-700',
  };
  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className='rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:cursor-pointer'
      >
        {/* Task ID */}
        <div className='mb-3 flex items-center gap-2'>
          <div className='h-3 w-3 rounded-sm bg-green-500' />

          <span className='text-xs font-medium text-slate-400'>{id}</span>
        </div>

        {/* Title */}
        <h3 className='mb-4 text-sm font-semibold leading-6 text-slate-800'>{title}</h3>

        {/* Tag */}
        <span className={`rounded-md px-2 py-1 text-xs font-medium ${tagStyles[tag]}`}>{tag}</span>

        {/* Footer */}
        <div className='mt-5 flex items-center justify-between'>
          <div className='flex items-center gap-3 text-slate-400'>
            <div className='h-2 w-5 rounded bg-blue-500' />

            <div className='h-2 w-2 rounded-full bg-slate-300' />
          </div>

          <div className='flex items-center gap-2'>
            {storyPoints !== undefined && (
              <span className='text-xs text-slate-400'>{storyPoints}</span>
            )}
            <img
              src={`https://i.pravatar.cc/32?u=${id}`}
              alt='user'
              className='h-7 w-7 rounded-full object-cover'
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 rounded-lg'>
          <TaskModal
            taskId={id}
            taskName={title}
            tag={tag}
            storyPoints={storyPoints}
            status={status}
            close={() => setIsOpen(false)}
          />
        </div>
      )}
    </>
  );
}
