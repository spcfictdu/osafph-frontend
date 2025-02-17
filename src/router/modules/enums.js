import { checkLoggedIn } from "./auth-guard";
export default [
  {
    path: "/dialysis-packages",
    name: "dialysis-packages",
    component: () =>
      import(
        /* webpackChunkName: "admin-enums" */ "@/views/Enums/DialysisPackagesView.vue"
      ),
    props: true,
    meta: {
      requiresAuth: true,
      activeIcon: "Dialysis Packages",
      routeName: "Dialysis Packages",
    },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/dialysis-items",
    name: "dialysis-items",
    component: () =>
      import(
        /* webpackChunkName: "admin-enums" */ "@/views/Enums/DialysisItemsView.vue"
      ),
    props: true,
    meta: {
      requiresAuth: true,
      activeIcon: "Dialysis Items",
      routeName: "Dialysis Items",
    },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/document-types",
    name: "document-types",
    component: () =>
      import(
        /* webpackChunkName: "admin-enums" */ "@/views/Enums/DocumentTypesView.vue"
      ),
    props: true,
    meta: {
      requiresAuth: true,
      activeIcon: "Documents",
      routeName: "Document Types",
    },
    beforeEnter: checkLoggedIn,
  },
];
