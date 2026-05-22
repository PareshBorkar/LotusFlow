import { ChevronDown, MoreHorizontal } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { reportLinks, stats, burndownData } from '~/api/mockData';

export default function ReportsPage() {
  return (
    <div className='min-h-screen bg-slate-50 p-6'>
      {/* Header */}
      <div className='mb-6'>
        <div className='mb-2 flex items-center gap-2 text-sm text-slate-500'>
          <span>Projects</span>

          <span>/</span>

          <span>Nova Platform</span>
        </div>

        <h1 className='text-3xl font-bold text-slate-800'>Reports</h1>
      </div>

      {/* Layout */}
      <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
        <div className='grid grid-cols-[260px_1fr]'>
          {/* Sidebar */}
          <aside className='border-r border-slate-200 bg-slate-50'>
            <div className='space-y-1 p-4'>
              {reportLinks.map((item, index) => (
                <button
                  key={item}
                  className={`flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition ${
                    index === 0 ? 'bg-blue-100 text-blue-700' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <section className='p-8'>
            {/* Top Bar */}
            <div className='mb-8 flex items-center justify-between'>
              <h2 className='text-2xl font-semibold text-slate-800'>Sprint report</h2>

              <div className='flex items-center gap-3'>
                <button className='flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100'>
                  Sprint 12
                  <ChevronDown size={16} />
                </button>

                <button className='rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-100'>
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className='mb-10 grid grid-cols-4 gap-5'>
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'
                >
                  <div className='text-5xl font-bold tracking-tight text-slate-800'>
                    {stat.value}
                  </div>

                  <p className='mt-3 text-sm font-medium text-slate-500'>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div>
              <h3 className='mb-6 text-xl font-semibold text-slate-800'>Burndown chart</h3>

              <div className='rounded-2xl border border-slate-200 bg-white p-6'>
                {/* Legend */}
                <div className='mb-6 flex items-center justify-end gap-6 text-sm font-medium'>
                  <div className='flex items-center gap-2 text-slate-400'>
                    <div className='h-[2px] w-8 border-t-2 border-dashed border-slate-400' />
                    Ideal
                  </div>

                  <div className='flex items-center gap-2 text-blue-600'>
                    <div className='h-[2px] w-8 bg-blue-500' />
                    Actual
                  </div>
                </div>

                {/* Chart */}
                <div className='h-[400px] w-full'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <LineChart data={burndownData}>
                      <XAxis
                        dataKey='date'
                        tickLine={false}
                        axisLine={false}
                        tick={{
                          fontSize: 13,
                          fill: '#64748b',
                        }}
                      />

                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{
                          fontSize: 13,
                          fill: '#64748b',
                        }}
                      />

                      <Tooltip />

                      {/* Ideal */}
                      <Line
                        type='monotone'
                        dataKey='ideal'
                        stroke='#94a3b8'
                        strokeWidth={2}
                        strokeDasharray='5 5'
                        dot={false}
                      />

                      {/* Actual */}
                      <Line
                        type='monotone'
                        dataKey='actual'
                        stroke='#2563eb'
                        strokeWidth={3}
                        dot={{
                          r: 4,
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
