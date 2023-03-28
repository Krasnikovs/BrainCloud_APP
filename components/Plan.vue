<template>
  <div ref="card" class="card">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <ul class="card-price">
      <li
        v-for="(description, index) of list"
        :key="index"
      >{{ description }}</li>
    </ul>
    <div class="payment">
      <div class="price">
        <h2>{{ price === 0 ? 'Free' : price + '€'}}</h2>
        <p>Per account</p>
      </div>
      <button
        v-if="user"
        @click="buyPlan()"
        :disabled="user.subscription_type.type === title"
        class="buy-button"
      >
        {{ user.subscription_type.type === title ? 'Active' : `Upgrade` }}
      </button>
      <button
        v-else
        @click="buyPlan()"
        class="buy-button"
      >
        More info
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpgradePlans',
  props: ['title', 'description', 'list', 'price', 'isAvailable', 'diskSpace', 'color'],
  data () {
    return {
      user: this.$auth.loggedIn ? this.$auth.$state.user.data : null,
    }
  },
  mounted() {
    if (this.color === 'purple') {
      this.$refs.card.children[0].style.color = '#6C63FF'
      this.$refs.card.children[0].style.borderLeftColor = '#6C63FF'
      this.$refs.card.children[1].style.color = '#7E7BAE'
      this.$refs.card.children[3].children[0].children[0].style.color = '#6C63FF'
    } else if (this.color === 'green') {
      this.$refs.card.children[0].style.color = '#4BE7A5'
      this.$refs.card.children[0].style.borderLeftColor = '#4BE7A5'
      this.$refs.card.children[1].style.color = '#7BAEA2'
      this.$refs.card.children[3].children[0].children[0].style.color = '#4BE7A5'
    } else if (this.color === 'orange') {
      this.$refs.card.children[0].style.color = '#E7964B'
      this.$refs.card.children[0].style.borderLeftColor = '#E7964B'
      this.$refs.card.children[1].style.color = '#AE907B'
      this.$refs.card.children[3].children[0].children[0].style.color = '#E7964B'
    } else if (this.color === 'red') {
      this.$refs.card.children[0].style.color = '#E74B4B'
      this.$refs.card.children[0].style.borderLeftColor = '#E74B4B'
      this.$refs.card.children[1].style.color = '#AE7B7B'
      this.$refs.card.children[3].children[0].children[0].style.color = '#E74B4B'
    }
  },
  methods: {
    async buyPlan () {
      if (!this.$auth.loggedIn) {
        await this.$router.push('/upgrade_plans')
      }
      await this.$axios.post('/bill/' + this.$auth.$state.user.data.id, {subscription_type: this.title}).then((res) => {
        console.log(res.data.url);
        window.open(res.data.url)
      }).catch((e) => {
        alert('something went wrong..')
      })
    }
  }
}
</script>

<style scoped>
.card {
  background-color: #121212;
  width: 300px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  align-self: normal;
}

.card > h1 {
  width: 100%;
  padding-left: 30px;
  box-sizing: border-box;
  color: white;
  border-left: solid 5px red;
  border-radius: 5px;
}

.card > p {
  padding-left: 20px;
  padding-right: 15px;
  color: #BCC8D4;
  margin: 0;
}

.card-price {
  color: #BCC8D4;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 70px;
}

.card-price > li {
  text-align: start;
  font-size: 18px;
}

.payment {
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 30px;
  height: 100%;
}

.price > h2,
.price > p {
  margin: 0;
  color: white;
  font-family: Alata;
  text-align: center;

}

.price > h2 {
  margin: 0;
}

.price > p {
  margin: 0;
}

.buy-button {
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
  margin-bottom: 10px;
  width: 100%;
  height: 50px;
  text-align: center;
}

.buy-button:hover {
  background-color: #2b2e32;
  outline: 2px solid #6C63FF;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.buy-button:hover.buy-button:disabled {
  background-color: #2b2e32;
  outline: 2px solid #640000;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.buy-button:disabled {
  background-color: #222222;
}

@media only screen and (max-width: 1100px) {
  .card {
    margin-inline: auto;
    gap: 25px;
  }
}
</style>
