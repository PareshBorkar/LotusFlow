import { redirect } from 'react-router';
import { store } from '../store/store';

export function requireAuth() {
  const state = store.getState();
  const session = state.auth.session;
  if (!session) {
    throw redirect('/login');
  }
  return session;
}

export function requirePermission(permission: string) {
  const state = store.getState();
  const session = state.auth.session;
  if (!session) {
    throw redirect('/login');
  }
  const hasPermission = session.permissions.includes(permission);
  if (!hasPermission) {
    throw redirect('/403');
  }
  return session;
}

export function canAccessRoute(route: any) {
  const state = store.getState();
  const session = state.auth.session;
  if (route.public) {
    return true;
  }
  if (!session) {
    return false;
  }
  if (!route.permission) {
    return true;
  }
  return session.permissions.includes(route.permission);
}
