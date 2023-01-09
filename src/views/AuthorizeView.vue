<template>
    <div></div>
</template>

<script>
export default {
    data(){
        return {}
    },
    mounted(){
        console.log('here')
        this.$auth0.getAccessTokenSilently().then((access_token) => {
            this.$store.commit('SET_ACCESS_TOKEN', access_token)
        })
    }
}
</script>
