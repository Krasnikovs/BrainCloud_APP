<template>
  <div class="body-container">
    <div class="side-bar">
      <div class="create-folder">
        <div class="create-folder-button" @click="addFolder()">
          <img src="~assets/svg/Add.svg">
          <span>Folder</span>
        </div>
        <div class="create-folder-button" @click="uploadFile()">
          <img src="~assets/svg/Add.svg">
          <span>File</span>
        </div>
        <FolderAdd
          v-show="showAddFolderPopup"
          @close-modal="showAddFolderPopup = false"
          @close-and-refresh="(title, type) => updatedFolderNotification(title, type, 'folders')"
        />
        <FileAdd
          v-show="showFileUploadPopup"
          :folder_id="this.currentFolder"
          :folders="this.folders"
          @close-modal="showFileUploadPopup = false"
          @close-and-refresh="(title, type) => updatedFolderNotification(title, type, 'files')"
        />
      </div>
      <div class="folders-container">
        <h2>Your folders</h2>
        <div>
          <h2 v-show="folders.length === 0">You do not have any folders</h2>
          <div v-for="(folder, index) in folders" :key="index" class="folders">
            <div class="folder">
              <div ref="selectedFolder" class="folder-button-container" @click="folderFiles(folder, index)">
                <h3>{{ folder.title }}</h3>
              </div>
              <div class="delete-folder" @click="updateFolder(folder.id, 'delete')">
                <img class="folder-icon" src="~assets/svg/Folder.svg">
                <img class="folder-cross" src="~assets/svg/Cross.svg">
              </div>
              <div class="edit-folder" @click="updateFolder(folder.id, 'edit')">
                <img src="~assets/svg/Edit.svg">
              </div>
            </div>
            <FolderDelete
              v-if="folder.deleteModal"
              @close-modal="updateFolder(folder.id, 'delete')"
              :id="folder.id"
              :title="folder.title"
              @close-and-refresh="(title, type) => updatedFolderNotification(title, type, 'folders')"
            />
            <FolderEdit
              v-if="folder.editModal"
              @close-modal="updateFolder(folder.id, 'edit')"
              :folderId="folder.id" :title="folder.title"
              @close-and-refresh="(title, type) => updatedFolderNotification(title, type, 'folders')" />
          </div>
        </div>
      </div>
    </div>
    <main class="main-profile-container">
      <div class="search-padding">
        <div class="search-container">
          <img src="~assets/svg/Search.svg">
          <input v-model="searchInput" @input="getFilteredFiles()" type="text" placeholder="Search..">
        </div>
      </div>
      <div ref="fileContainer" class="file-container">
        <div @click="openPreview(file)" class="file" v-for="(file, index) in files" :key="index">
          <div>
            <img :src="require(`@/assets/svg/file_type/${file.icon}`)">
          </div>
          <p>{{ file.title }}</p>
        </div>
      </div>
    </main>
    <div v-if="showFilePreview" class="file-preview">
      <div class="file-preview-title">
        <div>
          <img src="~assets/svg/file_type/Unknown.svg">
          <h1>File preview</h1>
        </div>
        <div class="close-preview" @click="closePreview()">
          <img src="~assets/svg/Cross.svg">
        </div>
      </div>
      <div class="file-preview-thumbnail">
        <img v-if="currentFile.imagePreview" :src="currentFile.imagePreview">
        <img v-else :src="require(`@/assets/svg/file_type/${currentFile.icon}`)">
      </div>
      <div class="file-preview-description">
        <div>
          <h2>{{ currentFile.title }}</h2>
          <p>{{ currentFile.size }}, {{ currentFile.created_at }}</p>
        </div>
        <div>
          <h2>File description</h2>
          <p>{{ currentFile.description }}</p>
        </div>
      </div>
      <FileDelete
        class="delete-file-container"
        v-show="fileDeleteModal"
        @close-modal="fileDeleteModal = false"
        :id="currentFile.id" :title="currentFile.title"
        @close-and-refresh="(title, type) => updatedFolderNotification(title, type, 'files')"
      />
      <FileEdit
        class="edit-file-container"
        v-show="fileEditModal"
        @close-modal="fileEditModal = false"
        :fileId="currentFile.id" :title="currentFile.title" :description="currentFile.description"
        @close-and-refresh="(title, type) => updatedFolderNotification(title, type, 'editFiles')"
      />
      <div class="file-preview-buttons">
        <div><a :href="currentFile.file" target="_blank">Download</a></div>
        <div @click="fileEditModal = !fileEditModal; fileDeleteModal = false">
          <a>Rename</a>
        </div>
        <div @click="fileDeleteModal = !fileDeleteModal; fileEditModal = false">
          <a>Delete</a>
        </div>
      </div>
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
  name: 'HomePage',
  layout: 'UserNavigationBar',
  auth: true,
  data () {
    return {
      folders: [],
      files: [],
      searchInput: '',
      searchDelayed: false,
      showAddFolderPopup: false,
      showFileUploadPopup: false,
      showFilePreview: false,
      currentFolder: null,
      currentFile: [],
      fileDeleteModal: false,
      fileEditModal: false
    }
  },
  mounted() {
    this.userFolders()
    if (this.$route.query.success === 'true') {
      this.updatedFolderNotification('You successfully upgraded your plan', 'success')
    } else if (this.$route.query.success === 'false') {
      this.updatedFolderNotification('Payment failed', 'danger')
    }
  },
  methods: {
    addFolder () {
      this.showAddFolderPopup = !this.showAddFolderPopup
      this.showFileUploadPopup = false
      this.folders.map((folder) => {
        folder.deleteModal = false
        folder.editModal = false
        return folder
      })
      this.$forceUpdate();
    },
    uploadFile () {
      this.showFileUploadPopup = !this.showFileUploadPopup
      this.showAddFolderPopup = false
      this.folders.map((folder) => {
        folder.deleteModal = false
        folder.editModal = false
        return folder
      })
    },
    updateFolder (folderId, type) {
      this.folders.map((folder) => {
        if (folder.id === folderId && type === 'delete') {
          folder.deleteModal = !folder.deleteModal
          folder.editModal = false
          return folder
        } else if (folder.id === folderId && type === 'edit') {
          folder.editModal = !folder.editModal
          folder.deleteModal = false
          return folder
        }
        folder.deleteModal = false
        folder.editModal = false
        return folder
      })
      this.showAddFolderPopup = false
      this.showFileUploadPopup = false
      this.$forceUpdate();
    },
    updatedFolderNotification(title, type, update) {
      if (update === 'folders') {
        this.userFolders()
      } else if (type === 'success' && update === 'files') {
        this.updateFiles()
        this.deleteModal = false
        this.fileDeleteModal = false
      } else if (type === 'success' && update === 'editFiles') {
        this.updateFiles()
        this.fileEditModal = false
      }
      this.$refs.popup.style.zIndex = '5'
      this.$store.commit('setPopup', {
        text: title,
        type: type,
        seconds: 5
      })
      setTimeout(() => {
        this.$refs.popup.style.zIndex = '-1'
      }, 6000)
    },
    async userFolders () {
      this.showAddFolderPopup = false
      this.showFileUploadPopup = false
      await this.$axios.get('/user_folders').then((res) => {
        this.folders = res.data.data
        this.folders = this.folders.map((folder) => {
          folder.deleteModal = false
          folder.editModal = false
          return folder
        })
        console.log(this.folders)
        if (!this.currentFolder && this.folders.length !== 0) {
          this.currentFolder = 0
          this.folderFiles(this.folders[0], this.currentFolder, true)
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    async folderFiles (folder, index = this.currentFolder, firstLoad) {
      if (firstLoad) {
        setTimeout(() => {
          this.$refs.selectedFolder[0].style.backgroundColor = '#2b2e32'
          this.$refs.selectedFolder[0].style.outline = '2px solid #6C63FF'
        }, 10)
      } else if (this.currentFolder !== index) {
        this.showFilePreview = false
        this.$refs.fileContainer.style.width = 'initial'
        if (this.currentFolder || this.currentFolder === 0) {
          // console.log(this.currentFolder)
          // let number = JSON.parse(this.currentFolder)
          this.$refs.selectedFolder[this.currentFolder].style.backgroundColor = 'initial'
          this.$refs.selectedFolder[this.currentFolder].style.outline = 'initial'
        }
        this.currentFolder = this.folders.findIndex((folders => folders.id === folder.id))
        this.$refs.selectedFolder[this.currentFolder].style.backgroundColor = '#2b2e32'
        this.$refs.selectedFolder[this.currentFolder].style.outline = '2px solid #6C63FF'
      } else {
        console.log('Folder already selected')
        return
      }
      await this.updateFiles()
    },
    fileIcon (files) {
      this.files = files.map((file) => {
        switch (true) {
          case ['zip', 'rar', '7z'].includes(file.type):
            file.icon = 'Archive.svg'
            file.imagePreview = null
            break
          case ['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(file.type):
            file.icon = 'Image.svg'
            file.imagePreview = file.file
            break
          case ['mp3'].includes(file.type):
            file.icon = 'Audio.svg'
            file.imagePreview = null
            break
          case ['mp4', 'mkv'].includes(file.type):
            file.icon = 'Video.svg'
            file.imagePreview = null
            break
          case ['doc', 'docx', 'rtf', 'xls', 'xlsx', 'ppt', 'pptx', 'accdb', '', ''].includes(file.type):
            file.icon = 'Document.svg'
            file.imagePreview = null
            break
          case ['pdf'].includes(file.type):
            file.icon = 'Pdf.svg'
            file.imagePreview = null
            break
          default:
            file.icon = 'Unknown.svg'
            file.imagePreview = null
        }
        return file
      })
    },
    async updateFiles () {
      let folderId = this.folders[this.currentFolder].id
      await this.$axios.get('/user_files/' + folderId).then((res) => {
        this.fileIcon(res.data.data)
        this.showFileUploadPopup = false
      }).catch((e) => {
        console.log(e)
      })
    },
    async getFilteredFiles () {
      if (!this.searchInput) {
        await this.updateFiles()
      } else if (this.searchDelayed) {
        return
      } else {
        this.searchDelayed = true
        setTimeout(() => {
          console.log(this.searchInput)
          console.log(this.$auth.$state.user.data.id)
          this.$axios.post('/file_filter', {
            'data': this.searchInput,
            'user_id': this.$auth.$state.user.data.id
          }).then((res) => {
            this.fileIcon(res.data.data)
            console.log(this.searchInput)
          })
          this.searchDelayed = false
        }, 1000)
      }
    },
    openPreview (file) {
      this.currentFile = file
      this.deleteModal = false
      this.fileEditModal = false
      this.fileDeleteModal = false
      console.log(this.currentFile.deleteModal + ' open')
      this.showFilePreview = true
      this.$refs.fileContainer.style.width = 'calc(100% - 440px)'
    },
    closePreview() {
      this.$refs.fileContainer.style.width = 'initial'
      this.showFilePreview = false
    }
  }
}
</script>

<style scoped>
.popup-container {
  position: fixed;
  left: 0;
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

.body-container {
  display: flex;
  flex-direction: row;
  margin-left: 0 !important;
}

.side-bar {
  margin-top: 50px;
  position: fixed;
  height: calc(100% - 50px);
  width: 300px;
  background-color: #2B2E32;
  overflow-y: auto;
  overflow-x: hidden;
  text-overflow: ellipsis;
  scrollbar-color: #484C54 #00000000;
  scrollbar-width: thin;
}

.create-folder{
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-bottom: solid 1px #484C54;
}

.create-folder-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-family: Alata;
  outline: none;
  border: none;
  background-color: #222222;
  padding: 8px 15px;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  transition: 0.3s;
}

.create-folder-button:hover {
  background-color: #2b2e32;
  outline: 2px solid #6C63FF;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.create-folder-button > span {
  font-size: 18px;
  color: white;
}

.folders-container > div {
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: auto;
  padding: 10px 5px 150px 10px;
}

.folders-container > div > h2 {
  font-family: Alata;
  text-align: center;
  color: #A3A6AA;
  margin: 0;
}

.folders-container > h2 {
  font-family: Alata;
  color: #A3A6AA;
  text-align: left;
  margin: 0;
  padding: 10px;
}

.folder {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.delete-folder {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  border-radius: 5px;
}

.edit-folder {
  display: flex;
  justify-content: center;
  align-items: center;
}

.folder-button-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  width: 96%;
  outline: 0px solid rgba(0, 0, 0, 0);
  border-radius: 15px;
  user-select: none;
  padding: 10px 0px 10px 10px;
  transition: 0.3s;
  word-break: break-word;
}

.folder-button-container:hover{
  background-color: #222222 !important;
  outline: 1px solid #6C63FF !important;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) !important;
}

.folder-button-container:active {
  background-color: #111111;
}

.delete-folder > .folder-icon {
  position: relative;
  outline: 1px solid #6C63FF;
  padding: 5px;
  border-radius: 5px;
  height: 24px;
}
.delete-folder:hover > .folder-cross {
  width: 13px;
  opacity: 1;
}

.delete-folder:hover {
  outline: 3px solid #6C63FF;
  cursor: pointer;
}

.delete-folder:active {
  outline: 1px solid #6C63FF;
}

.folder-cross {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-45%, -33%);
  opacity: 0;
  width: 13px;
  filter: invert(70%) sepia(100%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);
  transition: 0.3s;
}

.folder-button-container > h3 {
  font-family: Alata;
  font-weight: normal;
  color: #A3A6AA;
  margin: 0;
}

.edit-folder {
  width: fit-content;
}

.edit-folder > img {
  opacity: 0;
  width: 24px;
  filter: invert(71%) sepia(9%) saturate(133%) hue-rotate(175deg) brightness(93%) contrast(86%);
  transition: 0.3s;
  outline: 1px solid #6C63FF;
  padding: 5px;
  margin-right: 10px;
  border-radius: 5px;
}

.edit-folder > img {
  opacity: 1;
}

.edit-folder > img:hover {
  outline: 3px solid #6C63FF;
  cursor: pointer;
}
.edit-folder > img:active {
  outline: 1px solid #6C63FF;
}

.main-profile-container {
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  margin-left: 300px;
  margin-top: 75px;
}

.profile-navigation-bar > a {
  font-family: Alata;
  font-size: 24px;
  color: white;
  text-decoration: none;
  transition: 0.2s;
}

.profile-navigation-bar > a:hover {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
}

.file-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 50px;
  padding: 0px 50px 50px;
}

.search-padding {
  padding-left: 50px;
}

.search-container {
  position: relative;
  display: flex;
  width: 460px !important;
}

.search-container > img {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
}

.search-container > input {
  width: 100%;
  padding: 10px 20px 10px 40px;
  background-color: #484C54;
  border-radius: 10px;
  height: 25px;
  font-size: 20px;
  color: white;
  border: none;
  outline: none;
}

.file {
  display: flex;
  gap: 10px;
  flex-direction: column;
  height: 250px;
  width: 200px;
  border-radius: 15px;
  cursor: pointer;
}

.file > div {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5B5D62;
  border-radius: 15px;
}


.file > p {
  margin: 0;
  font-family: Alata;
  text-align: center;
  color: white;
}

.file-preview {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 300px;
  height: calc(100% - 50px);
  margin-top: 50px;
  right: 0;
  background-color: #2B2E32;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-color: #484C54 #00000000;
  scrollbar-width: thin;
  color: #A3A6AA;
}

.file-preview > div {
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
  word-break: break-word;
}

.file-preview-description > div > h2 {
  margin: 0;
}

.file-preview-description > div > p {
  margin: 0;
  font-size: 12px;
}

.file-preview-buttons {
  display: flex;
  justify-content: center;
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

.delete-file-container {
  position: absolute;
  bottom: 175px;
  right: 10px;
  width: 300px !important;
  border-bottom: none !important;
}

.edit-file-container {
  position: absolute;
  bottom: 175px;
  right: 10px;
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
</style>
