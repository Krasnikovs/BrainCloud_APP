<template>
  <div>
    <main class="main">
      <section class="login">
        <form @submit.prevent="login()" class="login-container">
          <div class="logo">
            <img src="~assets/svg/Brain.svg" alt="logo">
            <h3 class="brain-cloud">BrainCloud</h3>
          </div>
          <span class="sign-in">Sign in</span>
          <div class="input-container">
            <input v-model="userData.email" class="login-input" type="text" placeholder=" ">
            <label class="login-label">Email</label>
          </div>
          <div class="input-container">
            <input v-model="userData.password" class="login-input" type="password" placeholder=" ">
            <label class="login-label">Password</label>
          </div>
          <div class="login-other-options">
            <NuxtLink to="/auth/register">Create account</NuxtLink>
            <NuxtLink to="/auth/forgot_password">Forgot password?</NuxtLink>
          </div>
          <button class="login-button">Login</button>
        </form>
      </section>
      <aside class="fancy-aside">
        <img class="svg-element" src="~assets/svg/login_page_photo.svg">
      </aside>
    </main>
    <div class="popup-container">
      <Popup
        v-for="(pop, index) in $store.state.popups"
        :key="index"
        :popupId="pop.popupId"
        :popupType="pop.popupType"
        :popupText="pop.popupText"
        :popupShowTime="pop.popupShowTime + index / 2"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      userData: {
        email: '',
        password: ''
      },
    }
  },
  methods: {
    async login () {
      this.$auth.options.redirect = false
      await this.$auth.loginWith('local', { data: this.userData }).then((res) => {
        this.$auth.strategy.token.set(res.data.access_token)
        this.$auth.strategy.token.sync()
        this.$auth.setUser(res.data.user)
        setTimeout(() => {
          location.reload()
        },1000)
      }).catch((err) => {
        this.$store.commit('setPopup', {
          text: 'Incorrect password or email',
          type: 'danger',
          seconds: 5
        })
      })
    }
  }
}
</script>

<style scoped>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Alata';
  color: white;
}

.popup-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 50px;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 50px;
  width: fit-content;
  scrollbar-color: #484C54 #00000000;
  scrollbar-width: thin;
}

.main {
  display: flex;
  height: 100%;
}

.logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo > img {
  width: 75%;
  margin-bottom: 5px;
}

.fancy-aside {
  position: relative;
  margin-top: 25vh;
  width: 80%;
  display: flex;
  justify-content: center;
}

.svg-element {
  position: absolute;
  top: 50%;
  user-select: none;
  pointer-events: none;
  margin-left: 5rem;
  width: 45%;
  height: auto;
}

.login {
  width: 100%;
}

.login-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background-color: #2b2e32;
  width: 30rem;
  height: 27rem;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 4px #202020;
}

.brain-cloud {
  margin: 0;
  font-size: 32px;
}

.sign-in {
  margin: 1.5rem 0;
  font-size: 32px;
}

.input-container {
  position: relative;
  width: 70%;
  margin-bottom: 1.5rem;
}

.login-input {
  width: 100%;
  padding-bottom: 10px;
  border: none;
  border-bottom: 1px solid #5b5d60;
  background-color: transparent;
  outline: none;
  transition: 0.3s;
  color: white;
  position: relative;
  font-size: 16px;

}

.login-input:focus {
  border-bottom: 1px solid white;
}

.login-input:focus ~ .login-label,
.login-input:not(:placeholder-shown) ~ .login-label {
  top: -18px;
  font-size: 12px;
  color: #5b5d60;
}

.login-label {
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.3s;
  font-size: 16px;
  user-select: none;
  pointer-events: none;
}

.login-other-options {
  display: flex;
  width: 70%;
  justify-content: space-between;
  margin-bottom: 20px;
}

.login-other-options > a {
  text-decoration: none;
  cursor: pointer;
  font-size: 16px;
  transition: 0.1s;
}
.login-other-options > a:hover {
  color: #6C63FF;
}

.login-button {
  background-color:#484c54;
  border-radius: 15px;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  text-align: center;
  padding: 5px 30px;
  transition: .2s;
}

.login-button:hover {
  background-color: #2b2e32;
  outline: 2px solid #6C63FF;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

@media only screen and (max-width: 1300px) {
  .svg-element {
    display: none;
  }
}

</style>
