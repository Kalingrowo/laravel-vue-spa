<template>
  <div class="customer-new">
    <form @submit.prevent="add">
      <table class="table">
        <tr>
          <th>Name</th>
          <td>
            <input type="text" class="form-control" v-model="customer.name" placeholder="Customer name">
          </td>
        </tr>
        <tr>
          <th>Email</th>
          <td>
            <input type="email" class="form-control" v-model="customer.email" placeholder="Customer email">
          </td>
        </tr>
        <tr>
          <th>Phone</th>
          <td>
            <input type="text" class="form-control" v-model="customer.phone" placeholder="Customer phone">
          </td>
        </tr>
        <tr>
          <th>Website</th>
          <td>
            <input type="text" class="form-control" v-model="customer.website" placeholder="Customer website">
          </td>
        </tr>
        <tr>
          <td>
            <router-link to="/customers" class="btn">Cancel</router-link>
          </td>
          <td class="text-right">
            <input type="submit" value="Create" class="btn btn-primary">
          </td>
        </tr>
      </table>
    </form>
    <div class="errors" v-if="errors">
      <ul>
        <li v-for="(fieldsError, fieldName) in errors" :key="fieldName">
          <strong>{{ fieldName }}</strong> {{ fieldsError.join('\n') }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import validate from 'validate.js'

  export default {
    name: 'new',
    data() {
      return {
        customer: {
          name: '',
          email: '',
          phone: '',
          website: ''
        },
        errors: null
      };
    },
    computed: {
      currentUser() {
        return this.$store.getters.currentUser;
      }
    },
    methods: {
      add() {
        this.errors = null;

        const constraints = this.getConstrains();

        const errors = validate(this.$data.customer, constraints);

        if(errors) {
          this.errors = errors
          return;
        }

        axios.post('/api/customers/new', this.$data.customer, {
          headers: {
            "Authorization": 'Bearer '.concat(this.currentUser.token)
          }
        })
        .then((response) => {
          this.$router.push('/customers');
        })
      },
      getConstrains() {
        return {
          name: {
            presence: true,
            length: {
              minimum: 3,
              message: 'Must be at least 3 char length'
            }
          },
          email: {
            presence: true,
            email: true
          },
          phone: {
            presence: true,
            numericality: true,
            length: {
              minimum: 10,
              message: 'Must be at least 10 digits length'
            }
          },
          website: {
            presence: true,
            url: true
          }
        };
      }
    }
  }
</script>

<style>
  .errors {
    background: lightcoral;
    border-radius: 5px;
    padding: 21px 0 2px 0;
  }
</style>
