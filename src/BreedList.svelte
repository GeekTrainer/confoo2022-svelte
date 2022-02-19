<script>
    export let selected = false;
    export let emptyMessage = '';

    import { breeds } from "./store.js";

    $: displayBreeds = $breeds
        .filter((b) => b.selected === selected)
        .sort((lhs, rhs) => lhs.name < rhs.name);

    function toggleSelected(breed) {
        breed.selected = !breed.selected;
        $breeds = [...$breeds];
    }
</script>

<ul class="list-group">
    {#each displayBreeds as breed}
        <button
            type="button"
            class="list-group-item"
            on:click={() => toggleSelected(breed)}>
            {breed.name}
        </button>
    {:else}
        <li class="list-group-item">{emptyMessage}</li>
    {/each}
</ul>
