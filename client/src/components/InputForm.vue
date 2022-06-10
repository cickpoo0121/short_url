<template>
  <v-container>
    <v-form ref="form" @submit.prevent="handleMakeShorturl">
      <!-- <v-card class="d-flex justify-center pa-10"> -->
      <v-row class="d-flex justify-center">
        <v-col cols="auto" md="6" sm="8" xs="8">
          <v-text-field
            outlined
            v-model="fullURL"
            :rules="[
              (v) => !!v || 'Please insert a url',
              (v) =>
                v.substring(0, 4) == 'http' ||
                'Url must start with http or https',
            ]"
            label="URL"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-btn class="mt-3" @click="handleMakeShorturl"> shorten </v-btn>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-col cols="auto" md="6" sm="8" xs="8">
          <v-text-field
            outlined
            v-model="fullURL"
            :rules="[
              (v) => !!v || 'Please insert a url',
              (v) =>
                v.substring(0, 4) == 'http' ||
                'Url must start with http or https',
            ]"
            label="URL"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-btn class="mt-3" @click="handleMakeShorturl"> shorten </v-btn>
        </v-col>
      </v-row>

      <!-- </v-card> -->
    </v-form>
  </v-container>
</template>

<script>
import * as shorturl from "@/utils/shortURL";
export default {
  data() {
    return {
      fullURL: "",
    };
  },
  methods: {
    async handleMakeShorturl() {
      const validate = this.$refs.form.validate();
      if (!validate) return;
      console.log(this.fullURL);
      const res = await shorturl.makeShorten(this.fullURL);
      console.log(res);
    },
  },
};
</script>
