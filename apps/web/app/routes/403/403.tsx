import { Link } from 'react-router';

export function meta() {
  return [
    { title: 'Forbidden | LotusFlow' },
    {
      name: 'description',
      content: 'You do not have permission to access this LotusFlow page.',
    },
  ];
}

export default function ForbiddenPage() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-950'>
      <section className='w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-sm'>
        <p className='text-sm font-semibold uppercase tracking-[0.18em] text-slate-500'>403</p>
        <h1 className='mt-4 text-3xl font-semibold tracking-tight'>Access restricted</h1>
        <p className='mt-3 leading-7 text-slate-600'>
          Your account does not have permission to view this workspace page.
        </p>
        <div className='mt-8 flex flex-wrap gap-3'>
          <Link
            to='/'
            className='inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800'
          >
            Back to dashboard
          </Link>
          <Link
            to='/login'
            className='inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50'
          >
            Sign in again
          </Link>
        </div>
      </section>
    </main>
  );
}
