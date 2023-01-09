<template>
  <nav>

  </nav>

  <div class="header">
    <h1>Welcome to Anonimo!</h1>
    <p>
      Our anonymous poll and review platform allows you to share your honest thoughts and opinions without fear of retribution. 
      Simply create a poll or review and share it with your friends, family, or anyone else you'd like to gather feedback from.
    </p>
  </div>

  <h3 class="secondary-header">But that's not all...!</h3>
  <div class="secondary">
    <p>Anonimo also has a cool feature that allows you to send anonymous tweets to any user on Twitter.
    Whether you want to send a message of support, share a funny joke, or anything in between, Anonimo has you covered.</p>

    <p>So why wait? Start sharing your thoughts and opinions today with Anonimo!</p>
    <LoginButton />
  </div>
</template>

<style scoped>

</style>

<script>
import LoginButton from "@/components/LoginButton.vue"
export default {
    data(){
        return {
        }
    },
    components: {
      LoginButton
    }
}
</script>
