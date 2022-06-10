<template>
  <div class="home">
    <v-snackbar
      v-model="snackbar"
      timeout="2000"
      absolute
      color="success"
      text
      top
      right
      elevation="1"
    >
      <strong class="text-right">Copied to clipboard</strong>

      <!-- <template v-slot:action="{ attrs }">
        <v-btn color="success" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template> -->
    </v-snackbar>
    <InputForm class="mt-10" @on-submit="showSnackbar" />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import InputForm from "@/components/InputForm.vue";
// import * as shorten from "@/utils/shortURL.js";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    InputForm,
  },
  data() {
    return {
      snackbar: false,
    };
  },
  methods: {
    showSnackbar() {
      this.snackbar = true;
      console.log("show snackbar");
    },
  },
};
</script>
