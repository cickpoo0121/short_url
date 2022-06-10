<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <InputForm />
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
  // data() {
  //   return {};
  // },
  // async mounted() {
  //   // console.log(helper);
  //   const res = await shorten.test({ method: "get" });
  //   console.log(res);
  // },
};
</script>
