<script setup>
import { useFormStore } from "@/stores/form.js";

const store = useFormStore()
function clearText() {
  store.filterInput = ''
}
</script>

<template>
  <h2 class="title">Set Filters Text (SFT)</h2>
  <h3 class="subtitle">This text will set up all filters</h3>
  <div class="field">
    <label class="label">Enter what filter need to be set below</label>
    <div class="control">
      <textarea v-model="store.filterInput" placeholder="Text to set filters to ..." class="textarea"></textarea>
    </div>
  </div>

  <div class="field is-grouped">
    <div class="control">
      <button class="button is-primary" @click="store.updateFilterOptions">Submit</button>
    </div>
    <div class="control">
      <button class="button is-link is-light" @click="clearText">Cancel</button>
    </div>
  </div>
</template>