import ConsultationView from '@/views/Doctor/ConsultationView.vue';
import ConsultationInformationView from '@/views/Doctor/ConsultationInformationView.vue'
import AddConsultationForm from '@/views/Doctor/AddConsultationForm.vue'
import { checkLoggedIn } from "./auth-guard";
export default [
  {
    path: "/consultations",
    name: "consultations",
    component: ConsultationView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id",
    name: "consultation-view",
    component: ConsultationInformationView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id/form",
    name: "add-consultation-form",
    component: AddConsultationForm,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  }
];
