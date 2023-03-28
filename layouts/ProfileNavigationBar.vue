<template>
  <div>
    <div id="navigation-bar">
      <div class="navigation-bar-horizontal">
        <div @click="$router.push('/profile')" class="navigation-bar-title">
          <img src="~assets/svg/Brain.svg">
          <h3>Brain Cloud</h3>
        </div>
        <ProfileButton />
      </div>
    </div>
    <div>
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileNavigationBar',
  data () {
    return {
      searchInput: ''
    }
  },
  mounted() {
    if (!this.$store.state.auth.loggedIn) {
      this.$router.push('/auth/login')
    }
  }
}
</script>

<style scoped>

#navigation-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.navigation-bar-horizontal {
  position: absolute;
  background-color: #484C54;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  width: 100%;
  z-index: 20;
  padding-left: 30px;
}

.navigation-bar-title {
  justify-content: flex-start;
  width: fit-content;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
}

.navigation-bar-title > img {
  width: 64px;
}

.navigation-bar-title > h3 {
  user-select: none;
  margin: 0;
  font-family: Alata;
  color: white;
  font-weight: normal;
  white-space: nowrap;
}
</style>
