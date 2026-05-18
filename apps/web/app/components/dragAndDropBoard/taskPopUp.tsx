// app/components/TaskDrawer.jsx

import {
  AlertTriangle,
  Eye,
  Link2,
  Lock,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Plus,
  Share2,
  X,
} from 'lucide-react';
import type { ReactNode } from 'react';

type TaskTag = 'Frontend' | 'Backend' | 'DevOps';
type mode = 'create' | 'view';
interface TaskPopUpProps {
  close: () => void;
  taskName?: string;
  taskId?: string;
  tag?: TaskTag;
  storyPoints?: number;
  status?: string;
}

export default function TaskPopUp({
  close,
  taskName = '',
  taskId = '',
  tag = 'Frontend',
  storyPoints = 0,
  status = '',
}: TaskPopUpProps) {
  const tagStyles: Record<TaskTag, string> = {
    Frontend: 'bg-purple-100 text-purple-700',
    Backend: 'bg-green-100 text-green-700',
    DevOps: 'bg-slate-200 text-slate-700',
  };
  return (
    <div className='w-full max-w-5xl max-h-[90vh] rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden flex flex-col'>
      {/* Header */}
      <div className='border-b border-slate-100 px-6 py-5 flex-shrink-0'>
        <div className='mb-5 flex items-center justify-between'>
          <div className='flex items-center gap-2 text-sm text-slate-500'>
            <div className='h-3 w-3 rounded-sm bg-green-500' />

            <span className='font-medium'>{taskId}</span>
          </div>

          <div className='flex items-center gap-4 text-slate-400'>
            <Lock size={16} className='cursor-pointer hover:text-slate-600' />

            <Eye size={16} className='cursor-pointer hover:text-slate-600' />

            <Share2 size={16} className='cursor-pointer hover:text-slate-600' />

            <MoreHorizontal size={16} className='cursor-pointer hover:text-slate-600' />

            <X size={18} onClick={close} className='cursor-pointer hover:text-slate-700' />
          </div>
        </div>

        <h1 className='text-3xl font-bold tracking-tight text-slate-800'>{taskName}</h1>

        {/* Actions */}
        <div className='mt-5 flex flex-wrap items-center gap-3'>
          <button className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100'>
            <Paperclip size={16} />
            Attach
          </button>

          <button className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100'>
            <Plus size={16} />
            Add a child issue
          </button>

          <button className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100'>
            <Link2 size={16} />
            Link issue
          </button>

          <button className='rounded-lg p-2 text-slate-500 transition hover:bg-slate-100'>
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className='space-y-6 overflow-y-auto px-6 py-6  flex-1'>
        {/* Details */}
        <div className='space-y-5'>
          <DetailRow
            label='Status'
            value={
              <span className='rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700'>
                {status}
              </span>
            }
          />

          <DetailRow
            label='Assignee'
            value={<UserRow name='Wade Warren' avatar='https://i.pravatar.cc/40?img=12' />}
          />

          <DetailRow
            label='Reporter'
            value={<UserRow name='Kathryn Murphy' avatar='https://i.pravatar.cc/40?img=32' />}
          />

          <DetailRow
            label='Labels'
            value={
              <div className='flex items-center gap-3'>
                <span className={`rounded-md px-3 py-1 text-sm font-medium ${tagStyles[tag]}`}>
                  {tag}
                </span>
                <Plus size={16} className='cursor-pointer text-slate-400 hover:text-slate-600' />
              </div>
            }
          />

          <DetailRow
            label='Sprint'
            value={<span className='font-medium text-blue-600'>Sprint 12</span>}
          />

          <DetailRow
            label='Priority'
            value={
              <div className='flex items-center gap-2'>
                <AlertTriangle size={16} className='fill-orange-500 text-orange-500' />

                <span className='font-medium text-slate-700'>High</span>
              </div>
            }
          />
        </div>

        {/* Description */}
        <div>
          <h2 className='mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500'>
            Description
          </h2>

          <p className='leading-7 text-slate-700'>
            We need to integrate Stripe payment gateway to handle subscriptions and one-time
            payments.
          </p>
        </div>

        {/* Activity */}
        <div>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
              Activity
            </h2>

            <button className='text-sm text-slate-500 hover:text-slate-700'>Newest first</button>
          </div>

          {/* Tabs */}
          <div className='mb-5 flex items-center gap-5 border-b border-slate-100 pb-3'>
            {['All', 'Comments', 'History', 'Work log'].map((tab) => (
              <button
                key={tab}
                className={`text-sm font-medium transition ${
                  tab === 'Comments' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Comment Box */}
          <div className='flex items-start gap-3'>
            <img
              src='https://i.pravatar.cc/40?img=12'
              alt='avatar'
              className='h-9 w-9 rounded-full object-cover'
            />

            <div className='flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-blue-500'>
              <div className='flex items-center gap-2 text-slate-400'>
                <MessageSquare size={16} />

                <input
                  type='text'
                  placeholder='Add a comment...'
                  className='w-full bg-transparent text-sm outline-none placeholder:text-slate-400'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className='grid grid-cols-[110px_1fr] items-center gap-4'>
      <span className='text-sm font-medium text-slate-500'>{label}</span>
      <div>{value}</div>
    </div>
  );
}

function UserRow({ name, avatar }: { name: string; avatar: string }) {
  return (
    <div className='flex items-center gap-3'>
      <img src={avatar} alt={name} className='h-8 w-8 rounded-full object-cover' />

      <span className='font-medium text-slate-700'>{name}</span>
    </div>
  );
}
