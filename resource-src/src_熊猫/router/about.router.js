export default {
  path: "/about",
  name: "about",
  component: () => import(/** webpackChunkname: 'index*/ "@/views/About.vue"),
  children: []
};
