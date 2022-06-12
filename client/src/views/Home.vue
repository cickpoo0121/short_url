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
    </v-snackbar>
    <InputForm class="mt-10" @on-submit="showSnackbar" />
  </div>
</template>

<script>
// @ is an alias to /src
import InputForm from "@/components/InputForm.vue";

export default {
  name: "Home",
  components: {
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
      // console.log("show snackbar");
    },
  },
};
</script>
