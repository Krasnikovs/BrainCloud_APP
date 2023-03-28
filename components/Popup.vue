<script src="../store/index.js" />
<template>
  <transition name="bounce">
    <div ref="popupss" class="popup" v-if="show" :class="'popup-' + popupType ">
      <p>{{ popupText }}</p>
      <img
        class="close-popup"
        src="~assets/svg/Cross.svg"
        @click="show = false"
      >
    </div>
  </transition>
</template>

<script>
export default {
  props: ['popupShow', 'popupType', 'popupText', 'popupShowTime', 'popupId'],
  data () {
    return {
      show: false,
    }
  },
  mounted () {
    this.show = true
    setTimeout(() => {
      this.show = false
      this.$store.commit('deletePopup', {
        popupId: this.popupId
      })
    }, this.popupShowTime * 1000)
  }
}
</script>

<style scoped>
.popup {
  width: 450px;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, 0.75);
  -moz-box-shadow:    0px 0px 5px 0px rgba(50, 50, 50, 0.75);
  box-shadow:         0px 0px 5px 0px rgba(50, 50, 50, 0.75);
  padding: 10px 10px;
  border-radius: 5px;
}

p, .close-popup {
  margin: 0;
  padding: 0;
}

.popup > p {
  color: white;
  font-family: Alata;
}

.popup > img {
  transition: 0.2s;
  pointer-events: initial !important;
}

.popup > img:hover {
  filter: invert(56%) sepia(78%) saturate(6314%) hue-rotate(230deg) brightness(104%) contrast(101%);
}

.popup-success {
  background-color: #2b2e32;
  border: 3px solid #6C63FF;
  border-top: 3px solid #198245;
}

.popup-success > .close-popup {
  color: #198245;
}

.popup-danger {
  background-color: #2b2e32;
  border: 3px solid #6C63FF;
  border-top: 3px solid #8D1310;
}

.popup-danger > .close-popup {
  color: #8D1310;
}

.close-popup {
  cursor: pointer;
  font-size: 24px;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
