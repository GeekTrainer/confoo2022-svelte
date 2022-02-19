<script>
	import DogForm from "./DogForm.svelte";

	let savedDog = null;
</script>

<article class="container">
	<h1>Cute dogs</h1>

	{#if savedDog}
		<section class="alert alert-success">
			<div><strong>Saved dog!</strong></div>
			<div>Name: {savedDog.name}</div>
			<div>Breeds: {savedDog.breeds.map(b => b.name).join(', ')}</div>
		</section>
	{/if}

	<DogForm on:save-dog={(event) => (savedDog = event.detail)} />
</article>
