<script>
    export let filterStatus = false;
    export let message = '';

    import { breeds } from "./store.js";

    $: displayBreeds = $breeds
        .filter((b) => b.selected === filterStatus)
        .sort((lhs, rhs) => lhs.name < rhs.name);

    function toggleSelection(breed) {
        breed.selected = !breed.selected;
        $breeds = [...$breeds]
    }
</script>

<ul class="list-group">
    {#each displayBreeds as breed (breed.name)}
        <button
            class="list-group-item"
            on:click={() => toggleSelection(breed)}
            >{breed.name}</button
        >
    {:else}
        <li class="list-group-item">{message}</li>
    {/each}
</ul>
