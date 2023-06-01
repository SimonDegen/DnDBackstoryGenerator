<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import Header from '../components/header.svelte';
	import Footer from '../components/footer.svelte';
</script>

<AppShell>
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<slot />
	<svelte:fragment slot="footer"><Footer /></svelte:fragment>
</AppShell>
