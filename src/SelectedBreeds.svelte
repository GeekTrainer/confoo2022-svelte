<script>
    import { selectedBreeds } from "./store.js";

    function deselectBreed(breed) {
        $selectedBreeds = $selectedBreeds
            .filter((b) => b.name !== breed.name)
            .sort((lhs, rhs) => lhs.name < rhs.name);
    }
</script>

<ul class="list-group">
    {#each $selectedBreeds as breed (breed.name)}
        <button class="list-group-item" on:click={() => deselectBreed(breed)}>
            {breed.name}
        </button>
    {:else}
        <li class="list-group-item">No breed selected</li>
    {/each}
</ul>
