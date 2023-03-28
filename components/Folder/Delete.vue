<template>
  <div class="delete-folder-container">
    <h2>{{ title }}</h2>
    <p>Are you sure want to delete "{{ title }}" folder?</p>
    <div class="folder-form-buttons">
      <button @click="$emit('close-modal')">Cancel</button>
      <button @click="deleteFolder()">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteFile',
  props: ['id', 'title'],
  methods: {
    async deleteFolder () {
      await this.$axios.delete('/folders/' + this.id).then((res) => {
        this.$emit('close-and-refresh', 'Folder ' + this.title + ' successfully deleted', 'success')
      }).catch((e) => {
        this.$emit('close-and-refresh', 'Something went wrong, try again later', 'danger')
      })
    }
  }
}
</script>

<style scoped>
.delete-folder-container {
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 10px;
  background-color: #222222;
  border-radius: 15px;
  box-shadow: 0 4px 4px #202020;
  cursor: default;
}

.delete-folder-container > h2 {
  font-family: Alata;
  font-weight: normal;
  text-align: center;
  color: #A3A6AA;
  margin: 0;
}

.delete-folder-container > p {
  margin: 0;
  font-family: Alata;
  font-weight: normal;
  text-align: center;
  color: #A3A6AA;
}

.delete-folder-container > div {
  display: flex;
  justify-content: space-between;
}

.folder-form-buttons {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.folder-form-buttons > button {
  background-color:#484c54;
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
