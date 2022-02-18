<script>
	import DogForm from "./DogForm.svelte";

	let savedDog = null;

	function saveDog(event) {
		savedDog = {
			name: event.detail.name,
			breeds: event.detail.breeds.map(b => b.name).join(', ')
		}
	}
</script>

<main class="container">
	<h1>Cute dogs</h1>
	{#if savedDog}
	<section class="alert alert-success">
		<div><strong>Saved dog!</strong></div>
		<div>Name: {savedDog.name}</div>
		<div>Breeds: {savedDog.breeds}</div>
	</section>
	{/if}

	<DogForm on:new-dog={saveDog} />
</main>