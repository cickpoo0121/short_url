<template>
  <v-container>
    <h1 class="my-5">Admin</h1>
    <v-row class="d-flex justify-space-around">
      <v-col>
        <v-card shaped color="primary" dark class="pa-2">
          <v-card-title class="text-h5"><h3>All URL</h3> </v-card-title>
          <v-card-text>
            <h2>{{ allUrl.length }} url in system</h2>
          </v-card-text>
          <!-- <v-card-actions>
          <v-btn text> Listen Now </v-btn>
        </v-card-actions> -->
        </v-card>
      </v-col>
      <v-col>
        <v-card shaped color="warning" dark class="pa-2">
          <v-card-title class="text-h5"><h3>TODAY URL</h3> </v-card-title>
          <v-card-text>
            <h2>{{ today.length }} url generated in today</h2>
          </v-card-text>
          <!-- <v-card-actions>
          <v-btn text> Listen Now </v-btn>
        </v-card-actions> -->
        </v-card>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="allUrl"
      :items-per-page="5"
      class="elevation-1 mt-10"
      :loading="allUrl"
      loading-text="Loading... Please wait"
    ></v-data-table>
  </v-container>
</template>

<script>
import * as shorturl from "@/utils/shortURL";

export default {
  data() {
    return {
      allUrl: [],
      today: [],
      headers: [
        { text: "Full URL", value: "url_full", align: "center" },
        { text: "Short ID", value: "url_short", align: "center" },
        { text: "CLICKED", value: "clicked", align: "center" },
      ],
    };
  },
  async mounted() {
    try {
      const res = await shorturl.history(sessionStorage.getItem("token"));
      if (!res.status && res.response.status === 403) {
        alert(res.response.data);
        this.$router.replace("/");
        sessionStorage.clear();
        console.log(res.response.status);
      }
      // console.log(new Date(Date.now()).toISOString().substring(0, 10));
      this.allUrl = res.data;
      this.today = this.allUrl.filter(
        (el) =>
          el.timestamp.substring(0, 10) ===
          new Date(Date.now()).toISOString().substring(0, 10)
      );
      console.log(this.today);
      // console.log(res);
      console.log(this.allUrl);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
