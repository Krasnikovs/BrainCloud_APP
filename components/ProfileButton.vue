<template>
  <div class="profile-button">
    <img :src="$auth.$state.user.data.image" @click="isOpenedProfile = !isOpenedProfile">
    <div v-show="isOpenedProfile" class="user-profile-dropdown">
      <div class="profile-dropdown-data">
        <img :src="$auth.$state.user.data.image">
        <div>
          <h3>{{ $auth.$state.user.data.name }}</h3>
          <h4>{{ $auth.$state.user.data.email }}</h4>
          <h4>{{ $auth.$state.user.data.free_space }}</h4>
          <progress id="file" :value="userSpaceData.usedSpace" :max="userSpaceData.maxSpace" />
        </div>
      </div>
      <div class="profile-dropdown-buttons">
        <NuxtLink to="/settings"><img src="~/assets/svg/Settings.svg">Account settings</NuxtLink>
        <a @click="logout()">Logout</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileButton",
  auth: true,
  data () {
    return {
      isOpenedProfile: false,
      user: this.$auth.$state.user,
      isFetchUserTimeout: false,
      userSpaceData: {
        'usedSpace': 0,
        'maxSpace': 0
      }
    }
  },
  mounted() {
    const usersUsedSpace = this.$auth.$state.user.data.free_space.split(' / ')
    const usersMaxSpace = usersUsedSpace[1].split(' ')
    this.userSpaceData.usedSpace = parseFloat(usersUsedSpace[0])
    this.userSpaceData.maxSpace = parseInt(usersMaxSpace[0])
  },
  updated() {
    if (!this.isFetchUserTimeout) {
      this.isFetchUserTimeout = true
      setTimeout(() => {
        this.isFetchUserTimeout = false
      }, 5000)
      this.$auth.fetchUser()
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
      await this.$router.push('/auth/login')
    }
  }
}
</script>

<style scoped>
.profile-button {
  position: relative;
  padding-right: 60px;
}

.profile-button > img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
}

.user-profile-dropdown {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 37px;
  left: -250px;
  background-color: #2B2E32;
  gap: 10px;
  padding: 10px 50px;
  border-radius: 15px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  font-family: Alata;
}

.profile-dropdown-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.profile-dropdown-data > img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 50%;
}

.profile-dropdown-data > div > h3 {
  color: white;
}

.profile-dropdown-data > div > h4 {
  color: #ffffff99;
}

.profile-dropdown-data > div > h3,
.profile-dropdown-data > div > h4 {
  font-weight: lighter;
  margin: 0;
}

.profile-dropdown-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.profile-dropdown-buttons > div {
  display: flex;
}

.profile-dropdown-buttons > a,
.profile-dropdown-buttons > a {
  display: flex;
  gap: 5px;
  padding: 10px 15px;
  border-radius: 15px;
  background-color: #5B5D62;
  text-decoration: none;
  color: white;
  cursor: pointer;
}
</style>
