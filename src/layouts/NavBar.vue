<template>
  <div>
    <v-app-bar app dense class="gradient-background">
      <v-app-bar-nav-icon
        class="d-flex d-md-none"
        @click="toggleDrawer"
        color="white"
      ></v-app-bar-nav-icon>
      <div class="font-weight-bold">
        CHIMS
        <!-- <v-img eager :src="logoUrl" width="120" height="60" contain></v-img> -->
      </div>
      <v-spacer></v-spacer>
      <div class="subtitle font-weight-bold py-1 mr-3">{{ nameInitials }}</div>
      <v-menu bottom :offset-y="offset" class>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            class="mr-1"
            dark
            :loading="loading"
          >
            <v-icon color="white" dark large>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item
            v-for="(item, index) in getOptions()"
            :key="index"
            @click="executeAction(item)"
          >
            <v-list-item-title
              ><v-icon dense left>{{ item.icon }}</v-icon
              >{{ item.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <NavDrawer :drawer="drawer" @update-drawer="updateDrawer" />
  </div>
</template>

<script>
import NavDrawer from "../layouts/NavDrawer.vue";
import { mapActions } from "vuex";
export default {
  data: () => ({
    offset: true,
    drawer: true,
    loading: false,
    logoUrl: require("../assets/MCG.png"),
  }),
  components: {
    NavDrawer,
  },
  methods: {
    ...mapActions("authentication", ["logout"]),
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    updateDrawer(value) {
      this.drawer = value;
    },
    executeAction(item) {
      if (item.action) {
        // Execute the action
        item.action();
      } else if (item.route) {
        // Navigate to the route
        this.$router.push(item.route);
      }
    },
    getOptions() {
      return [
        {
          icon: "mdi-logout",
          title: "LOG OUT",
          action: () => {
            this.loading = true;
            this.logout()
              .then(() => {
                //Unsubscrible all Channels
                this.$pusher.unsubscribe("public-hospital-services");
                this.$pusher.unsubscribe("public-citizens");
                this.$pusher.unsubscribe("consultations");
                this.$pusher.unsubscribe("dashboard-notifications");
                this.$pusher.unsubscribe("dialysis-queue");

                this.$router.replace({ name: "login" });
              })
              .catch((error) => {
                console.error("Error logging out:", error);
              })
              .finally(() => {
                this.loading = false;
              });
          },
        },
      ];
    },
  },
  computed: {
    userName: function () {
      const userData = this.$auth.user();
      return `${userData.user.last_name}, ${userData.user.first_name}`;
    },
    size() {
      return this.$vuetify.breakpoint;
    },
    nameInitials() {
      let lastName = this.userName.split(", ").slice(0, -1).join(" ");
      let firstName = this.userName.split(", ").slice(-1).join(" ");
      let allFirstName = firstName.split(" ");
      let allFirstInitials = [];

      allFirstName.forEach((firstName) => {
        allFirstInitials.push(firstName[0] + ".");
      });

      let nameInitials = `${lastName}, `;

      allFirstInitials.forEach((firstInitials) => {
        nameInitials = nameInitials + firstInitials;
      });

      if (this.size.xs) {
        return nameInitials;
      }
      return this.userName;
    },
  },
};
</script>

<style scoped>
.gradient-background {
  background-image: linear-gradient(to right, #db4a41, #a40e32, #db4a41);
  color: white;
}
</style>
