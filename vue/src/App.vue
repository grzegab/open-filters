<script setup>
import FormInputsExamples from "@/components/form.vue";
import AiInput from "@/components/sft.vue";
import AiDescribeFilter from "@/components/tft.vue";
</script>

<template>

  <div class="container is-fluid is-3 mt-5">
    <p class="title is-1">Open filters <a href="https://github.com/grzegab/open-filters" target="_blank">
      <button class="button is-link">Github page</button>
    </a></p>
    <p>Request may take some time, i didn't add loading bar o please be patient</p>
    <div class="columns">
      <div class="column">
        <div class="box m-5 pt-3">
          <AiInput/>
        </div>
      </div>
      <div class="column">
        <div class="box m-5 pt-3">
          <FormInputsExamples/>
        </div>
      </div>
      <div class="column">
        <div class="box m-5 pt-3">
          <AiDescribeFilter/>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css";
</style>
