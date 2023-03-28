<template>
  <main class="main">
    <section class="profile">
      <form @submit.prevent class="profile-container">
        <span class="title">My Account</span>
        <div class="main-content">
          <div class="big-pic-div">
            <img v-show="imagePreview" class="image-preview" :src="imagePreview">
            <div v-show="imagePreview">
              <label class="upload-image-button">
                <input type="file" accept="image/*" @change="uploadImage">
                <p>Change avatar</p>
              </label>
            </div>
          </div>
          <div class="main-input">
            <div class="input-container">
              <input v-model="userData.name" class="profile-input" type="text" placeholder=" ">
              <label class="profile-label">Username</label>
            </div>
            <div class="input-container">
              <input v-model="userData.email" class="profile-input" type="text" placeholder=" ">
              <label class="profile-label">Email</label>
            </div>
            <div class="input-container">
              <input v-model="userData.password" class="profile-input" type="password" placeholder=" ">
              <label class="profile-label">New password</label>
            </div>
          </div>
        </div>
        <div class="btn-field">
          <NuxtLink to="/home">
            <p>Cancel</p>
          </NuxtLink>
          <button type="button" @click="updateUser()">Save</button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  name: 'ProfileSettings',
  layout: 'UserNavigationBar',
  auth: true,
  data () {
    return {
      imagePreview: false,
      user: this.$auth.$state.user.data,
      userData: {
        image: '',
        name: '',
        email: '',
        password: ''
      },
    }
  },
  mounted() {
    this.getImage()
    console.log(this.userData)
    this.userData.name = this.user.name
    this.userData.email = this.user.email
    this.imagePreview = this.user.image
  },
  methods: {
    async getImage () {
      const response = await fetch(this.user.image)
      const blob = await response.blob()
      this.userData.image = new File([blob], 'image.jpg', {type: blob.type})
    },
    uploadImage(e) {
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
        console.log(this.imagePreview)
      }
    },
    async updateUser () {
      const fd = new FormData()
      for (const [key, value] of Object.entries(this.userData)) { fd.append(key, value) }
      await this.$axios.post('/users/' + this.user.id + '?_method=PUT', fd).then((res) => {
        alert('Dati saglabāti')
        this.$auth.setUser(res.data)
        this.$router.push('/home')
      }).catch((e) => {
        alert('Nav labi bračiņ')
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
  font-family: Alata;
  color: white;
}

body {
  background-color: #36363f;
  width: 100%;
  height: 100%;
  margin: 0;
}

html {
  margin: 0;
  height: 100%;
  width: 100%;
}

.main {
  display: flex;
  height: 100%;
}

.profile {
  width: 100%;
}

.profile-container {
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background-color: #2b2e32;
  width: 661.5px;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 4px #202020;
  gap: 15px;
}

.main-content{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
}

.title{
  font-size: 32px;
}

.main-input{
  width: 300px;
}

.input-container {

  position: relative;
  margin: 15px 0;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-input {
  width: 100%;
  border: none;
  border-bottom: 1px solid #5b5d60;
  background-color: transparent;
  outline: none;
  transition: 0.3s;
  color: white;
  display: flex;
  justify-content: flex-end;
  height: 40px;
}

.profile-input:focus {
  border-bottom: 1px solid white;
}

.profile-input:focus ~ .profile-label,
.profile-input:not(:placeholder-shown) ~ .profile-label{
  top: -5px;
  font-size: 12px;
  color: #5b5d60;
}

.profile-label {
  position: absolute;
  top: 13px;
  left: 0;
  transition: 0.3s;
  font-size: 15px;
}

.btn-field {
  width: 100%;
  display: flex;
  justify-content: space-between;


}

.btn-field > a > p {
  margin: 0;
}

.btn-field > a {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-field > button,
.btn-field > a {
  text-decoration: none;
  flex-basis: 25%;
  background: #5b5d60;
  height: 40px;
  border-radius: 20px;
  border: 0;
  outline: 0;
  cursor: pointer;
  font-size: 17px;
}

.btn-field button:hover,
.btn-field > a:hover {
  background: transparent;
  transition: .4s;
  border: 3px solid #6C63FF;
}

.big-pic-div{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.big-pic-div > h4{
  font-weight: normal;
  width: 40%;
}

.profile-pic-div{
  height: 100px;
  width: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid grey;
  position: relative;
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
</style>
