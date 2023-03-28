<template>
  <div class="popup">
    <h1 class="modal-title">Edit folder</h1>
    <div>
      <div class="folder-input-container">
        <input v-model="folderData.title" class="title-input" placeholder=" ">
        <label class="title-label">Title</label>
      </div>
      <div class="folder-form-buttons">
        <button @click="$emit('close-modal')">Cancel</button>
        <button @click="editFolder()">Change</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditFolder',
  props: ['folderId', 'title'],
  data () {
    return {
      folderData: {
        'title': this.title,
        'user_id': this.$auth.$state.user.data.id
      }
    }
  },
  methods: {
    async editFolder () {
      await this.$axios.post('/folders/' + this.folderId + '?_method=PUT', this.folderData).then((res) => {
        this.$emit('close-and-refresh', 'Folder name successfully changed to ' + this.folderData.title, 'success')
      }).catch((e) => {
        this.$emit('close-and-refresh', 'Folder name is the same ' + this.folderData.title, 'danger')
      })
    }
  }
}
</script>

<style scoped>
.popup {
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #222222;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 4px #202020;
}

.modal-title {
  text-align: center;
  font-family: Alata;
  color: #A3A6AA;
  margin: 0;
  font-weight: normal;
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
