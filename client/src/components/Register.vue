<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Register">
        <form
          name="tab-tracker-form"
          autocomplete="off">
        <v-text-field
          label="Email"
          v-model="email"
        ></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          v-model="password"
          auto-complete="new-password"
        ></v-text-field>
        </form>
        <br>
        <div class="danger-alert" v-html="error" />
        <v-btn class="cyan" @click="register" dark>Register</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        // setToken and setUser based on whatever return from the register endpoint
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'songs'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
