<template>
<div class="container tc-bg-no-repeat tc-w-screen tc-h-screen max-h-screen tc-bg-cover tc--ml-1 tc-overflow-hidden md:tc-h-auto">

  <div class="tc-w-full tc-h-16 tc-border-dashed border-white-500 tc-border-b tc-flex tc-flex-row tc-items-center">
    <img src="~@/assets/images/brand/logo.png" alt="" width="42px" class=" tc-ml-5">
  </div>

  <div class="tc-w-full tc-flex tc-flex-col tc-items-center tc-justify-center tc-mt-20 poppins tc-text-white tc-z-20">
    <h1 class="tc-text-white tc-font-bold header">Gitty</h1>
    <p class="sub-text tc-mt-5 tc-font-medium text-center">Search for Github users and more</p>

    <input type="username" class="tc-mt-10 w-mid-grid tc-ml-2 tc-flex tc-flex-col text-center tc-items-center tc-justify-center tc-font-bold tc-box-border sub-text tc-px-5" placeholder="e.g GeekyADAMS" v-model="user" @keyup.enter="searchUser" />

    <button type="submit" class="tc-mt-16 tc-round searchBtn tc-font-bold tc-flex tc-flex-row tc-items-center tc-justify-center poppins tc-py-2 tc-px-5 tc-cursor-pointer clickable-2 tc-ml-2 hoverable" @click.prevent="searchUser">
      <span>{{btnText}}</span>
      <div class="lds-dual-ring" v-if="btnText === 'SEARCHING'"></div>
    </button>

  </div>

  <alert :message="errMessage" v-show="errMessage" class=" tc-fixed tc-bottom-0 tc-mr-3 tc-mb-3 tc-right-0 z-100" />

  <bg-lines />
</div>
</template>

<script>
import Request from '@/util/httpRequestUtils.js'
import alert from '@/mixins/alert'

export default {
  mixins: [alert],
  data() {
    return {
      user: '',
      errMessage: null,
      btnText: 'SEARCH'
    }
  },
  methods: {
    async searchUser() {
      if (this.user) {
        this.btnText = 'SEARCHING'

        try {
          let response = await Request.getRequest(`/search/users?q=${this.user}&per_page=10`)

          if ([200, 201].includes(response.status)) {

            if (response.data.items.length === 0) {
              this.showError(`Zero (0) results found for ${this.user}.`)
              this.btnText = 'SEARCH'
              return
            }

            for (let i = 0; i < response.data.items.length; i++) {
              let req = await Request.getRequest(`/users/${response.data.items[i].login}`)
              response.data.items[i] = req.data
              if (response.data.items[i].bio) {
                response.data.items[i].bio = response.data.items[i].bio.substring(0, 35)
              }
            }

            await this.$store.dispatch('storeSearchResults', response.data)

            this.$router.push({
              path: '/search',
              query: {
                q: this.user,
                p: 1
              },
            })
          }
        } catch (e) {
          this.showError('Error fetching data. Please try again.')
          console.log(e)
          this.btnText = 'SEARCH'
        }
        return
      }

      this.showError('Please enter a valid name')
    }
  },
}
</script>

<style scoped>
.container {
  background: url('~assets/images/background/purple-bg.svg');
}

input {
  height: 3.5rem;
  background: rgba(255, 255, 255, .3);
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  border-radius: 25px;
  z-index: 30;
  text-align: center;
  border: 0;
  outline: none;
}

input::placeholder {
  color: white;
  text-align: center;
}

.searchBtn {
  border-radius: 50px;
  color: #FBC3C6;
  border: 3px solid #FBC3C6;
  background: var(--purple);
  outline: none;
  z-index: 30;
}

.z-100 {
  z-index: 100;
}
</style>
