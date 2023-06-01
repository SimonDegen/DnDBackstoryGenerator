import { json } from '@sveltejs/kit';

export async function GET({ request }: { request: any }) {
	const url = `https://pokeapi.co/api/v2/pokemon/ditto`;
	const res = await fetch(url);
	const details = await res.json();
	return json(details);
}