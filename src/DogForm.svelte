<script>
    import BreedList from "./BreedList.svelte";

    function defaultDog() {
        return {
            name: "",
            breeds: [],
        };
    }
    let dog = defaultDog();

    import { breeds } from "./store.js";

    async function loadBreeds() {
        const response = await fetch("http://localhost:3000/api/breeds");
        const json = await response.json();

        $breeds = json.map((b) => ({ ...b, selected: false }));
    }

    $: isValid = dog.name && $breeds.filter(b => b.selected).length > 0;

    import { createEventDispatcher } from "svelte";
    const dispatcher = createEventDispatcher();

    function saveDog() {
        dog.breeds = $breeds
            .filter((b) => b.selected)
            .map((b) => ({ name: b.name }));
        dispatcher("save-dog", dog);
        dog = defaultDog();
    }
</script>

<h2>Register dog</h2>
<form on:submit|preventDefault={saveDog}>
    <section class="mb-3 row">
        <label class="col-sm-2 col-form-label" for="name">Name:</label>
        <div class="col-sm-10">
            <input
                class="form-control"
                type="text"
                id="name"
                bind:value={dog.name}
            />
        </div>
    </section>
    <section class="row">
        {#await loadBreeds()}
            Loading, please wait...
        {:then}
            <section class="col">
                <h3>Select the breed(s)</h3>
                <section class="breed-list">
                    <BreedList
                        selected={false}
                        emptyMessage="All breeds selected"
                    />
                </section>
            </section>
            <section class="col">
                <h3>Selected breed(s)</h3>
                <section class="breed-list">
                    <BreedList
                        selected={true}
                        emptyMessage="Please select a breed from the left"
                    />
                </section>
            </section>
        {/await}
    </section>
    <section class="row justify-content-center">
        <button
            type="submit"
            class="btn btn-success col-6"
            disabled={!isValid}>Save!</button
        >
    </section>
</form>

<style>
    label {
        font-size: 1.5em;
    }
    .breed-list {
        overflow-y: scroll;
        height: 14em;
    }
</style>
