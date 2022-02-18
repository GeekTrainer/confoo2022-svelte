<script>
    import BreedList from "./BreedList.svelte";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    import { breeds } from "./store.js";

    async function loadBreeds() {
        const response = await fetch("http://localhost:3000/api/breeds");
        const json = await response.json();
        $breeds = json.map((b) => ({...b, selected: false}));
    }

    function defaultDog() {
        return {
            name: "",
            breeds: [],
        };
    }

    let dog = defaultDog();

    function newDog() {
        dog.breeds = $breeds.map((b) => {b.name});
        dispatch("new-dog", dog);
        dog = defaultDog();
    }
</script>

<article>
    <h2>Register dog</h2>
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
            <div>Loading breeds...</div>
        {:then}
            <div class="col-sm-6">
                <h3>Select the breed(s) of the dog</h3>
                <div class="selector">
                    <BreedList filterStatus={false} message="All breeds selected" />
                </div>
            </div>
            <div class="col-sm-6">
                <h3>Selected breeds:</h3>
                <div class="selector">
                    <BreedList filterStatus={true} message="Please select a breed from the left" />
                </div>
            </div>
        {/await}
    </section>
    <section class="row justify-content-center">
        <button
            class="btn btn-success col-6"
            type="submit"
            on:click|preventDefault={newDog}>Save!</button
        >
    </section>
</article>

<style>
    .selector {
        overflow-y: scroll;
        overflow-x: hidden;
        height: 12em;
    }
    .row {
        margin-bottom: .1em;
    }
</style>
