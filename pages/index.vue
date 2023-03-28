<template>
  <div class="container">
    <div class="navigation-bar">
      <h2>Brain Cloud</h2>
      <div v-if="$auth.loggedIn">
        <NuxtLink to="/home">Go to profile</NuxtLink>
      </div>
      <div v-else>
        <NuxtLink to="/auth/register">Register</NuxtLink>
        <NuxtLink to="/auth/login">login</NuxtLink>
      </div>
    </div>
    <div class="title-container">
      <img class="text-background" src="~assets/svg/Hero_title_background.svg">
      <div class="title">
        <div class="title-text">
          <h1>We provide <span>reliable file storage</span></h1>
          <h2>Need secure file storage? Get up to 20 Gb of free storage by signing up today.</h2>
        </div>
        <div v-if="$auth.loggedIn" class="title-buttons">
          <NuxtLink to="/home" >Go to profile</NuxtLink>
        </div>
        <div v-else class="title-buttons">
          <NuxtLink to="/auth/register" >Create an Account</NuxtLink>
          <h3>or</h3>
          <NuxtLink to="/auth/login" >Already have one?</NuxtLink>
        </div>
      </div>
      <img src="~assets/svg/Hero_title.svg">
    </div>
    <div class="instant-access-container">
      <div>
        <img src="~assets/svg/Hero_time.svg">
      </div>
      <div class="instant-access">
        <div class="instant-access-text">
          <h1><span>Instant Access </span>for your files</h1>
          <h2>Our file storage application provides instant access to your files from any device. No more waiting for files to load or transfer.</h2>
        </div>
      </div>
    </div>
    <div class="title-container">
      <img class="text-background" src="~assets/svg/Hero_title_background_2.svg">
      <div class="title">
        <div class="title-text">
          <h1>The Value of Reliability <span>Reliability</span></h1>
          <h2>Reliability is a key value for our file storage service. We strive to ensure that our platform is always available for accessing your files.</h2>
        </div>
      </div>
      <img src="~assets/svg/Hero_layout.svg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  auth: false,
  data() {
    return {
      plans: [
        {
          title: 'Basic',
          description: 'You have to buy, to get more storage with no minimal file size or max file size',
          list: ['50 GB storage', 'Create up to 10 folders', 'Upload up to 20 files per folder', 'Min upload: 10mb', 'Max upload: 100bmb'],
          price: 9.99,
          isAvailable: false,
          diskSpace: '50 GB',
          color: 'green'
        },
        {
          title: 'Extra',
          description: 'More storage, no more limits for the number of files and folders',
          list: ['100 GB storage', 'Create up to 20 folders', 'Upload up to 20 files per folder', 'Min upload: 10mb', 'Max upload: 500mb'],
          price: 14.99,
          isAvailable: false,
          diskSpace: '100 GB',
          color: 'orange'
        },
        {
          title: 'Rugged storage',
          description: 'Five times more storage than plan Extra and no more limitations',
          list: ['No limitations!', '500 GB storage'],
          price: 19.99,
          isAvailable: false,
          diskSpace: '500 GB',
          color: 'red'
        }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 75px;
  max-width: 1980px;
  margin-inline: auto;
}

.navigation-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  height: 50px;
  width: 100%;
  background-color: #6C63FF;
  font-family: Alata;
}

.navigation-bar > h2 {
  color: white;
  margin: 0;
}

.navigation-bar > div {
  display: flex;
  align-items: center;
  gap: 20px;
}

.navigation-bar > div > a {
  color: white;
  margin: 0;
  font-weight: normal;
  text-decoration: none;
  cursor: pointer;
  font-size: 20px;
  transition: 0.3s;
}

.navigation-bar > div > a:hover {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
}

.title-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;
  font-family: Alata;
  width: 100%;
  box-sizing: border-box;
}

.title-container > .text-background {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.title {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.title-text > h1,
.title-text > h2 {
  margin: 0;
  color: white;
}

.title-text > h1 > span {
  color: #6C63FF;
}

.title-text > h2 {
  width: 55%;
  font-weight: normal;
}

.title-buttons {
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.title-buttons > h3 {
  font-weight: normal;
  margin: 0;
  color: white;
}

.title-buttons > a {
  background-color: #484c54;
  border-radius: 5px;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  text-align: center;
  padding: 5px 30px;
  transition: .2s;
  text-decoration: none;
}

.title-buttons > a:first-child {
  background-color: #6C63FF;
}

.title-buttons > a:hover {
  background-color: #2b2e32;
  outline: 2px solid #6C63FF;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.title-container > img {
  height: 380px;
}

.instant-access-container {
  display: flex;
  justify-content: space-between;
  padding-left: 50px;
  padding-right: 50px;
}

.instant-access-container > div {
  display: flex;
  justify-content: center;
  width: 100%;
}

.instant-access-container > div > img {
  height: 380px;
}

.instant-access {
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.instant-access-text {
  font-family: Alata;
  color: white;
}

.instant-access-text > h1 > span {
  color: #6C63FF;
}

.plans {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  font-family: Alata;
}

.plans > div:nth-child(2) {
  margin-top: -40px;
  margin-bottom: 40px;
}

.support {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  margin-bottom: 50px;
}
.support > div {
  width: 430px;
  font-family: Alata;
}

.support > div > h1 {
  color: #6C63FF;
}

.support > div > h2 {
  color: white;
  font-weight: normal;
}
</style>
