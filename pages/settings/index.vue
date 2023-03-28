<template>
  <div class="container">
    <form class="set_form">
      <div>
        <h1 class="title">Account Settings</h1>
        <div class="main_info">
          <img :src="user.image" class="profile_image">
          <div>
            <h2>{{ user.name }}</h2>
            <h4>{{ user.email }}</h4>
          </div>
        </div>
      </div>
      <div>
        <NuxtLink class="buttons" to="/settings/profile">Personal Data</NuxtLink>
        <NuxtLink class="buttons" to="/settings">Subscriptions</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "index",
  layout: 'UserNavigationBar',
  auth: true,
  data () {
    return {
      user: this.$auth.$state.user.data
    }
  },
  mounted() {
    console.log(this.user)
  }
}
</script>

<style scoped>
*{
  font-family: Alata;
  font-weight: normal;
}

body {
  background: #36363F;
}

.container {
  display: flex;
}

.set_form {
  color: white;
  background-color: #2B2E32;
  display: flex;
  justify-content: center;
  margin-inline: auto;
  width: 600px;
  margin-top: 200px;
  padding: 10px;
  border-radius: 15px;
  flex-direction: column;
  gap: 25px;
  border: solid 1px #2B2E32 ;
}

.title {
  text-align: center;
}

.profile_image {
  margin-top: 15px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.main_info > div > h2, .main_info > div > h4 {
  margin: 0;
}

.main_info > div > h4 {
  color: #ffffff99;
}

.main_info {
  gap: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttons, .buttons {
  font-size: 24px;
  width: 239px;
  height: 40px;
  color: white;
  background-color: #484C54;
  border: none;
  border-radius: 15px;
  display: flex;
  margin-top: 10px;
  margin-inline: auto;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;
}

.buttons:hover,
.buttons:hover {
  background-color: #2b2e32;
  outline: 2px solid #6C63FF;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
</style>
