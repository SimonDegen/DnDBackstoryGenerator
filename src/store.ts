
import { writable, type Writable,  } from 'svelte/store';
import type { CharacterResponse } from './types/charResponse';

export const createdCharInfo: Writable<CharacterResponse | undefined> = writable(undefined);
export const createdCharImageUrl: Writable<string | undefined> = writable(undefined);
