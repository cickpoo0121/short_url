<template>
  <v-container>
    <v-form>
      <!-- <v-card class="d-flex justify-center pa-10"> -->
      <v-row class="d-flex justify-center">
        <v-col cols="auto" md="6" sm="8" xs="8">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="URL"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-btn class="mt-3"> shorten </v-btn>
        </v-col>
      </v-row>
      <!-- </v-card> -->
    </v-form>
  </v-container>
</template>
