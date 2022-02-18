<script>
    import BreedList from './BreedList.svelte';
    import SelectedBreeds from './SelectedBreeds.svelte';

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    import { selectedBreeds } from "./store.js";

    function defaultDog() {
        return {
            name: "",
            breeds: [],
        };
    }

    let dog = defaultDog();

    function newDog() {
        dog.breeds = $selectedBreeds
        dispatch("new-dog", dog);
        dog = defaultDog();
    }
</script>

<article>
    <h2>Register dog</h2>
    <section class="mb-3 row">
        <label class="col-sm-2 col-form-label" for="name">Name:</label>
        <div class="col-sm-10">
            <input class="form-control" type="text" id="name" bind:value={dog.name} />
        </div>
    </section>
    <section class="row">
        <div class="col-sm-6">
            <h3>Select the breed(s) of the dog</h3>
            <div class="selector">
                <BreedList />
            </div>
        </div>
        <div class="col-sm-6">
            <h3>Selected breeds:</h3>
            <div class="selector">
                <SelectedBreeds />
            </div>
        </div>
    </section>
    <section class="row justify-content-center">
        <button class="btn btn-success col-6" type="submit" on:click|preventDefault={newDog}>Save!</button>
    </section>
</article>

<style>
    .selector {
        height: 12em;
        overflow-y: scroll;
        margin-bottom: .3em;
    }
    label {
        font-size: 1.4em;
    }
</style>
