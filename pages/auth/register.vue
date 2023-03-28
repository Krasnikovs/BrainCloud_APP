<template>
    <div class="container">
      <img class="image" src="~assets/svg/Safe.svg">
      <form @submit.prevent class="form">
        <div class="login-title">
          <img src="~assets/svg/Brain.svg">
          <h1>Brain Cloud</h1>
        </div>
        <div class="create-account">
          <h1>Create an account</h1>
        </div>
        <div v-show="incorrectPassword">
          <ul class="wrong-data">
            <li><h4>Password does not match!</h4></li>
          </ul>
        </div>
        <div class="profile-image">
          <img v-show="imagePreview" class="image-preview" :src="imagePreview">
          <label v-show="!imagePreview" class="upload-image">
            <input type="file" accept="image/*" @change="uploadImage">
          </label>
          <div v-show="imagePreview">
            <label class="upload-image-button">
              <input type="file" accept="image/*" @change="uploadImage">
              <p>Change avatar</p>
            </label>
          </div>
        </div>
        <div class="form-inputs">
          <div class="form-name-group">
            <input v-model="userData.name" class="form-input name" placeholder=" " required>
            <label class="form-label">Full name or username</label>
          </div>
          <div class="form-name-group">
            <input v-model="userData.email" class="form-input email" type="email" placeholder=" " required>
            <label class="form-label">Email</label>
          </div>
          <div class="form-name-group">
            <input v-model="userData.password" class="form-input password" type="password" placeholder=" " required>
            <label class="form-label">Password</label>
          </div>
          <div class="form-name-group">
            <input v-model="userData.password_confirm" class="form-input password" type="password" placeholder=" " required>
            <label class="form-label">Repeat password</label>
          </div>
        </div>
        <button @click="register()" class="register-button">Register</button>
        <div>
        <span class="already">
          Already have an account? <NuxtLink class="login" to="/auth/login">Log In</NuxtLink>
        </span>
        </div>
      </form>
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
  name: 'register',
  auth: false,
  data () {
    return {
      imagePreview: null,
      userData: {
        image: '',
        name: '',
        email: '',
        password: '',
        password_confirm: ''
      },
      blobImage: null,
      incorrectPassword: false
    }
  },
  mounted() {
    if (this.$store.state.auth.loggedIn) {
      this.$router.push('/home')
    }
  },
  methods: {
    uploadImage (e) {
      const fileTypes = ['image/png', 'image/jpeg', 'image/jpg']
      const image = (e.target.localName === 'input') ? e.target.files[0] : e.dataTransfer.files[0]
      if (image.size > 15000 * 1024) {
        return
      } else if (!fileTypes.includes(image.type)) {
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = (e) => {
        this.userData.image = image
        this.imagePreview = e.target.result
      }
    },
    async register () {
      const fd = new FormData()
      for (const [key, value] of Object.entries(this.userData)) { fd.append(key, value) }

      await this.$axios.post('/register', fd, {'Content-Type': 'multipart/form-data'}).then((res) => {
        console.log(res.data)
        this.$router.push('/auth/login')
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

*{
  font-family: Alata;
}

.popup-container {
  position: fixed;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: 50px;
  min-width: 478px;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 50px;
  width: fit-content;
  scrollbar-color: #484C54 #00000000;
  scrollbar-width: thin;
}

.container {
  display: flex;
  align-items: center;
}

.form {
  color: white;
  background-color: #2B2E32;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-inline: auto;
  width: 30rem;
  margin-top: 200px;
  padding: 1rem;
  border-radius: 15px;
  flex-direction: column;
  gap: 10px;
  border: solid 1px #2B2E32;
  box-shadow: 0 4px 4px #202020;
}

.login-title {
  flex-direction: column;
  justify-items: center;
  align-items: center;
  display: flex;
}

.login-title > h1 {
  margin: 0;
}

.wrong-data {
  padding: 0;
}

.wrong-data > li, .wrong-data > h4 {
  color: red;
}

.profile-image {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: fit-content;
  padding-bottom: 20px;
}

.profile-image > p {
  margin: 0;
  text-align: center;
}

.image-preview {
  display: flex;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-inline: auto;
}

.upload-image {
  display: flex;
  color: white;
  background: #484C54;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  border: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  margin-inline: auto;
}

.upload-image > input {
  display: none;
  width: 100%;
  height: 100%;
}

.upload-image-button {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: #484C54;
  width: fit-content;
  border: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  margin-inline: auto;
  padding: 10px;
  border-radius: 15px;
  outline: none;
  transition: 0.2s;
}

.upload-image-button:hover {
  background-color: #2b2e32;
  outline: 2px solid #6C63FF;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.upload-image-button > input {
  display: none;
  width: 100%;
  height: 100%;
}

.upload-image-button > p {
  margin: 0;
}

.form-inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.form-name-group {
  position: relative;
  margin-bottom: 20px;
  width: 100%;
  transition: 0.3s;
}

.form-input{
  letter-spacing: 1px;
  font-size: 16px;
  width: 80%;
  margin-left: 10%;
  padding: 0 0 2px 0;
  border: none;
  color: white;
  border-bottom: 1px solid #5b5d60;
  background-color: transparent;
  outline: none;
  transition: 0.3s;

}

.form-label {
  margin-left: 50px;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  transition: 0.3s;
  user-select: none;
  pointer-events: none;
}

.register-button {
  background-color:#484c54;
  border-radius: 15px;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 5px 30px;
  font-size: 24px;
  transition: .2s;

}

.register-button:hover {
  background-color: #2b2e32;
  outline: 2px solid #6C63FF;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.already {
  font-size: 14px;
  white-space: nowrap;
}

.image {
  pointer-events: none;
  z-index: -1;
  width: 25%;
  margin-left: 20px;
  position:fixed;
}

.login {
  color: white;
  transition: 0.2s;
}

.login:hover {
  color: #6C63FF;
}

.form-input:focus {
  border-bottom: 1px solid white;
}

.form-input:focus ~ .form-label,
.form-input:not(:placeholder-shown) ~ .form-label {
  top: -18px;
  font-size: 12px;
  color: #5b5d60;
}

@media only screen and (max-width: 1300px) {
  .image {
    display: none;
  }
}
</style>
