import { ChevronDown, MoreHorizontal, Search, ArrowUp, Check } from 'lucide-react';

import { epics, issues } from '~/api/mockData';

export default function BacklogPage() {
  return (
    <div className='min-h-screen bg-slate-50 p-6'>
      {/* Header */}
      <div className='mb-6 flex items-start justify-between'>
        <div>
          <div className='mb-2 flex items-center gap-2 text-sm text-slate-500'>
            <span>Projects</span>

            <span>/</span>

            <span>Nova Platform</span>
          </div>

          <h1 className='text-3xl font-bold text-slate-800'>Backlog</h1>
        </div>

        <div className='flex items-center gap-3'>
          <button className='rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700'>
            Create Issue
          </button>

          <button className='rounded-lg border border-slate-200 bg-white p-3 text-slate-600 hover:bg-slate-100'>
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className='mb-6 flex items-center gap-4'>
        {/* Search */}
        <div className='relative w-[260px]'>
          <Search size={18} className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' />

          <input
            type='text'
            placeholder='Search backlog'
            className='w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500'
          />
        </div>

        {/* Filters */}
        <button className='flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100'>
          Quick filters
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Content */}
      <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
        <div className='grid grid-cols-[260px_1fr]'>
          {/* Sidebar */}
          <aside className='border-r border-slate-200 bg-slate-50'>
            {/* Sidebar Header */}
            <div className='flex items-center justify-between border-b border-slate-200 px-5 py-4'>
              <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                Epics
              </h2>

              <ChevronDown size={16} className='text-slate-400' />
            </div>

            {/* Epic List */}
            <div className='space-y-1 p-3'>
              {epics.map((epic) => (
                <button
                  key={epic.name}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                    epic.active ? 'bg-blue-100 text-blue-700' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{epic.name}</span>

                  <span>{epic.count}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Issues */}
          <section>
            {/* Header */}
            <div className='border-b border-slate-200 px-6 py-4'>
              <h2 className='text-lg font-semibold text-slate-800'>25 Issues</h2>
            </div>

            {/* Issue List */}
            <div>
              {issues.map((issue) => (
                <div
                  key={issue.id}
                  className='grid grid-cols-[120px_1fr_120px_120px_60px_40px] items-center gap-4 border-b border-slate-100 px-6 py-4 transition hover:bg-slate-50'
                >
                  {/* ID */}
                  <div className='flex items-center gap-2 text-sm font-medium text-slate-500'>
                    <div className='h-4 w-4 rounded border border-blue-400 bg-blue-50' />

                    {issue.id}
                  </div>

                  {/* Title */}
                  <p className='font-medium text-slate-800'>{issue.title}</p>

                  {/* Status */}
                  <div className='flex justify-center'>
                    {issue.done ? (
                      <Check size={18} className='text-green-500' />
                    ) : (
                      <ArrowUp size={18} className='text-orange-500' />
                    )}
                  </div>

                  {/* Priority */}
                  <span
                    className={`text-sm font-semibold ${
                      issue.priority === 'High'
                        ? 'text-slate-800'
                        : issue.priority === 'Medium'
                          ? 'text-slate-600'
                          : 'text-slate-400'
                    }`}
                  >
                    {issue.priority}
                  </span>

                  {/* Avatar */}
                  <img
                    src={issue.avatar}
                    alt='user'
                    className='h-9 w-9 rounded-full object-cover'
                  />

                  {/* Actions */}
                  <button className='text-slate-400 hover:text-slate-600'>
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
