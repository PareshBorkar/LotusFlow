import { closestCorners, DndContext, useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MoreHorizontal, Search } from 'lucide-react';
import { useDisclosure, useTaskBoard, type BoardColumn } from '../../hooks';
import TaskCard from './taskCard';
import TaskModal from './taskModal';

import { initialColumns } from '~/api/mockData';

export function KanbanBoard() {
  const { isOpen, open, close } = useDisclosure();
  const { columns, sensors, handleDragEnd } = useTaskBoard(initialColumns);

  return (
    <>
      <div className='min-h-screen bg-white p-6'>
        {/* Header */}
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <p className='text-sm text-slate-400'>Projects / Nova Platform</p>
            <h1 className='mt-1 text-3xl font-bold text-slate-800'>Board</h1>
          </div>
          <button
            onClick={open}
            className='rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 hover:cursor-pointer'
          >
            Create
          </button>
        </div>

        {/* Toolbar */}
        <div className='mb-6 flex flex-wrap items-center gap-4'>
          {/* Search */}
          <div className='flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm'>
            <Search size={18} className='text-slate-400' />

            <input
              type='text'
              placeholder='Search board'
              className='bg-transparent text-sm outline-none placeholder:text-slate-400'
            />
          </div>

          {/* Avatars */}
          <div className='flex -space-x-2'>
            {[1, 2, 3, 4].map((item) => (
              <img
                key={item}
                src={`https://i.pravatar.cc/40?img=${item + 10}`}
                alt='avatar'
                className='h-10 w-10 rounded-full border-2 border-white object-cover'
              />
            ))}

            <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-sm font-medium text-slate-600'>
              +3
            </div>
          </div>

          {/* Filters */}
          <div className='flex items-center gap-3'>
            {['Sprint 12', 'Quick filters', 'Labels'].map((item) => (
              <button
                key={item}
                className='rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50'
              >
                {item}
              </button>
            ))}

            <button className='rounded-lg border border-slate-200 bg-white p-2 shadow-sm hover:bg-slate-50'>
              <MoreHorizontal size={18} className='text-slate-500' />
            </button>
          </div>
        </div>

        {/* Board */}
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-4'>
            {columns.map((column) => (
              <BoardColumn key={column.title} column={column} />
            ))}
          </div>
        </DndContext>
      </div>
      {isOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 rounded-lg'>
          <TaskModal close={close} mode='create' />
        </div>
      )}
    </>
  );
}

function BoardColumn({ column }: { column: BoardColumn }) {
  const { setNodeRef } = useDroppable({
    id: column.title,
  });

  return (
    <div className='bg-slate-50 p-3'>
      {/* Column Header */}
      <div className='mb-4 flex items-center gap-2'>
        <h2 className='text-sm font-semibold tracking-wide text-slate-500'>{column.title}</h2>

        <span className='text-sm text-slate-400'>{column.tasks.length}</span>
      </div>

      {/* Cards */}
      <SortableContext
        id={column.title}
        items={column.tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className='min-h-24 space-y-4'>
          {column.tasks.map((task) => (
            <SortableTask key={task.id} task={task} status={column.title} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

function SortableTask({ task, status }: { task: BoardColumn['tasks'][number]; status: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? 'relative z-10 opacity-60' : undefined}
      {...attributes}
      {...listeners}
    >
      <TaskCard
        id={task.id}
        title={task.title}
        tag={task.tag}
        storyPoints={task.storyPoints}
        status={status}
      />
    </div>
  );
}
