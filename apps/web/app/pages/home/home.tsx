import { DragAndDropBoard } from '../../components/dragAndDropBoard/dragAndDropBoard';

export function meta() {
  return [{ title: 'LotusFlow' }, { name: 'description', content: 'Welcome to LotusFlow' }];
}

export default function Home() {
  return <DragAndDropBoard />;
}
