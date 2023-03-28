<template>
  <div style="position:relative;" tabindex="0" @blur="dropdownDisplay = false">
    <div
      class="input-dropdown"
      @click="toggleDropdown"
    >
      <span>{{ content }}</span>
      <i class="icon-arrow-down" />
    </div>
    <div
      v-show="dropdownDisplay"
      :id="placeholder"
      ref="dropdownRef"
      class="dropdown"
    >
      <div ref="dropdownContent" class="dropdown-content">
        <div
          v-for="(option, index) in options"
          ref="parameters"
          :key="index"
          style="min-height: 40px;"
          class="dropdown-parameters"
        >
          <p class="parameters" @click="selectOption(option)">
            {{ option.type }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropdownSelect',
  props: ['options', 'placeholder', 'tabindex'],
  data () {
    return {
      dropdownDisplay: false,
      content: this.placeholder
    }
  },
  updated () {
    this.$refs.dropdownRef.style.height = this.setSize((this.$refs.parameters.length <= 3 ? this.$refs.parameters.length : 4))
  },
  methods: {
    toggleDropdown () {
      this.dropdownDisplay = !this.dropdownDisplay
    },
    selectOption (option) {
      this.content = option.type
      this.dropdownDisplay = false
      this.$emit('input', option.type)
    },
    setSize (amountOfLoops) {
      let optionLength = 0
      for (let i = 0; i < amountOfLoops; i++) {
        if (this.$refs.parameters[i].clientHeight === 0) {
          optionLength = optionLength + 38.6
        }
        optionLength = optionLength + this.$refs.parameters[i].clientHeight
      }
      return optionLength + 'px'
    }
  }
}
</script>

<style scoped>
.input-dropdown {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
  cursor: pointer;
  user-select: none;
  line-height: 1 !important;
  border-bottom: solid 1px #5B5D60;
  background-color: transparent;
}

.input-dropdown > span {
  text-align: center;
  color: white;
  font-size: 24px;
  margin: 0;
}

.dropdown {
  background-color: white;
  width: 100%;
  position: absolute;
  border-radius: 9px;
  z-index: 1;
}

.dropdown-content {
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-track: 3px;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 98%;
  border-radius: 7px;
}

.dropdown-parameters {
  cursor: pointer;
  user-select: none;
  margin-top: 0;
}

.parameters {
  padding: 2%;
  margin: 0;
  width: 100%;
}

.dropdown-parameters:hover {
  animation: paragraph-hover 0.2s;
  color: white;
  background-color: #54A2DF;
}

.dropdown-parameters:first-child {
  border-top-left-radius: 7px;
}

.dropdown-parameters:last-child {
  border-bottom-left-radius: 7px;
}

.dropdown-content::-webkit-scrollbar {
  width: 5px;
}

.dropdown-content::-webkit-scrollbar-track {
  margin-top: 5px;
  margin-bottom: 5px;
}

.dropdown-content::-webkit-scrollbar-thumb {
  border-radius: 5px;
}

.minimal-height {
  height: 160px !important;
}

@keyframes paragraph-hover {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
