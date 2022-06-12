<template>
  <v-container class="d-flex-justify-center text-center mt-10">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-snackbar
      v-model="snackbar.show"
      timeout="2000"
      absolute
      color="error"
      text
      top
      right
      elevation="1"
    >
      <strong class="text-right">{{ snackbar.text }}</strong>
    </v-snackbar>
    <h1 class="primary--text">LOGIN</h1>
    <v-form ref="form" @submit.prevent="handleLogin" id="check-login-form">
      <v-row class="mt-10">
        <v-col cols="4" md="4" sm="2" xs="2"> </v-col>
        <v-col cols="4" md="4" sm="8" xs="8">
          <v-text-field
            outlined
            v-model="username"
            :rules="[(v) => !!v || 'This field is required']"
            label="Username"
            prepend-inner-icon="mdi-account-circle"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4" md="4" sm="2" xs="2"> </v-col>
      </v-row>
      <v-row class="">
        <v-col cols="4" md="4" sm="2" xs="2"> </v-col>
        <v-col cols="4" md="4" sm="8" xs="8">
          <v-text-field
            outlined
            v-model="password"
            :rules="[(v) => !!v || 'This field is required']"
            label="Password"
            prepend-inner-icon="mdi-lock"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4" md="4" sm="2" xs="2"> </v-col>
      </v-row>
    </v-form>
    <v-btn x-large color="primary" type="submit" form="check-login-form">
      LOGIN
    </v-btn>
  </v-container>
</template>

<script>
import * as shorturl from "@/utils/shortURL";
export default {
  data() {
    return {
      show: false,
      username: "",
      password: "",
      loading: false,
      snackbar: { show: false, text: "" },
    };
  },

  methods: {
    async handleLogin() {
      try {
        const validate = this.$refs.form.validate();
        if (!validate) return;

        // console.log(this.username, this.password);
        const res = await shorturl.login({
          username: this.username,
          password: this.password,
        });

        // console.log(res);

        if (!res.status && res.response.status !== 200) {
          throw res.response;
        }

        // await this.$store.dispatch("setToken", res.data.token);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("isLoggedIn", true);
        this.$router.push("admin");
        // if(res.)
        // console.log("token", this.$store.state.token);
        // console.log(res.data.token);
      } catch (error) {
        this.snackbar.show = true;
        this.snackbar.text = error.data;
        console.log("have err", error);
      }
    },
  },
};
</script>
