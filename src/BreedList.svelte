<script>
    let breeds = [];
    async function loadBreeds() {
        const response = await fetch("http://localhost:3000/api/breeds");
        const json = await response.json();
        breeds = json;
    }

    import { selectedBreeds } from "./store.js";

    $: displayBreeds = breeds
        .filter((breed) => !$selectedBreeds.find((b) => b.name === breed.name))
        .sort((lhs, rhs) => lhs.name < rhs.name);

    function selectBreed(breed) {
        $selectedBreeds = [...$selectedBreeds, breed];
    }
</script>

<ul class="list-group">
    {#await loadBreeds()}
        <li class="list-group-item">Loading breed list...</li>
    {:then}
        {#each displayBreeds as breed (breed.name)}
            <button class="list-group-item" on:click={() => selectBreed(breed)}>{breed.name}</button>
        {:else}
            <li class="list-group-item">No more breeds found</li>
        {/each}
    {/await}
</ul>
