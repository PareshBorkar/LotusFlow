import { type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useCallback, useState } from 'react';

export type TaskTag = 'Frontend' | 'Backend' | 'DevOps';

export type Task = {
  id: string;
  title: string;
  tag: TaskTag;
  storyPoints?: number;
};

export type BoardColumn = {
  title: string;
  count: number;
  tasks: Task[];
};

function findColumnIndexByTaskId(columns: BoardColumn[], taskId: string) {
  return columns.findIndex((column) => column.tasks.some((task) => task.id === taskId));
}

function findColumnIndexById(columns: BoardColumn[], id: string) {
  const columnIndex = columns.findIndex((column) => column.title === id);

  if (columnIndex !== -1) {
    return columnIndex;
  }

  return findColumnIndexByTaskId(columns, id);
}

export function useTaskBoard(initialColumns: BoardColumn[]) {
  const [columns, setColumns] = useState(initialColumns);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragEnd = useCallback(({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      return;
    }

    const activeId = String(active.id);
    const overId = String(over.id);

    setColumns((currentColumns) => {
      const sourceColumnIndex = findColumnIndexByTaskId(currentColumns, activeId);
      const destinationColumnIndex = findColumnIndexById(currentColumns, overId);

      if (sourceColumnIndex === -1 || destinationColumnIndex === -1) {
        return currentColumns;
      }

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
  }, []);

  return {
    columns,
    sensors,
    handleDragEnd,
    setColumns,
  };
}
