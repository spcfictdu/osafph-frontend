<template>
  <!-- <div id="container">
    <div id="gradient-section">
      <div id="image"></div>
      <div id="circle"></div>
    </div>
  </div> -->
  <!-- <v-container fluid id="container">
    <v-row>
      <v-col cols="12" md="6">
        <div id="gradient-section"></div>
      </v-col>
      <v-col cols="12" md="6">
      </v-col>
    </v-row>
  </v-container> -->
  <v-form @submit.prevent="handleLogin" class="height-stretch">
    <v-container fluid id="container">
      <v-row align="center" align-content="center" style="height: 100%">
        <v-col cols="12" md="5">
          <div class="d-flex flex-column justify-center text-center">
            <div>
              <v-img
                class="d-inline-block"
                eager
                :src="imageUrl"
                :max-width="maxWidth"
                contain
              ></v-img>
            </div>
            <div class="text-body-1 white--text">
              LION’S GLOBAL TECHNOLOGIES INC.
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="7">
          <div class="card-container">
            <div class="headline text-center mb-4">
              CITIZEN'S HEALTH INFORMATION <br />
              AND MANAGEMENT SYSTEM
            </div>
            <v-text-field
              solo
              rounded
              height="50"
              v-model="username"
              :error-messages="usernameErrors"
              @blur="$v.username.$touch()"
              :success="!$v.username.$invalid && $v.username.$dirty"
              label="Username"
            ></v-text-field>
            <v-text-field
              solo
              height="50"
              rounded
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @blur="$v.password.$touch()"
              :error-messages="passwordErrors"
              :success="!$v.password.$invalid && $v.password.$dirty"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              label="Password"
            ></v-text-field>
            <v-btn
              x-large
              rounded
              color="primary"
              block
              dark
              :loading="loading"
              type="submit"
              >Login</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
  data: () => ({
    username: "",
    password: "",
    loading: false,
    loginError: null,
    show: false,
    imageUrl: require("@/assets/Jose (1).png"),
    maxWidth: null,
  }),
  validations: {
    username: {
      required,
      minLength: minLength(4),
    },
    password: {
      required,
      minLength: minLength(4),
    },
  },
  methods: {
    ...mapActions("authentication", ["login"]),
    handleLogin() {
      // Validate the form before proceeding with login
      this.$v.$touch();

      if (!this.$v.$invalid) {
        // Validation passed, continue with login
        const credentials = {
          username: this.username,
          password: this.password,
        };

        this.loading = true;
        this.loginError = null;

        this.login(credentials)
          .then(() => {
            // Redirect to the dashboard component
            this.$router.replace({ name: "dashboard" });
          })
          .catch((error) => {
            // Handle login error
            console.error("Login error:", error);

            if (error.response && error.response.status === 404) {
              // Status code 404 indicates user not found
              this.loginError = error.response.data.message;
            } else if (error.response && error.response.status === 401) {
              // Status code 401 indicates unauthorized login (incorrect credentials)
              this.loginError = error.response.data.message;
            } else {
              // Other error, display a generic error message
              this.loginError = "An error occurred during login";
            }
          })
          .finally(() => {
            // Reset loading state after login request is completed (whether successful or not)
            this.loading = false;
          });
      }
    },
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required");
      !this.$v.username.minLength &&
        errors.push("Username must be at least 4 characters long");
      // Add loginError message to errors if it exists
      if (this.loginError) {
        errors.push(this.loginError);
      }

      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      !this.$v.password.minLength &&
        errors.push("Password must be at least 4 characters long");

      if (this.loginError) {
        errors.push(this.loginError);
      }
      return errors;
    },
    size() {
      return this.$vuetify.breakpoint;
    },
  },
  watch: {
    size: {
      handler: function (newVal) {
        if (newVal.xs || newVal.sm) {
          this.maxWidth = 250;
        } else {
          this.maxWidth = "60%";
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped lang="scss">
#container {
  max-width: 100%;
  height: 100%;
  background: #fff;
  background: url("../assets/TestSVG.svg") no-repeat center center/cover;
  transition: transform 0.3s ease; /* Add transition for smooth rotation */

  .card-container {
    background: #fff;
    max-width: 70%;
    margin: 0 auto;
  }
}

@media (max-width: 960px) {
  #container {
    background: linear-gradient(
      to bottom,
      rgba(251, 185, 185),
      rgba(199, 123, 123),
      rgba(157, 74, 74)
    );
    .card-container {
      padding: 2rem;
      max-width: 100%;
      border-radius: 40px;
    }
  }
}

.height-stretch {
  height: 100%;
}

/* .container-height {
  height: 100vh;
  display: flex;
  flex-direction: column;
} */

/* .text-container {
  margin-top: 10%;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
} */

/* .card-container {
  margin-top: 15%;
  padding: 40px 20px;
} */

/* @media (max-width: 576px) {
  .text-container {
    margin: 0;
  }
  .card-container {
    margin: 0;
  }
} */

/* @keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
} */

/* .slide-down {
  animation: slideDown 1.5s ease-out;
} */
</style>
