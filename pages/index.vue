<template>
<div class="container tc-bg-no-repeat tc-w-screen tc-h-screen max-h-screen tc-bg-cover tc--ml-1 tc-overflow-hidden">
  <!-- <div class="cursor">
    <div class="cursor__ball cursor__ball--big ">
      <svg height="30" width="30">
        <circle cx="15" cy="15" r="12" stroke-width="0"></circle>
      </svg>
    </div>

    <div class="cursor__ball cursor__ball--small">
      <svg height="10" width="10">
        <circle cx="5" cy="5" r="4" stroke-width="0"></circle>
      </svg>
    </div>
  </div> -->

  <div class="tc-w-full tc-h-16 tc-border-dashed border-white-500 tc-border-b tc-flex tc-flex-row tc-items-center">
    <img src="~@/assets/images/brand/logo.png" alt="" width="42px" class=" tc-ml-5">
  </div>

  <div class="tc-w-full tc-flex tc-flex-col tc-items-center tc-justify-center tc-mt-20 poppins tc-text-white tc-z-20">
    <h1 class="tc-text-white tc-font-bold header">Gitty</h1>
    <p class="sub-text tc-mt-5 tc-font-medium text-center">Search for Github users and more</p>

    <input type="username" class="tc-mt-10 w-mid-grid tc-ml-2 tc-flex tc-flex-col text-center tc-items-center tc-justify-center tc-font-bold tc-box-border sub-text tc-px-5" placeholder="e.g GeekyADAMS" v-model="user" />

    <button type="submit" class="tc-mt-16 tc-round searchBtn tc-font-bold poppins tc-py-2 tc-px-5 tc-cursor-pointer clickable-2 tc-ml-2 hoverable" @click.prevent="searchUser">
      {{searchBtnText}}
    </button>

  </div>

  <div class="bg-lines">
    <div class="lines__line"></div>
    <div class="lines__line"></div>
    <div class="lines__line"></div>
    <div class="lines__line"></div>
    <div class="lines__line"></div>
    <div class="lines__line"></div>
  </div>
</div>
</template>

<script>
import Request from '@/util/httpRequestUtils.js'

export default {
  data() {
    return {
      searchBtnText: 'SEARCH',
      user: ''
    }
  },
  methods: {
    async searchUser() {
      if (this.user) {

        let response = await Request.getRequest(`/users?q=${this.user}`)

        console.log(response)

        // this.$router.push({
        //   path: '/search',
        //   query: {
        //     q: this.user
        //   },
        // })
      }
    }
  }
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
  background: #9765FB;
  outline: none;
  z-index: 30;
}
</style>
