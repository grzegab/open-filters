import { defineStore } from "pinia"

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTION',
  'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
}

export const useFormStore = defineStore("form", {
  state: () => ({
    searchName: '',
    searchLastname: '',
    searchEmail: '',
    sex: '',
    childrenCount: '',
    checkedComputer: true,
    checkedCar: false,
    checkedFish: false,
    earningCount: '',
    earningSelector: '',
    serviceCount: '',
    yearsOfServiceSelector: '',
    filterOutput: '',
    filterInput: 'Select a person who has a fish and a car without computer. ' +
      'He is a male who has to earn more than 5000 a year and have at least 3 children.' +
      'It would be best if his name is Jon Doe, and emails starts with boogyboogy@ and at least 50 years of service',
  }),
  actions: {
    async explainFilters() {
      let url = import.meta.env.VITE_BACKEND + "/getFilters"
      fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          message: {
            "name": this.searchName,
            "last name": this.searchLastname,
            "email": this.searchEmail,
            "sex": this.sex,
            "children count": this.childrenCount,
            "has computer": this.checkedComputer,
            "has car": this.checkedCar,
            "has fish": this.checkedFish,
            "earning": this.earningCount,
            "earning selector": this.earningSelector,
            "years of service": this.serviceCount,
            "years of service selector": this.yearsOfServiceSelector,
          },
        })
      }).then((response) => {
        return response.json();
      }).then((data) => {
        this.filterOutput = data.body
      })
    },
    async updateFilterOptions() {
      let url = import.meta.env.VITE_BACKEND + "/setFilters"

      fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          message: this.filterInput,
        })
      }).then((response) => {
        /* returns a promise that can be utilized using `then() */
        return response.json();
      }).then((data) => {
        const result = JSON.parse(data.data)
        for (const [key, value] of Object.entries(result)) {
          if (key.includes("name")) {
            this.searchName = value
          }

          if (key.includes("lastname")) {
            this.searchLastname = value
          }

          if (key.includes("email")) {
            for (const [emailKey, emailValue] of Object.entries(value)) {
              this.searchEmail = emailValue
            }
          }

          if (key.includes("car")) {
            this.checkedCar = value
          }

          if (key.includes("fish")) {
            this.checkedFish = value
          }

          if (key.includes("computer")) {
            this.checkedComputer = value
          }

          if (key.includes("sex") || key === 'sex') {
            if (value === 'male' || value === 'Male') {
              this.checkedComputer = 'Male'
            } else if (value === 'female' || value === 'Female') {
              this.checkedComputer = 'Female'
            } else {
              this.checkedComputer = 'No idea'
            }
          }

          if (key.includes("children")) {
            if (value.value <= 0){
              this.childrenCount = '0';
            }

            if (value.value === 1){
              this.childrenCount = '1';
            }

            if (value.value === 2){
              this.childrenCount = '2';
            }

            if (value.value === 3){
              this.childrenCount = '3';
            }

            if (value.value === 4){
              this.childrenCount = '4';
            }

            if (value.value >= 5){
              this.childrenCount = '5+';
            }
          }

          if (key.includes("earning")) {
            for (const [earningsKey, earningsValue] of Object.entries(value)) {
              if (value.selector === 'more than' || value.selector === '>') {
                this.earningSelector = 'More than'
              }

              if (value.selector === 'less than' || value.selector === '<') {
                this.earningSelector = 'Less than'
              }

              if (earningsKey === 'value') {
                this.earningCount = earningsValue
              }
            }
          }

          if (key.includes("service") || key.includes("Service")) {
            for (const [serviceKey, serviceValue] of Object.entries(value)) {
              if (value.selector === 'more than' || value.selector === '>' || value.selector === 'more or equal') {
                this.yearsOfServiceSelector = 'More than'
              }

              if (value.selector === 'less than' || value.selector === '<' || value.selector === 'less or equal') {
                this.yearsOfServiceSelector = 'Less than'
              }

              if (serviceKey === 'value') {
                this.serviceCount = serviceValue
              }
            }
          }
        }
      })
    }
  },
})
