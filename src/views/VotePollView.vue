<template>
    <div class="container" v-if="!error">
        <div class="title" style="margin-bottom: 20px" v-if="!loading">Vote on {{ title(username) }}'s poll!</div>
        <PollBox 
            :id="poll._id"
            :title="poll.title" 
            :options="poll.options" 
            :total_votes="poll.total_votes"
            :vote_box="true"
            :voted="poll.voted"
        />
    </div>
    <div class="error" v-else>
        <p>{{ error }}</p>
    </div>
</template>

<script>
import PollBox from '@/components/PollBox.vue'
export default {
    components: {
        PollBox
    },
    data(){
        return {
            poll: {},
            error: null,
            username: "",
            loading: true
        }
    },
    methods: {
        title(string){
            if(string){
                string = string.toLowerCase()
                string = string[0].toUpperCase() + string.split('').splice(1).join('')
                return string
            }
        }
    },
    mounted(){
        // eslint-disable-next-line no-unused-vars
        this.$socket.on('poll_voted', ({ poll_id, option_id }) => {
            // update poll 
            // play some animations maybe?
            let option = document.querySelector(`.el-${option_id}`)
            option.classList.add('new-vote')
            option.style.width = `calc(${this.poll.options.find(o => o._id == option_id).percentage + '2px'})`
            setTimeout(() => {
                option.classList.remove('new-vote')
            }, 2000)

            this.$store.commit('VOTE_POLL', { poll_id, option_id, from_socket: true })
        })
    },
    // eslint-disable-next-line no-unused-vars
    beforeMount() {
        

        fetch(`http://localhost:3000/polls/${this.$route.params.id}`)
            .then((res) => {
                if(res.status != 200){
                    this.error = "No Poll with id was found"
                    throw Error('invalid-poll')
                }
                else{
                    return res.json()
                }
            })
            .then(data => {
                this.username = data.username
                this.$store.commit('ADD_VOTING_POLL', data.poll);
                let filter = this.$store.state.voted_polls.filter((poll) => poll._id == data.poll._id)
                if (filter.length == 1) this.poll = filter[0]
                else throw Error('invalid-poll')

                this.loading = false
                this.$socket.on('connect', () => {
                })
            })

            // eslint-disable-next-line no-unused-vars
            .catch(err => {

            })
    }
}
</script>