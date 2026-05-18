// app/components/TaskDrawer.jsx

import { type ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

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

const TAG_STYLES = {
  Frontend: 'bg-purple-100 text-purple-700',
  Backend: 'bg-green-100 text-green-700',
  DevOps: 'bg-slate-200 text-slate-700',
};

type TaskTag = keyof typeof TAG_STYLES;

type TaskDrawerMode = 'create' | 'view';

type TaskFormValues = {
  title: string;
  description: string;
  status: string;
};

type TaskDrawerProps = {
  close: () => void;
  mode?: TaskDrawerMode;
  taskName?: string;
  taskId?: string;
  tag?: TaskTag;
  status?: string;
  storyPoints?: number;
};

export default function TaskDrawer({
  close,
  mode = 'view',
  taskName = '',
  taskId = '',
  tag = 'Frontend',
  status = 'In Progress',
}: TaskDrawerProps) {
  const isCreate = mode === 'create';

  /* -------------------------------------------------------------------------- */
  /*                                   RHF                                      */
  /* -------------------------------------------------------------------------- */

  const { register, handleSubmit, watch } = useForm<TaskFormValues>({
    defaultValues: {
      title: taskName,
      description: '',
      status,
    },
  });

  const watchedTitle = watch('title');
  const watchedDescription = watch('description');
  const watchedStatus = watch('status');

  /* -------------------------------------------------------------------------- */
  /*                               Local UI State                               */
  /* -------------------------------------------------------------------------- */

  const [isEditingTitle, setIsEditingTitle] = useState(mode === 'create');

  const [isEditingDescription, setIsEditingDescription] = useState(mode === 'create');

  const [isEditingStatus, setIsEditingStatus] = useState(mode === 'create');

  /* -------------------------------------------------------------------------- */
  /*                                 Submit                                     */
  /* -------------------------------------------------------------------------- */

  const onSubmit = (data: TaskFormValues) => {
    console.log(data);

    /**
     * RTK Mutation Later
     *
     * await createTask(data)
     * await updateTask(data)
     */
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg'
    >
      {/* Header */}
      <div className='flex-shrink-0 border-b border-slate-100 px-6 py-5'>
        {/* Top Row */}
        <div className='mb-5 flex items-center justify-between'>
          <div className='flex items-center gap-2 text-sm text-slate-500'>
            <div className='h-3 w-3 rounded-sm bg-green-500' />

            <span className='font-medium'>{isCreate ? 'NEW TASK' : taskId}</span>
          </div>

          <div className='flex items-center gap-4 text-slate-400'>
            <Lock size={16} className='cursor-pointer hover:text-slate-600' />

            <Eye size={16} className='cursor-pointer hover:text-slate-600' />

            <Share2 size={16} className='cursor-pointer hover:text-slate-600' />

            <MoreHorizontal size={16} className='cursor-pointer hover:text-slate-600' />

            <X size={18} onClick={close} className='cursor-pointer hover:text-slate-700' />
          </div>
        </div>

        {/* Title */}
        {isEditingTitle ? (
          <input
            autoFocus
            {...register('title')}
            onBlur={() => !isCreate && setIsEditingTitle(false)}
            placeholder='Enter task title'
            className='w-full border-none bg-transparent text-3xl font-bold tracking-tight text-slate-800 outline-none placeholder:text-slate-400'
          />
        ) : (
          <h1
            onClick={() => setIsEditingTitle(true)}
            className='cursor-text text-3xl font-bold tracking-tight text-slate-800'
          >
            {watchedTitle || 'Untitled Task'}
          </h1>
        )}

        {/* Actions */}
        <div className='mt-5 flex flex-wrap items-center gap-3'>
          <ActionButton icon={<Paperclip size={16} />} label='Attach' />

          <ActionButton icon={<Plus size={16} />} label='Add a child issue' />

          <ActionButton icon={<Link2 size={16} />} label='Link issue' />

          <button
            type='button'
            className='rounded-lg p-2 text-slate-500 transition hover:bg-slate-100'
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 space-y-6 overflow-y-auto px-6 py-6'>
        {/* Details */}
        <div className='space-y-5'>
          {/* Status */}
          <DetailRow
            label='Status'
            value={
              isEditingStatus ? (
                <select
                  {...register('status')}
                  onBlur={() => !isCreate && setIsEditingStatus(false)}
                  className='rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500'
                >
                  <option value='TODO'>TODO</option>

                  <option value='In Progress'>In Progress</option>

                  <option value='In Review'>In Review</option>

                  <option value='Done'>Done</option>
                </select>
              ) : (
                <span
                  onClick={() => setIsEditingStatus(true)}
                  className='cursor-pointer rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700'
                >
                  {watchedStatus}
                </span>
              )
            }
          />

          {/* Assignee */}
          <DetailRow
            label='Assignee'
            value={<UserRow name='Wade Warren' avatar='https://i.pravatar.cc/40?img=12' />}
          />

          {/* Reporter */}
          <DetailRow
            label='Reporter'
            value={<UserRow name='Kathryn Murphy' avatar='https://i.pravatar.cc/40?img=32' />}
          />

          {/* Labels */}
          <DetailRow
            label='Labels'
            value={
              <div className='flex items-center gap-3'>
                <span className={`rounded-md px-3 py-1 text-sm font-medium ${TAG_STYLES[tag]}`}>
                  {tag}
                </span>

                <button type='button' className='text-slate-400 hover:text-slate-600'>
                  <Plus size={16} />
                </button>
              </div>
            }
          />

          {/* Sprint */}
          <DetailRow
            label='Sprint'
            value={<span className='font-medium text-blue-600'>Sprint 12</span>}
          />

          {/* Priority */}
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

          {isEditingDescription ? (
            <textarea
              autoFocus={isCreate}
              {...register('description')}
              onBlur={() => !isCreate && setIsEditingDescription(false)}
              placeholder='Add description...'
              className='min-h-[140px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 leading-7 text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white'
            />
          ) : (
            <div
              onClick={() => setIsEditingDescription(true)}
              className='cursor-text rounded-xl border border-transparent p-4 leading-7 text-slate-700 transition hover:border-slate-200 hover:bg-slate-50'
            >
              {watchedDescription ? (
                watchedDescription
              ) : (
                <span className='text-slate-400'>Add description...</span>
              )}
            </div>
          )}
        </div>

        {/* Activity */}
        <div>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
              Activity
            </h2>

            <button type='button' className='text-sm text-slate-500 hover:text-slate-700'>
              Newest first
            </button>
          </div>

          {/* Tabs */}
          <div className='mb-5 flex items-center gap-5 border-b border-slate-100 pb-3'>
            {['All', 'Comments', 'History', 'Work log'].map((tab) => (
              <button
                key={tab}
                type='button'
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

        {/* Footer */}
        <div className='flex items-center justify-end gap-3 border-t border-slate-100 pt-6'>
          <button
            type='button'
            onClick={close}
            className='rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100'
          >
            Cancel
          </button>

          <button
            type='submit'
            className='rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700'
          >
            {isCreate ? 'Create Task' : 'Save Changes'}
          </button>
        </div>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

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

function ActionButton({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button
      type='button'
      className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100'
    >
      {icon}

      {label}
    </button>
  );
}
