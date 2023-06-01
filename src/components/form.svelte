<script>
	import { enhance } from '$app/forms';
	import { createdCharImageUrl, createdCharInfo } from '../store';

	const aligments = [
		'Lawful Good',
		'Neutral Good',
		'Chaotic Good',
		'Lawful Neutral',
		'Neutral',
		'Chaotic Neutral',
		'Lawful Evil',
		'Neutral Evil',
		'Chaotic Evil'
	];
	const dndClasses = [
		'Barbarian',
		'Ranger',
		'Paladin',
		'Druid',
		'Cleric',
		'Bard',
		'Warlock',
		'Wizard',
		'Sorcerer',
		'Monk',
		'Fighter',
		'Rogue'
	];
	const dndRaces = [
		'Dwarf',
		'Elf',
		'Halfling',
		'Human',
		'Dragonborn',
		'Gnome',
		'Half-Elf',
		'Half-Orc',
		'Tiefling'
	];
</script>

<form
	method="POST"
	action="?/makeApiRequest"
	use:enhance={() => {
		return async ({ result }) => {
			console.log('result', result);
			// @ts-ignore: data exists on the result object
			createdCharInfo.set(result.data.charObj);
			// @ts-ignore: data exists on the result object
			createdCharImageUrl.set(result.data.imageUrl);
		};
	}}
>
	<div class="space-y-4">
		<label class="label">
			<span>Write the name of yor character!</span>
			<input class="input" type="text" placeholder="Input" name="name" />
		</label>
		<label class="label">
			<span>Write a short description of your character!</span>
			<textarea class="textarea" placeholder="Textarea" name="description" />
		</label>
		<label class="label">
			<span>Select class</span>
			<select class="select" name="class">
				{#each dndClasses as dndClass}
					<option value={dndClass}>{dndClass}</option>
				{/each}
			</select>
		</label>
		<label class="label">
			<span>Select race</span>
			<select class="select" name="race">
				{#each dndRaces as dndRace}
					<option value={dndRace}>{dndRace}</option>
				{/each}
			</select>
		</label>
		<label class="label">
			<span>What alignment should they have?</span>
			<select class="select" value="Neutral" name="alignment">
				{#each aligments as aligment}
					<option value={aligment}>{aligment}</option>
				{/each}
			</select>
		</label>

		<button type="submit" class="btn variant-filled-primary w-full">Create</button>
	</div>
</form>
