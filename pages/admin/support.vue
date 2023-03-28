<template>
  <div class="container">
    <div class="admin-navigation-bar">
      <div class="redirect-buttons">
        <NuxtLink to="/admin/users">Users</NuxtLink>
        <NuxtLink to="/admin/support">Support</NuxtLink>
      </div>
      <div class="search-container">
        <img src="~assets/svg/Search.svg">
        <input v-model="searchInput"  type="text" placeholder="Search..">
      </div>
    </div>
    <div class="table_div">
      <table class="table">
        <tr class="main_tr">
          <th class="main_th">Full Name</th>
          <th class="main_th">Email</th>
          <th class="main_th">Description</th>
          <th class="main_th">Actions</th>
        </tr>
        <tr v-for="(support, index) in supports" :key="index">
          <th class="th_name">
            <h2>{{ `${support.first_name} ${support.last_name}` }}</h2>
          </th>
          <th>{{ support.email }}</th>
          <th>{{ support.description }}</th>
          <th>
            <button class="more" @click="showSupport(support)">More</button>
          </th>
        </tr>
      </table>
    </div>
    <div v-if="showSupportPreview" class="file-preview">
      <div>
        <div class="file-preview-title">
          <div>
            <h1>{{ `${currentSupport.first_name} ${currentSupport.last_name}` }}</h1>
          </div>
          <div class="close-preview" @click="showSupportPreview = false">
            <img src="~assets/svg/Cross.svg">
          </div>
        </div>
        <div class="file-preview-description">
          <div>
            <h3><span style="color: white; font-size: 24px">Full name:</span> {{ `${currentSupport.first_name} ${currentSupport.last_name}`  }}</h3>
          </div>
          <div>
            <h3><span style="color: white; font-size: 24px">Email: </span>{{ currentSupport.email }}</h3>
          </div>
          <div>
            <h3><span style="color: white; font-size: 24px">Topic: </span>{{ currentSupport.topic.title }}</h3>
          </div>
          <div>
            <h3><span style="color: white; font-size: 24px">Description: </span>{{ currentSupport.description }}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button :disabled="!pagination.links.prev" @click="switchPage(pagination.links.prev)">Previous</button>
      <h2>{{ pagination.meta.current_page }} / {{ pagination.meta.last_page }}</h2>
      <button :disabled="!pagination.links.next" @click="switchPage(pagination.links.next)">Next</button>
    </div>
    <div ref="popup" class="popup-container">
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
  name: 'AdminUsers',
  layout: 'UserNavigationBar',
  data () {
    return {
      supports: [],
      pagination: {
        'links': [],
        'meta': []
      },
      showSupportPreview: false,
      userDeleteModal: false,
      userEditModal: false,
      userResetPasswordModal: false,
      currentSupport: [],
      searchInput: '',
      searchDelayed: false
    }
  },
  mounted() {
    this.getSupports()
  },
  methods: {
    async getSupports () {
      await this.$axios.get('/supports').then((res) => {
        this.supports = res.data.data
        this.pagination.links = res.data.links
        this.pagination.meta = res.data.meta
        console.log(this.pagination.meta.last_page)
      }).catch((e) => {
        alert(e.response.data.message)
      })
    },
    async switchPage (link) {
      console.log(link.substring(link.lastIndexOf("/") + 1))
      this.$axios.get('/' + link.substring(link.lastIndexOf("/") + 1)).then((res) => {
        this.users = res.data.data
        this.pagination.links = res.data.links
        this.pagination.meta = res.data.meta
      }).catch((e) => {
        alert(e.response.data.message)
      })
    },
    updatePageData (title, type) {
      this.userDeleteModal = false
      this.showSupportPreview = false
      this.userResetPasswordModal = false
      this.getSupports()
      this.$refs.popup.style.zIndex = '5'
      this.$store.commit('setPopup', {
        text: title,
        type: type,
        seconds: 5
      })
      let timeout = 6000
      setTimeout(() => {
        this.$refs.popup.style.zIndex = '-1'
      }, timeout)
    },
    showSupport (support) {
      console.log(support)
      this.showSupportPreview = true
      this.currentSupport = support
    }
  }
}
</script>

<style scoped>
.popup-container {
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-inline: auto;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 50px;
  width: fit-content;
  scrollbar-color: #484C54 #00000000;
  scrollbar-width: thin;
  z-index: -5;
  pointer-events: none;
}

* {
  font-family: Alata;
  font-weight: normal;
}

.container {
  display: flex;
  flex-direction: column;
  margin-top: 200px;
  gap: 3px;
  margin-inline: auto;
  margin-bottom: 300px;
  width: 1000px;
}

.admin-navigation-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.redirect-buttons {
  display: flex;
  gap: 20px;
}

.redirect-buttons > a {
  text-decoration: none;
  color: white;
  font-size: 24px;
  transition: 0.2s;
}

.redirect-buttons > a:hover {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
}

.search-container {
  position: relative;
  display: flex;
}

.search-container > img {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
}

.search-container > input {
  padding: 10px 20px 10px 40px;
  background-color: #484C54;
  border-radius: 10px;
  height: 25px;
  font-size: 20px;
  color: white;
  border: none;
  outline: none;
}

.table {
  background-color: #484C54;
  position: relative;
  width: 100%;
  border-radius: 7px;
  color: #FFFFFF;
  border: 1px solid #5B5D62;
}

.more {
  font-size: 16px;
  width: 70px;
  height: 30px;
  color: #FFFFFF;
  background-color: #DAAA00;
  border-radius: 6px;
  border: 1px solid #979797;
  cursor: pointer;
}

.main_tr {
  font-size: 32px;
}

.main_th {
  padding-top: 10px;
  padding-bottom: 10px;
}

th {
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid;
  border-color: #5B5D62;
}

.th_name {
  display: flex;
  gap: 50px;
  justify-content: start;
  padding-left: 50px;
  align-items: center;
  max-width: 550px;
  word-break: break-word;
}

.th_name > h2 {
  margin: 0;
}

.th_name > img {
  height: 72px;
  width: 72px;
  object-fit: cover;
}

.last_th {
  border: none;
}

.last_th_name {
  gap: 15px;
  border: none;
  display: flex;
  align-items: center;
  padding-left: 70px;
}

.file-preview {
  position: fixed;
  width: 300px;
  height: calc(100% - 50px);
  right: 0;
  top: 50px;
  padding: 20px;
  background-color: #2B2E32;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-color: #484C54 #00000000;
  scrollbar-width: thin;
  color: #A3A6AA;
}

.file-preview > div {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.file-preview > div > div {
  width: 100%;
  border-bottom: solid 1px #6C63FF;
}

.file-preview-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 20px;
  font-family: Alata;
}

.file-preview-title > div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-preview-title > div > h1 {
  margin: 0;
}

.file-preview-title > div > img {
  height: 28px;
}

.close-preview > img {
  cursor: pointer;
}

.file-preview-thumbnail {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 100px;
}

.file-preview-thumbnail > img {
  height: 128px;
}

.file-preview-description {
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-family: Alata;
  padding-top: 20px;
  flex-grow: 0.8;
  padding-bottom: 20px;
}

.file-preview-description > div > h3 {
  margin: 0;
}

.file-preview-description > div > p {
  margin: 0;
  font-size: 12px;
}

.file-preview-buttons {
  display: flex;
  justify-content: center;
  flex-flow: inherit;
  gap: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.file-preview-buttons > div {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:#484c54;
  border-radius: 15px;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 5px 15px;
  transition: .2s;
  font-family: Alata;
}

.edit-user-container {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px !important;
  border-bottom: none !important;
}

.delete-user-container {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px !important;
  border-bottom: none !important;
}

.file-preview-buttons > div > a {
  user-select: none;
  text-decoration: none;
  color: white;
  margin: 0;
  font-size: 14px;
}

.file-preview-buttons > div:hover {
  background-color: #222222;
  outline: 1px solid #6C63FF;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.pagination {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 20px;
}

.pagination > h2 {
  margin: 0;
  color: white;
  padding-left: 10px;
  padding-right: 10px;
}

.pagination > button {
  background-color:#484c54;
  border-radius: 15px;
  width: 150px;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  text-align: center;
  transition: .2s;
}

.pagination > button:hover {
  background-color: #2b2e32;
  outline: 2px solid #6C63FF;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.pagination > button:disabled {
  background-color: #2b2e32;
  outline: 2px solid #440000;
}

</style>
