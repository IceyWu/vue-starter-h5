import { createApp } from "vue";
import App from "./App.vue";
// unocss
import "uno.css";
// normalize.css
import "normalize.css/normalize.css";
// 全局样式
import "./styles/index.less";
// tailwindcss
// import "./styles/tailwind.css";
// svg icon
// import "virtual:svg-icons-register";
// other

// vant 
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';


import router from "./router";
import { store } from "./store";



const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");