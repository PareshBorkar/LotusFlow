import { KanbanBoard } from '../../components/kanbanBoard/kanbanBoard';

export function meta() {
  return [{ title: 'LotusFlow' }, { name: 'description', content: 'Welcome to LotusFlow' }];
}

export default function Home() {
  return <KanbanBoard />;
}
