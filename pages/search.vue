<template>
<div class="tc-w-screen tc-h-screen fade-white tc-flex tc-flex-col tc-items-center tc-justify-between tc-overflow-hidden">
  <div class="tc-w-full h-10 tc-border-dashed border-white-300 tc-border-b tc-flex tc-flex-row tc-items-center tc-justify-between purple-bg z-30 tc-border-box lg:tc-px-5 sm:tc-px-2 tc-px-2">
    <nuxt-link to="/"><img src="~@/assets/images/brand/logo.png" alt="Gitty logo" width="42px" class=""></nuxt-link>

    <div class="tc-flex tc-flex-row items-center">
      <input type="username" class="w-mid-grid tc-mr-2 tc-flex tc-flex-col text-center tc-items-center tc-justify-center tc-box-border sub-text tc-px-5" placeholder="e.g. GeekyADAMS" v-model="user" @keyup.enter="researchUser" />

      <button type="search" class="tc-border-0 tc-outline-0 searchBtn tc-rounded-lg tc-px-2 matte-bg" @click="researchUser">
        <img src="~@/assets/images/icons/search.png" alt="" width="16px" class="" v-if="searchStatus === 'search'">
        <div class="lds-dual-ring" v-if="searchStatus === 'searching'" style="margin: 0"></div>
      </button>
    </div>

  </div>

  <div class="h-85 lg-w-90p w-90p tc-flex tc-flex-row tc-justify-between z-30">
    <div class="tc-flex tc-flex-col w-25p lg:tc-flex tc-hidden">
      <nav class="tc-w-full h-fit tc-bg-white round-50 tc-overflow-hidden poppins tc-font-medium">
        <ul class="tc-w-full">
          <li :class="{'tc-w-full tc-flex tc-flex-row tc-justify-center tc-px-5 tc-py-2 nav-options tc-cursor-pointer hover:tc-text-white': true, 'purple-bg tc-text-white': option.active, 'tc-bg-white fade-text': !option.active}" v-for="(option, index) in searchOptions" :key="index" @click="checkAvailabilty(index)">
            <p class="poppins">{{option.text}}</p>
          </li>
        </ul>
      </nav>

      <div class="filters tc-w-full tc-h-64 tc-mt-10 tc-bg-white round-50 tc-p-4">
        <p class="sub-text tc-font-medium purple tc-mb-6">Filters</p>

        <div class="tc-flex tc-flex-row items-center tc-cursor-pointer tc-mb-3">
          <input type="radio" id="followers" name="filter" value="m-follow" v-model="filterTerm" @change="applyFilter">
          <label for="followers" class="tc-ml-4 matte tc-mt-1">Most followers</label>
        </div>

        <div class="tc-flex tc-flex-row items-center tc-cursor-pointer tc-mb-3">
          <input type="radio" id="l-followers" name="filter" value="l-follow" v-model="filterTerm" @change="applyFilter">
          <label for="l-followers" class="tc-ml-4 matte tc-mt-1">Least followers</label>
        </div>

        <div class="tc-flex tc-flex-row items-center tc-cursor-pointer tc-mb-3">
          <input type="radio" id="repositories" name="filter" value="m-repo" v-model="filterTerm" @change="applyFilter">
          <label for="repositories" class="tc-ml-4 matte tc-mt-1">Most repositories</label>
        </div>

        <div class="tc-flex tc-flex-row items-center tc-cursor-pointer tc-mb-3">
          <input type="radio" id="l-repositories" name="filter" value="l-repo" v-model="filterTerm" @change="applyFilter">
          <label for="l-repositories" class="tc-ml-4 matte tc-mt-1">Least repositories</label>
        </div>
      </div>
    </div>

    <div class="w-70p sm-w100p tc-bg-white h-95p tc-rounded-lg tc-flex tc-flex-col poppins tc-border-box tc-p-5">
      <p class="tc-font-bold fade-text sub-text">{{totalCount |  toFormattedDigit}} Users <span class="small-text tc-font-normal">/ showing {{searchResults.length}}</span></p>

      <div class="tc-flex tc-flex-col tc-w-full tc-mt-3 h-60 tc-overflow-y-scroll tc-items-center" style="border-top: .6px solid var(--purple); border-bottom: .6px solid var(--purple); border-radius: 15px;">
        <div class="tc-flex tc-flex-col tc-w-full h-fit">
          <div class="card tc-w-full tc-h-auto tc-mb-3 tc-bg-white tc-flex tc-flex-row tc-p-3 tc-border-box poppins tc-flex-wrap" v-for="(user, index) in searchResults" :key="index">
            <div class="tc-flex tc-flex-row ">
              <img :src="user.avatar_url" alt="profile picture" class="tc-rounded-full avatar tc-mr-4" draggable="false">

              <div class="tc-flex tc-flex-col">
                <p class="sub-text tc-font-medium purple">{{user.name}} ({{user.login}}) </p>
                <div class="tc-flex tc-flex-row tc-mt-1 tc-flex-wrap">
                  <p class="smaller-text tc-font-normal matte tc-opacity-50 tc-mr-5">{{user.location}}</p>
                  <a href="mailto:drkeeminc@gmail.com">
                    <p class="smaller-text tc-font-normal matte tc-opacity-50">{{user.email}}</p>
                  </a>
                </div>
                <p class="tc-font-normal matte tc-mt-2">{{user.bio}}...</p>
                <p class="smaller-text tc-font-normal matte tc-mt-1 tc-opacity-50">ID: {{user.id}}</p>
              </div>
            </div>

            <div class="tc-flex tc-flex-col ml-auto h-100p tc-justify-between">
              <div class="tc-flex tc flex-row tc-mt-4 lg:tc-mt-0 ml-auto">
                <div class="tc-flex flex-row tc-mr-5 tc-items-center">
                  <img src="~@/assets/images/icons/followers.svg" alt="followers" width="18px" class="tc-mr-1">
                  <p class="tc-font-normal matte small-text">{{user.followers}} Followers</p>
                </div>

                <div class="tc-flex flex-row tc-mr-5 tc-items-center">
                  <img src="~@/assets/images/icons/repos.svg" alt="followers" width="18px" class="tc-mr-1">
                  <p class="tc-font-normal matte small-text">{{user.public_repos}} Repos</p>
                </div>
              </div>

              <a :href="user.html_url" target="_blank" rel="noopener noreferrer" class="ml-auto tc-outline-none">
                <button class="tc-rounded-full tc-font-medium poppins tc-py-2 tc-px-5 tc-cursor-pointer clickable-2 hoverable profile-btn tc-mt-8 tc-outline-none">
                  Go to profile
                </button>
              </a>
            </div>
          </div>
        </div>

        <img src="~@/assets/images/illustrations/Github4O4.png" alt="No Results Found" width="250px" class="tc-mt-5" v-if="!totalCount && (searchStatus != 'searching')">
      </div>

      <div class="mt-auto tc-flex tc-flex-row tc-items-center tc-justify-between" v-if="numOfPages != 0">
        <div class="tc-flex tc-flex-row tc-items-center">
          <button class="tc-rounded-full tc-font-medium poppins tc-py-2 tc-px-4 tc-cursor-pointer clickable-2 hoverable paginate-btn tc-outline-none tc-flex tc-flex-row tc-items-center" @click="gotoPrevious"><span>Previous</span>
            <div class="lds-dual-ring" style="margin: 0" v-if="backing"></div>
          </button>
          <button class="tc-ml-3 tc-hidden lg:tc-flex purple tc-p-2" @click="gotoFirst">First</button>
        </div>

        <p>page {{$route.query.p}} <span class="purple"> of</span> {{numOfPages}}</p>

        <div class="tc-flex tc-flex-row tc-items-center">
          <button class="tc-hidden lg:tc-flex tc-mr-3 purple tc-p-2" @click="gotoLast">Last</button>
          <button class="tc-rounded-full tc-font-medium poppins tc-py-2 tc-px-4 tc-cursor-pointer clickable-2 hoverable paginate-btn tc-outline-none tc-flex tc-flex-row tc-items-center" @click="gotoNext"><span>Next</span>
            <div class="lds-dual-ring" style="margin: 0" v-if="nexting"></div>
          </button>
        </div>
      </div>
    </div>
  </div>

  <alert :message="errMessage" v-show="errMessage" class=" tc-fixed tc-bottom-0 tc-mr-3 tc-mb-3 tc-right-0 z-100" />

  <bg-lines-two />
</div>
</template>

<script>
import Request from '@/util/httpRequestUtils.js'
import alert from '@/mixins/alert'

import {
  mapState
} from 'vuex'

export default {
  mixins: [alert],
  data() {
    return {
      errMessage: null,
      user: '',
      page: 1,
      searchStatus: 'search',
      filterTerm: '',
      searchOptions: [{
          text: 'Users',
          icon: 'Icon',
          active: true,
        },
        {
          text: 'Repositories',
          icon: 'Icon',
          active: false,
        },
        {
          text: 'Commits',
          icon: 'Icon',
          active: false,
        },
        {
          text: 'Issues',
          icon: 'Icon',
          active: false,
        },
        {
          text: 'Packages',
          icon: 'Icon',
          active: false,
        }
      ],
      totalCount: 0,
      currentPage: 1,
      backing: false,
      nexting: false
    }
  },
  computed: {
    searchResults() {
      return this.$store.state.searchResults
    },
    numOfPages() {
      return Math.round(this.totalCount / 10)
    },
  },
  filters: {
    toFormattedDigit(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },
  watch: {
    '$route'() {
      this.searchUser(this.$route.query.q, this.$route.query.p, this.$route.query.s, this.$route.query.o)
    }
  },
  methods: {
    checkAvailabilty(index) {
      if (!this.searchOptions[index].active) {
        this.showError('Feature Coming Soon !')
      }
    },
    async gotoPrevious() {

      let currentPage = parseInt(this.$route.query.p)
      if (currentPage > 1) {
        this.backing = true
        await this.searchUser(this.$route.query.q, currentPage - 1, this.$route.query.s, this.$route.query.o)

        this.changePage(this.$route.query.q, currentPage - 1, this.$route.query.s, this.$route.query.o)
        this.backing = false
      }
    },
    async gotoNext() {
      let currentPage = parseInt(this.$route.query.p)
      if (currentPage < this.numOfPages) {
        this.nexting = true
        await this.searchUser(this.$route.query.q, currentPage + 1, this.$route.query.s, this.$route.query.o)

        this.changePage(this.$route.query.q, currentPage + 1, this.$route.query.s, this.$route.query.o)
        this.nexting = false
      }
    },
    async gotoFirst() {
      await this.searchUser(this.$route.query.q, 1, this.$route.query.s, this.$route.query.o)

      this.changePage(this.$route.query.q, 1, this.$route.query.s, this.$route.query.o)
    },
    async gotoLast() {
      await this.searchUser(this.$route.query.q, this.numOfPages - 1, this.$route.query.s, this.$route.query.o)

      this.changePage(this.$route.query.q, this.numOfPages - 1, this.$route.query.s, this.$route.query.o)
    },
    changePage(user, page, s, o) {
      this.$router.push({
        path: '/search',
        query: {
          q: user,
          p: page,
          s: s,
          o: o
        }
      })
    },
    async researchUser() {
      if (this.user) {
        this.page = 1
        await this.searchUser(this.user, 1, '', '')

        this.changePage(this.user, 1, '', '')
      }
    },
    async applyFilter() {
      if (!this.filterTerm) {
        await this.searchUser(this.$route.query.q, 1, '', '')

        this.changePage(this.$route.query.q, 1, '', '')
      }

      if (this.filterTerm === 'm-follow') {
        await this.searchUser(this.$route.query.q, 1, 'followers', 'desc')

        this.changePage(this.$route.query.q, 1, 'followers', 'desc')
      }

      if (this.filterTerm === 'l-follow') {
        await this.searchUser(this.$route.query.q, 1, 'followers', 'asc')

        this.changePage(this.$route.query.q, 1, 'followers', 'asc')
      }

      if (this.filterTerm === 'm-repo') {
        await this.searchUser(this.$route.query.q, 1, 'repositories', 'desc')

        this.changePage(this.$route.query.q, 1, 'repositories', 'desc')
      }

      if (this.filterTerm === 'l-repo') {
        await this.searchUser(this.$route.query.q, 1, 'repositories', 'asc')

        this.changePage(this.$route.query.q, 1, 'repositories', 'asc')
      }
    },
    async searchUser(q, p, s, o) {
      const searchTerm = q
      if (searchTerm) {
        this.searchStatus = 'searching'

        try {
          let response = await Request.getRequest(`/search/users?q=${q}&per_page=10&page=${p}&sort=${s}&order=${o}`)

          if ([200, 201].includes(response.status)) {

            if (response.data.items.length === 0) {
              this.showError(`Zero (0) results found for ${searchTerm}.`)
              this.searchStatus = 'search'

              return
            }

            for (let i = 0; i < response.data.items.length; i++) {
              let req = await Request.getRequest(`/users/${response.data.items[i].login}`)
              response.data.items[i] = req.data
              if (response.data.items[i].bio) {
                response.data.items[i].bio = response.data.items[i].bio.substring(0, 35)
              }
            }

            this.totalCount = response.data.total_count
            await this.$store.dispatch('storeSearchResults', response.data)
            this.searchStatus = 'search'
          }
        } catch (e) {
          this.showError('Error fetching data. Please try again.')

          console.log(e)
          this.searchStatus = 'search'
        }
        return
      }

      this.showError('Please enter a valid name')
    }
  },
  created() {
    if (process.browser) {
      let isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
        navigator.userAgent &&
        navigator.userAgent.indexOf('CriOS') == -1 &&
        navigator.userAgent.indexOf('FxiOS') == -1;

      if (isSafari) this.showError('If scroll display error on Safari, try Chrome Browser.')
    }

  },
  mounted() {
    this.totalCount = this.$store.state.totalResultCount
    if (!this.searchResults.length) {
      this.searchUser(this.$route.query.q, this.$route.query.p, this.$route.query.s, this.$route.query.o)
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 3.5rem;
  height: 3.5rem;
}

.profile-btn {
  color: var(--purple);
  border: 1px dashed var(--purple);
}

.paginate-btn {
  color: var(--matte);
  border: 1px dashed var(--purple);
}

.paginate-btn:hover,
.paginate-btn:active,
.paginate-btn:focus {
  color: white;
  background: var(--matte);
  outline: none;
}

.card:hover .profile-btn {
  background: var(--purple);
  color: white;
}

.card {
  border: .4px solid rgb(153, 102, 255, .8);
  border-radius: 15px;
}

.card:hover {
  box-shadow: 8px 12px 34px rgba(0, 0, 0, .1)
}

input:focus::-webkit-input-placeholder,
input:hover::-webkit-input-placeholder {
  color: transparent;
}

input {
  height: 2rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  z-index: 30;
  text-align: center;
  border: 0;
  outline: none;
}

input::placeholder {
  color: rgb(212, 212, 212);
  text-align: center;
}

.searchBtn {
  color: #FBC3C6;
  outline: none;
  z-index: 30;
}

.z-30 {
  z-index: 30;
}

.z-100 {
  z-index: 100;
}

.nav-options {
  border-top: .2px solid rgba(0, 0, 0, .05);
}

.nav-options:hover {
  background: rgba(153, 102, 255, .7);
}

nav {
  box-shadow: 0 22px 52px rgba(153, 102, 255, .1);
}
</style>
