<template>
  <div>
    <div id="navigation-bar">
      <div class="navigation-bar-horizontal">
        <div @click="$router.push('/home')" class="navigation-bar-title">
          <img src="~assets/svg/Brain.svg">
          <h3>Brain Cloud</h3>
        </div>
        <div class="navigation-buttons">
          <NuxtLink to="/home">Home</NuxtLink>
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
  name: 'UserNavigationBar',
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

.navigation-buttons {
  margin-right: 130px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  gap: 50px;
  color: white;
}

.navigation-buttons > a {
  text-decoration: none;
  color: white;
  font-size: 24px;
  font-family: Alata;
  transition: 0.2s;
  cursor: pointer;
}

.navigation-buttons > a:hover {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
}
</style>
