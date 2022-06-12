<template>
  <v-container>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-form ref="form" @submit.prevent="handleMakeShorturl">
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
    </v-form>
    <div v-if="shortURL">
      <v-row class="d-flex justify-center">
        <v-col cols="auto" md="6" sm="8" xs="8" class="mr-8">
          <v-text-field
            outlined
            v-model="shortURL"
            label="ShortURL"
            disabled
            required
          ></v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-btn class="mt-3" @click="handleCopyShorturl"> Copy </v-btn>
        </v-col>
      </v-row>
    </div>
    <qrcode-vue
      class="d-flex justify-center mt-10"
      v-if="shortURL"
      :value="shortURL"
      size="300"
      level="H"
    />
  </v-container>
</template>

<script>
import * as shorturl from "@/utils/shortURL";
import QrcodeVue from "qrcode.vue";
export default {
  data() {
    return {
      fullURL: "",
      shortURL: "",
      loading: false,
      snackbar: false,
    };
  },
  components: {
    QrcodeVue,
  },
  methods: {
    // generate short url
    async handleMakeShorturl() {
      try {
        this.loading = true;
        const validate = this.$refs.form.validate();
        if (!validate) {
          this.loading = false;
          return;
        }
        //   console.log(this.fullURL);
        const res = await shorturl.makeShorten(this.fullURL);
        this.shortURL = res.data.shorturl;
        this.loading = false;
        this.snackbar = true;
      } catch (error) {
        this.loading = false;
        console.log(error);
        alert(error);
      }
    },

    // copy short url to clip board
    handleCopyShorturl() {
      navigator.clipboard.writeText(this.shortURL);
      this.$emit("on-submit");
    },
  },
};
</script>
