<template>
  <div class="popup">
    <h1 class="modal-title">Edit file</h1>
    <div>
      <div class="file-input-container">
        <input v-model="titleInput" class="title-input" placeholder=" ">
        <label class="title-label">Title</label>
      </div>
      <div class="file-input-container">
        <input v-model="descriptionInput" class="title-input" placeholder=" ">
        <label class="title-label">Description</label>
      </div>
      <div class="file-form-buttons">
        <button @click="$emit('close-modal')">Cancel</button>
        <button @click="editFile()">Change</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditFile',
  props: ['fileId', 'title', 'description'],
  data () {
    return {
      titleInput: this.title,
      descriptionInput: this.description,
      fileData: {
        'title': '',
        'description': '',
        'user_id': this.$auth.$state.user.data.id
      }
    }
  },
  methods: {
    async editFile () {
      this.fileData.title = this.titleInput
      this.fileData.description = this.descriptionInput
      await this.$axios.post('/files/' + this.fileId + '?_method=PUT', this.fileData).then((res) => {
        this.$emit('close-and-refresh', 'File title or/and description successfully changed', 'success')
      }).catch((e) => {
        this.$emit('close-and-refresh', 'File title and description are the same ' + this.fileData.title, 'danger')
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

.file-input-container {
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

.file-form-buttons {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.file-form-buttons > button {
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

.file-form-buttons > button:hover {
  background-color: #2b2e32;
  outline: 2px solid #6C63FF;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
</style>
