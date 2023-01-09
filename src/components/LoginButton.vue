<template>
    <button class="get-started-btn" @click="login">
        Get Started
    </button>
</template>

<script>
export default {
    data(){
        return {
            redirect: "",
            url: "dev-li3zgnjtoxaclbd8.us",
            clientId: "MwrvrDX8QJrVPS5NNJjAaaJK7TDJQ4FT",
            audience: "http://localhost:3000/",
            callbackURL: 'http://localhost:8080/authorize',
            callbackPath: '/'
        }
    },
    methods: {
        login(){
            this.$auth0.loginWithRedirect()
        }
    }
}
</script>