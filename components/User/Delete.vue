<template>
  <div class="delete-user-container">
    <h2>{{ name }}</h2>
    <p>Are you sure want to delete "{{ name }}" user?</p>
    <div class="user-form-buttons">
      <button @click="$emit('close-modal')">Cancel</button>
      <button @click="deleteUser()">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteFile',
  props: ['id', 'name'],
  methods: {
    async deleteUser () {
      await this.$axios.delete('/users/' + this.id).then((res) => {
        this.$emit('close-and-refresh', 'User ' + this.name + ' successfully deleted', 'success')
      }).catch((e) => {
        this.$emit('close-and-refresh', 'Something went wrong, try again later', 'danger')
      })
    }
  }
}
</script>

<style scoped>
.delete-user-container {
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

.delete-user-container > h2 {
  font-family: Alata;
  font-weight: normal;
  text-align: center;
  color: #A3A6AA;
  margin: 0;
}

.delete-user-container > p {
  margin: 0;
  font-family: Alata;
  font-weight: normal;
  text-align: center;
  color: #A3A6AA;
}

.delete-user-container > div {
  display: flex;
  justify-content: space-between;
}

.user-form-buttons {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.user-form-buttons > button {
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

.user-form-buttons > button:hover {
  background-color: #2b2e32;
  outline: 2px solid #6C63FF;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
</style>
