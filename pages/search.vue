<template>
<div class="tc-w-screen tc-h-screen fade-white tc-flex tc-flex-col tc-items-center tc-justify-between tc-overflow-hidden">
  <div class="tc-w-full h-10 tc-border-dashed border-white-300 tc-border-b tc-flex tc-flex-row tc-items-center tc-justify-between purple-bg z-30 tc-border-box lg:tc-px-5 sm:tc-px-2 tc-px-2">
    <nuxt-link to="/"><img src="~@/assets/images/brand/logo.png" alt="Gitty logo" width="42px" class=""></nuxt-link>

    <div class="tc-flex tc-flex-row items-center">
      <input type="username" class="w-mid-grid tc-mr-2 tc-flex tc-flex-col text-center tc-items-center tc-justify-center tc-box-border sub-text tc-px-5" placeholder="e.g. GeekyADAMS" v-model="user" @keyup.enter="researchUser()" />

      <button type="search" class="tc-border-0 tc-outline-0 searchBtn tc-rounded-lg tc-px-2 matte-bg" @click.prevent="researchUser()">
        <img src="~@/assets/images/icons/search.png" alt="" width="16px" class="" v-if="searchStatus === 'search'">
        <div class="lds-dual-ring" v-if="searchStatus === 'searching'" style="margin: 0"></div>
      </button>
    </div>

  </div>

  <div class="h-85 lg-w-90p w-90p tc-flex tc-flex-row tc-justify-between z-30">
    <nav class="w-25p h-fit tc-bg-white lg:tc-flex tc-hidden round-50 tc-overflow-hidden poppins tc-font-medium">
      <ul class="tc-w-full">
        <li :class="{'tc-w-full tc-flex tc-flex-row tc-justify-center tc-px-5 tc-py-2 nav-options tc-cursor-pointer hover:tc-text-white': true, 'purple-bg tc-text-white': option.active, 'tc-bg-white fade-text': !option.active}" v-for="(option, index) in searchOptions" :key="index" @click="checkAvailabilty(index)">
          <p class="poppins">{{option.text}}</p>
        </li>
      </ul>
    </nav>

    <div class="w-70p sm-w100p tc-bg-white h-95p tc-rounded-lg tc-flex tc-flex-col poppins tc-border-box tc-p-5">
      <p class="tc-font-bold fade-text sub-text">{{totalCount |  toFormattedDigit}} Users</p>

      <div class="tc-flex tc-flex-col tc-w-full tc-mt-3 h-60 tc-overflow-y-auto tc-items-center">
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
                <p class="smaller-text tc-font-normal matte tc-mt-1 tc-opacity-50">ID: 1362839</p>
              </div>
            </div>

            <div class="tc-flex tc-flex-col ml-auto h-100p tc-justify-between">
              <div class="tc-flex tc flex-row tc-mt-4 lg:tc-mt-0">
                <div class="tc-flex flex-row tc-mr-5 tc-items-center">
                  <img src="~@/assets/images/icons/followers.svg" alt="followers" width="18px" class="tc-mr-1">
                  <p class="tc-font-normal matte small-text">{{user.followers}} Followers</p>
                </div>

                <div class="tc-flex flex-row tc-mr-5 tc-items-center">
                  <img src="~@/assets/images/icons/repos.svg" alt="followers" width="18px" class="tc-mr-1">
                  <p class="tc-font-normal matte small-text">{{user.public_repos}} Repos</p>
                </div>
              </div>

              <a :href="user.html_url" target="_blank" rel="noopener noreferrer" class="ml-auto"><button class="tc-rounded-full tc-font-medium poppins tc-py-2 tc-px-5 tc-cursor-pointer clickable-2 hoverable profile-btn tc-mt-8">
                  Go to profile
                </button></a>
            </div>
          </div>
        </div>

        <img src="~@/assets/images/illustrations/Github4O4.png" alt="No Results Found" width="250px" class="tc-mt-5" v-if="!totalCount && (searchStatus != 'searching')">
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
      users: [3, 4, 2, 4, 5, 3, 2],
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
      totalCount: 0
    }
  },
  computed: {
    searchResults() {
      return this.$store.state.searchResults
    }
  },
  filters: {
    toFormattedDigit(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },
  methods: {
    checkAvailabilty(index) {
      if (!this.searchOptions[index].active) {
        this.showError('Feature Coming Soon !')
      }
    },
    researchUser() {
      if (this.user) {
        this.page = 1
        this.searchUser(this.user, this.page)

        this.$router.push({
          path: '/search',
          query: {
            q: this.user,
            p: this.page
          }
        })

      }
    },
    showEmpty() {

    },
    async searchUser(q, p) {
      const searchTerm = q
      if (searchTerm) {
        this.searchStatus = 'searching'

        try {
          let response = await Request.getRequest(`/search/users?q=${q}&per_page=10&page=${p}`)

          if ([200, 201].includes(response.status)) {

            if (response.data.items.length === 0) {
              this.showError(`Zero (0) results found for ${searchTerm}.`)
              this.searchStatus = 'search'
              this.showEmpty()
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
          this.showError('Error fetching data. Please check yoour internet connection.')
          this.showEmpty()
          console.log(e)
          this.searchStatus = 'search'
        }
        return
      }

      this.showError('Please enter a valid name')
    }
  },
  created() {},
  mounted() {
    this.totalCount = this.$store.state.totalResultCount
    if (!this.searchResults.length) {
      this.searchUser(this.$route.query.q, this.$route.query.p)
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
  color: #9966FF;
  border: 1px dashed #9966FF;
}

.card:hover .profile-btn {
  background: #9966FF;
  color: white;
}

.card {
  border: .4px solid rgb(153, 102, 255, .8);
  border-radius: 15px;
}

.card:hover {
  box-shadow: 8px 12px 34px rgba(0, 0, 0, .1)
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
