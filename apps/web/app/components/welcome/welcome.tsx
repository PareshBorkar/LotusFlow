import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MoreHorizontal, Search } from 'lucide-react';
import { useState } from 'react';
import TaskSingle from './taskSingle';
import TaskPopUp from './taskPopUp';

type TaskTag = 'Frontend' | 'Backend' | 'DevOps';

type Task = {
  id: string;
  title: string;
  tag: TaskTag;
  storyPoints?: number;
};

type BoardColumn = {
  title: string;
  count: number;
  tasks: Task[];
};

const initialColumns: BoardColumn[] = [
  {
    title: 'TO DO',
    count: 14,
    tasks: [
      {
        id: 'NP-123',
        title: 'Implement user avatar upload',
        tag: 'Frontend',
        storyPoints: 5,
      },
      {
        id: 'NP-124',
        title: 'Add global search functionality',
        tag: 'Backend',
        storyPoints: 3,
      },
      {
        id: 'NP-125',
        title: 'Create notifications preferences',
        tag: 'Frontend',
        storyPoints: 2,
      },
    ],
  },
  {
    title: 'IN PROGRESS',
    count: 5,
    tasks: [
      {
        id: 'NP-126',
        title: 'Integrate payment gateway',
        tag: 'Backend',
        storyPoints: 5,
      },
      {
        id: 'NP-127',
        title: 'Build admin dashboard analytics',
        tag: 'Frontend',
        storyPoints: 3,
      },
      {
        id: 'NP-128',
        title: 'Add activity log',
        tag: 'Backend',
        storyPoints: 2,
      },
    ],
  },
  {
    title: 'IN REVIEW',
    count: 3,
    tasks: [
      {
        id: 'NP-129',
        title: 'Improve mobile responsiveness',
        tag: 'Frontend',
        storyPoints: 5,
      },
      {
        id: 'NP-130',
        title: 'Optimize database queries',
        tag: 'Backend',
        storyPoints: 3,
      },
      {
        id: 'NP-131',
        title: 'Add unit tests for user service',
        tag: 'Backend',
      },
    ],
  },
  {
    title: 'DONE',
    count: 8,
    tasks: [
      {
        id: 'NP-120',
        title: 'Setup CI/CD pipeline',
        tag: 'DevOps',
        storyPoints: 5,
      },
      {
        id: 'NP-121',
        title: 'Design system components',
        tag: 'Frontend',
        storyPoints: 3,
      },
      {
        id: 'NP-122',
        title: 'User authentication flow',
        tag: 'Backend',
        storyPoints: 8,
      },
    ],
  },
];

export function Welcome() {
  const [isOpen, setIsOpen] = useState(false);
  const [columns, setColumns] = useState(initialColumns);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function findColumnIndexByTaskId(taskId: string) {
    return columns.findIndex((column) => column.tasks.some((task) => task.id === taskId));
  }

  function findColumnIndexById(id: string) {
    const columnIndex = columns.findIndex((column) => column.title === id);

    if (columnIndex !== -1) {
      return columnIndex;
    }

    return findColumnIndexByTaskId(id);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) {
      return;
    }

    const activeId = String(active.id);
    const overId = String(over.id);
    const sourceColumnIndex = findColumnIndexByTaskId(activeId);
    const destinationColumnIndex = findColumnIndexById(overId);

    if (sourceColumnIndex === -1 || destinationColumnIndex === -1) {
      return;
    }

    setColumns((currentColumns) => {
      const nextColumns = currentColumns.map((column) => ({
        ...column,
        tasks: [...column.tasks],
      }));
      const sourceColumn = nextColumns[sourceColumnIndex];
      const destinationColumn = nextColumns[destinationColumnIndex];
      const activeTaskIndex = sourceColumn.tasks.findIndex((task) => task.id === activeId);

      if (activeTaskIndex === -1) {
        return currentColumns;
      }

      if (sourceColumnIndex === destinationColumnIndex) {
        const overTaskIndex = destinationColumn.tasks.findIndex((task) => task.id === overId);

        if (overTaskIndex === -1) {
          return currentColumns;
        }

        sourceColumn.tasks = arrayMove(sourceColumn.tasks, activeTaskIndex, overTaskIndex);
        return nextColumns;
      }

      const [activeTask] = sourceColumn.tasks.splice(activeTaskIndex, 1);
      const overTaskIndex = destinationColumn.tasks.findIndex((task) => task.id === overId);
      const destinationIndex =
        overTaskIndex === -1 ? destinationColumn.tasks.length : overTaskIndex;

      destinationColumn.tasks.splice(destinationIndex, 0, activeTask);

      return nextColumns;
    });
  }

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
            onClick={() => setIsOpen(true)}
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
          <TaskPopUp close={() => setIsOpen(false)} />
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
            <SortableTask key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

function SortableTask({ task }: { task: Task }) {
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
      <TaskSingle
        id={task.id}
        title={task.title}
        tag={task.tag}
        storyPoints={task.storyPoints}
      />
    </div>
  );
}
