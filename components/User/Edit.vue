<template>
  <div class="popup">
    <div id="modal-title">
      <h1>Upload file</h1>
    </div>
    <div class="input-container">
      <div class="upload-container">
        <p>{{ this.fileName }}</p>
        <div
          v-show="displayDropZone"
          class="drop-zone"
          :style="{ borderColor: dropZoneColor}"
          @drop.prevent="uploadImage"
          @dragenter="dragDropZone"
          @dragover="dragDropZone"
          @dragleave="leaveDropZone"
        >
          <img src="../../assets/svg/Add.svg" class="arrow-down" :style="{ color: dropZoneColor, transition: 0.3+'s' }" />
          <p>Drag file here</p>
          <p>or</p>
          <label class="upload-image">
            Upload file
            <input type="file" accept="image/*" @change="uploadImage">
          </label>
        </div>
        <a v-show="!displayDropZone" class="change-photo" @click="displayDropZone=true; fileName = ''">Change file</a>
      </div>
      <div>
        <div class="folder-input-container">
          <input v-model="userData.name" class="title-input" placeholder=" ">
          <label class="title-label">Name</label>
        </div>
        <div class="folder-input-container">
          <input v-model="userData.email" class="title-input" placeholder=" ">
          <label class="title-label">Email</label>
        </div>
        <dropdownSelect
          v-model="userData.subscription_type"
          :options="subscriptions"
          :placeholder="user.subscription_type.type"
        />
      </div>
      <div class="folder-form-buttons">
        <button @click="$emit('close-modal')">Cancel</button>
        <button @click="uploadFile()">Create</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditUser',
  props: ['user'],
  data () {
    return {
      userData: {
        'name': this.user.name,
        'email': this.user.email,
        'image': this.user.image,
        'subscription_type': this.user.subscription_type.type,
      },
      previewImage: this.user.image,
      dropZoneColor: null,
      displayDropZone: false,
      fileName: '',
      subscriptions: []
    }
  },
  updated() {
    console.log(this.userData.subscription_type)
  },
  mounted() {
    console.log(this.user)
    this.$axios.get('/plans').then((sRes) => {
      this.subscriptions = sRes.data.data
    }).catch((e) => {
      alert(e.response.data.message)
    })
  },
  methods: {
    uploadImage (e) {
      const fileTypes = ['image/png', 'image/jpeg', 'image/jpg']
      const file = (e.target.localName === 'input') ? e.target.files[0] : e.dataTransfer.files[0]
      console.log(file)
      if (file.size > 15000 * 1024) {
        alert('You can\'t upload file larger than 15 MB')
        return
      } else if (!fileTypes.includes(file.type)) {
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        this.fileName = file.name
        this.userData.image = file
        this.displayDropZone = false
        this.dropZoneColor = '#222222'
      }
    },
    dragDropZone (e) {
      e.preventDefault()
      this.dropZoneColor = '#6C63FF'
    },
    leaveDropZone (e) {
      e.preventDefault()
      this.dropZoneColor = '#222222'
    },
    async uploadFile () {
      console.log(this.userData)
      const fd = new FormData()
      for (const [key, value] of Object.entries(this.userData)) { fd.append(key, value) }
      await this.$axios.post('/users/' + this.user.id + '?_method=PUT', fd).then((res) => {
        this.$emit('close-and-refresh', 'User ' + this.name + ' successfully deleted', 'success')
      }).catch((e) => {
        alert('Nav labi bračiņ')
        this.$emit('close-and-refresh', 'Something went wrong, try again later', 'danger')
      })
    }
  }
}
</script>

<style scoped>
.popup {
  z-index: 2;
  height: fit-content;
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: #222222;
  padding: 10px 10px;
  border-radius: 15px;
  box-shadow: 0 4px 4px #202020;
}

#modal-title {
  text-align: left;
}

#modal-title > h1 {
  font-family: Alata;
  color: #A3A6AA;
  margin: 0;
  font-weight: normal;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.upload-container {
  display: flex;
  flex-direction: column;
  word-break: break-all;
}

.upload-container > p {
  font-family: Alata;
  margin: 0;
}

.drop-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: #484C54 dashed 3px;
  color: white;
  height: 200px;
  transition: .3s;
  font-family: Alata;
}

.drop-zone > img {
  color: white;
}

.drop-zone > p {
  text-align: center;
  margin: 0;
}

.drop-zone > input {
  display: none;
}

.upload-image {
  color: white;
  background: #222222;
  border-radius: 15px;
  border: none;
  outline: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.upload-image:hover {
  background-color: #2b2e32;
  outline: 2px solid #6C63FF;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.upload-image > input {
  display: none;
  width: 100%;
  height: 100%;
}

.change-photo {
  margin-top: 10px;
  padding: 10px;
  background-color: #222222;
  border-radius: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  color: white;
  font-family: Alata;
  font-size: 16px;
  cursor: pointer;
  margin-inline: auto;
  transition: 0.3s;
}

.change-photo:hover {
  background-color: #2b2e32;
  outline: 2px solid #6C63FF;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}


.folder-input-container {
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
}

.title-input {
  width: 100%;
  border: none;
  border-bottom: 1px solid #5b5d60;
  background-color: transparent;
  outline: none;
  transition: 0.3s;
  color: white;
  position: relative;
  font-size: 16px;
}

.title-input:focus {
  border-bottom: 1px solid white;
}

.title-input:focus ~ .title-label,
.title-input:not(:placeholder-shown) ~ .title-label {
  top: -20px;
  font-size: 16px;
  color: #5b5d60;
}

.login-input:focus ~ .title-label,
.login-input:not(:placeholder-shown) ~ .title-label {
  top: -18px;
  font-size: 12px;
  color: #5b5d60;
}

.title-label {
  position: absolute;
  top: -10px;
  left: 0;
  transition: 0.3s;
  font-size: 24px;
  font-family: Alata;
  color: #5b5d60;
  user-select: none;
  pointer-events: none;
}

.folder-form-buttons {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.folder-form-buttons > button {
  background-color: #484c54;
  border-radius: 15px;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  text-align: center;
  padding: 5px 30px;
  transition: .2s;
}

.folder-form-buttons > button:hover {
  background-color: #2b2e32;
  outline: 2px solid #6C63FF;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
</style>
