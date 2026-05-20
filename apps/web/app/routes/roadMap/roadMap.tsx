import { MoreHorizontal, Share2, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { sprints, months } from '~/api/mockData';

export default function RoadmapPage() {
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

          <h1 className='text-3xl font-bold text-slate-800'>Roadmap</h1>
        </div>

        <div className='flex items-center gap-3'>
          <button className='flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100'>
            <Share2 size={16} />
            Share
          </button>

          <button className='rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-100'>
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className='mb-6 flex items-center gap-3'>
        <button className='flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100'>
          <SlidersHorizontal size={16} />
          Filter
          <ChevronDown size={14} />
        </button>

        <button className='rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm border border-slate-200'>
          Today
        </button>

        <button className='flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100'>
          Months
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Timeline */}
      <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
        {/* Top Header */}
        <div className='grid grid-cols-[220px_repeat(4,1fr)] border-b border-slate-200 bg-slate-50'>
          <div className='border-r border-slate-200 p-5 text-sm font-semibold text-slate-500'>
            Sprints
          </div>

          {months.map((month) => (
            <div
              key={month}
              className='border-r border-slate-200 p-5 text-center text-sm font-semibold tracking-wide text-slate-500 last:border-r-0'
            >
              {month}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className='relative'>
          {/* Today Line */}
          <div className='absolute left-[54%] top-0 z-20 h-full w-[2px] bg-blue-500'>
            <div className='absolute -left-5 top-3 rounded-md bg-blue-500 px-3 py-1 text-xs font-semibold text-white shadow'>
              Today
            </div>
          </div>

          {sprints.map((row) => (
            <div
              key={row.sprint}
              className='grid grid-cols-[220px_repeat(4,1fr)] border-b border-slate-100 last:border-b-0'
            >
              {/* Sprint Info */}
              <div className='border-r border-slate-100 p-5'>
                <h3 className='font-semibold text-slate-800'>{row.sprint}</h3>

                <p className='mt-1 text-sm text-slate-500'>{row.dates}</p>
              </div>

              {/* Timeline Cells */}
              <div className='relative col-span-4 h-28'>
                <div className='grid h-full grid-cols-4'>
                  {months.map((month) => (
                    <div key={month} className='border-r border-slate-100 last:border-r-0' />
                  ))}
                </div>

                {/* Tasks */}
                {row.tasks.map((task) => (
                  <div
                    key={task.title}
                    className={`absolute top-6 flex h-12 items-center rounded-xl px-4 text-sm font-semibold shadow-sm ${task.color}`}
                    style={{
                      left: `${task.start * 25 + 2}%`,
                      width: `${task.width * 25 - 3}%`,
                    }}
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
