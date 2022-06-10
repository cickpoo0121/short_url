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

export default {
  name: "Home",
  components: {
    // HelloWorld,
    InputForm,
  },
};
</script>
