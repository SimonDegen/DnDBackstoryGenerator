<script>
	import { onMount } from "svelte";

	import Form from '../components/form.svelte';
	import { createdCharInfo, createdCharImageUrl } from '../store';


	onMount(async () => {
		fetch('/api/pokemon')
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
				return [];
			});
	});
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5 justify-center items-center">
		{#if $createdCharInfo === undefined}
			<div
				class="card p-4 md:p-10 space-y-4 bg-gradient-to-br variant-gradient-primary-secondary max-w-lg"
			>
				<Form />
			</div>
		{:else}
			<div class="container mx-auto py-8">
				<div
					class=" card max-w-lg mx-auto bg-gradient-to-br variant-gradient-primary-secondary variant-gradient-primary-secondary shadow-lg rounded-lg overflow-hidden"
				>
					<div class="p-6">
						<h2 class="text-2xl font-bold mb-4">Name: {$createdCharInfo.name}</h2>
						<p><span class="font-bold">Race:</span> {$createdCharInfo.race}</p>
						<p><span class="font-bold">Class:</span> {$createdCharInfo.class}</p>
						<p><span class="font-bold">Alignment:</span> {$createdCharInfo.alignment}</p>
						<p><span class="font-bold">Summary:</span> {$createdCharInfo.summary}</p>

						<div class="mt-6">
							<h3 class="text-xl font-bold mb-2">Personality Traits:</h3>
							<ul>
								{#each $createdCharInfo.personality_traits as trait}
									<li>{trait}</li>
								{/each}
							</ul>
						</div>

						<div class="mt-6">
							<h3 class="text-xl font-bold mb-2">Personal Quests:</h3>
							<ul>
								<li>{$createdCharInfo.personal_quest}</li>
							</ul>
						</div>
					</div>

					<div class="p-6">
						<div class="w-40 h-40 mx-auto flex items-center justify-center">
							<!-- svelte-ignore a11y-img-redundant-alt -->
							<img
								src={$createdCharImageUrl}
								alt="Character Image"
								class="max-w-full max-h-full rounded-full"
							/>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
