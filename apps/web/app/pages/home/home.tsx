import { Welcome } from '../../components/welcome/welcome';

export function meta() {
  return [{ title: 'LotusFlow' }, { name: 'description', content: 'Welcome to LotusFlow' }];
}

export default function Home() {
  return <Welcome />;
}
