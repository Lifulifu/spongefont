import { persisted } from 'svelte-persisted-store';

interface UserData {
  likes: { [id: string]: true; };
}

export const user = persisted<UserData>('user', {
  likes: {}
});