import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { io } from 'socket.io-client'
import '@/assets/css/main.css'
import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App)
app.config.globalProperties.$socket = io('http://localhost:3000')

app.use(store).use(router)
.use(
    createAuth0({
        domain: "dev-li3zgnjtoxaclbd8.us.auth0.com",
        client_id: "MwrvrDX8QJrVPS5NNJjAaaJK7TDJQ4FT",
        redirect_uri: window.location.origin + '/authorize',
        audience: "http://localhost:3000/",
    }))
.mount('#app')

