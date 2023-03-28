<template>
  <main class="main">
    <seciton class="login">
      <div class="login-container">
        <div class="logo">
          <img src="~assets/svg/Brain.svg" alt="logo">
          <h3 class="brain-cloud">BrainCloud</h3>
        </div>
        <span class="forgot-password">Reset password</span>
        <div class="input-container">
          <input v-model="email" class="login-input" type="text" placeholder=" ">
          <label class="login-label">Email</label>
        </div>
        <button @click="resetPassword()" class="send-button">Send new password</button>
      </div>
    </seciton>
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
  </main>
</template>

<script>
export default {
  name: "forgot_password",
  auth: false,
  data () {
    return {
      email: ''
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push('/home')
    }
  },
  methods: {
    async resetPassword () {
      await this.$axios.post('/reset_password/', {'email': this.email}).then((res) => {
        alert(res.data.data)
      }).catch((e) => {
        for (let error in e.response.data.errors) {
          this.$store.commit('setPopup', {
            text: e.response.data.errors[error][0],
            type: 'danger',
            seconds: 5
          })
        }
      })
    }
  }
}
</script>

<style scoped>
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

*{
  box-sizing: border-box;
  font-family: Alata;
  color: white;
}

.main {
  display: flex;
  height: 100%;
}

.logo {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo > img {
  width: 75%;
  margin-bottom: 5px;
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
  /**justify-content: space-between;**/
  align-items: center;
  box-shadow: 0 4px 4px #202020;
}

.brain-cloud {
  margin-top: 0;
  font-size: 32px;
  font-weight: normal;
}

.forgot-password {
  margin-bottom: 40px;
  font-size: 32px;
}

.input-container {
  margin-bottom: 50px;
  position: relative;
  width: 70%;
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
  font-size: 15px;
}

.send-button {
  background-color:#484c54;
  border-radius: 15px;
  color: white;
  height: 3rem;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  transition: .2s;
  padding: 5px 10px;
  width: fit-content;
}
.send-button:hover {
  background-color: #2b2e32;
  border: 2px solid #6C63FF;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
</style>
