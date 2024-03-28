<script setup>
import { useFormStore } from '@/stores/form.js'

const store = useFormStore()
</script>

<template>
  <h2 class="title">Filters Selection (FS)</h2>
  <h3 class="subtitle">No data is kept, it is only processed by OpenAI!</h3>
  <div class="grid is-col-min-12 column-gap-5 row-gap-7">
    <div class="cell">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Search name" v-model="store.searchName">
        </div>
      </div>
    </div>
    <div class="cell">
      <div class="field">
        <label class="label">Last name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Search lastname" v-model="store.searchLastname">
        </div>
      </div>
    </div>
    <div class="cell is-col-min-15">
      <div class="field">
        <label class="label">Fake Email</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input is-info" type="email" placeholder="Do not enter real email" v-model="store.searchEmail">
        </div>
      </div>
    </div>
    <div class="cell">
      <label class="label">Select SEX</label>
      <div class="control">
        <div class="select is-info">
          <select v-model="store.sex">
            <option>No idea</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
      </div>
    </div>
    <div class="cell">
      <label class="label">Select Children count</label>
      <div class="control">
        <div class="select is-info">
          <select v-model="store.childrenCount">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5+</option>
          </select>
        </div>
      </div>
    </div>
    <div class="cell">
      <label class="label">Own a computer?</label>
      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" id="computer" v-model="store.checkedComputer">
            Has computer
          </label>
        </div>
      </div>
    </div>
    <div class="cell">
      <label class="label">Own a car?</label>
      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" id="car" v-model="store.checkedCar">
            Has car
          </label>
        </div>
      </div>
    </div>
    <div class="cell">
      <label class="label">Own a fish?</label>
      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" id="fish" v-model="store.checkedFish">
            Has fish
          </label>
        </div>
      </div>
    </div>
    <div class="cell">
      <div class="field">
        <label class="label">Year earnings</label>
        <div class="control">
          <div class="select">
            <select v-model="store.earningSelector">
              <option>More than</option>
              <option>Less than</option>
            </select>
          </div>
          <input class="input" type="text" placeholder="Enter earnings" v-model="store.earningCount">
        </div>
      </div>
    </div>
    <div class="cell">
      <div class="field">
        <label class="label">Years of service</label>
        <div class="control">
          <div class="select">
            <select v-model="store.yearsOfServiceSelector">
              <option>More than</option>
              <option>Less than</option>
            </select>
          </div>
          <input class="input" type="text" placeholder="Enter years of service" v-model="store.serviceCount">
        </div>
      </div>
    </div>
  </div>
</template>