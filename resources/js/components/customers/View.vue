<template>
  <div class="customer-view" v-if="customer">
    <div class="user-img">
      <img src="https://solarsystem.nasa.gov/system/basic_html_elements/11490_emoon_480x360_moonsbydest.jpg" alt="">
    </div>
    <div class="user-info">
      <table class="table">
        <tr>
          <td>ID</td>
          <td>{{ customer.id }}</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>{{ customer.name }}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{ customer.email }}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>{{ customer.phone }}</td>
        </tr>
        <tr>
          <td>Website</td>
          <td>{{ customer.website }}</td>
        </tr>
      </table>
      <router-link to="/customers">Back to all customers</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'view',
    created() {
      axios.get(`/api/customers/${this.$route.params.id}`, {
        headers: {
          "Authorization": 'Bearer '.concat(this.currentUser.token)
        }
      })
      .then((response) => {
        this.customer = response.data.customer
      })
    },
    computed: {
      currentUser() {
        return this.$store.getters.currentUser;
      }
    },
    data() {
      return {
        customer: null
      };
    }
  }
</script>

<style scoped>
  .customer-view {
    display: flex;
    align-items: center;
  }
  .user-img {
    flex: 1;
  }
  .user-img img {
    max-width: 160px;
  }
  .user-info {
    flex: 3;
    overflow-x: scroll;
  }
</style>
