<template>
    <div class="container">
        <h2>Polls</h2>
        <div class="create-poll">
            <form @submit.prevent="submitPoll">
                <div>
                    <label for="poll-question">Poll Question:</label><br>
                    <input type="text" id="poll-question" name="poll-question" v-model="poll_title"><br>
                </div>
                <div>
                    <label for="poll-option-1">Option 1:</label><br>
                    <input type="text" id="poll-option-1" name="poll-option-1" v-model="choices[0].name"><br>
                </div>
                <div>
                    <label for="poll-option-2">Option 2:</label><br>
                    <input type="text" id="poll-option-2" name="poll-option-2" v-model="choices[1].name"><br>
                </div>

                <div class="extra-options" v-for="(choice, index) in extra_choices" :key="choice.name">
                    <label for="poll-option-2">Option {{ 3 + index }}:</label><br>
                    <input type="text" id="poll-option-2" name="poll-option-2" v-model="extra_choices[index].name"><br>
                </div>

                <div class="privacy-toggle">
                    <p>Make results public:</p>
                    <label class="toggle-container">
                        <input type="checkbox" :checked="is_public">
                        <span class="toggle">
                            <span class="toggle-handle"></span>
                        </span>
                    </label>
                </div>

                <button type="button" id="add-option-button" :disabled="extra_choices.length >= 2" @click="addChoice">Add Option</button>
                <input type="submit" value="Create Poll">
            </form>
        </div>

        <div class="polls">
            <p>{{ this.loading ? 'Loading Polls...' : 'Your Polls'}}</p>
            <p v-if="polls.length == 0 && !loading">You have no polls currently</p>
            <PollBox v-for="poll in polls" :key="poll._id" :id="poll._id" :title="poll.title" :options="poll.options" :total_votes="poll.total_votes" v-else/>
        </div>
    </div>
</template>

<script>
import PollBox from "@/components/PollBox.vue"
export default {
    components: {
        PollBox
    },
    data(){
        return {
            polls: [],
            poll_title: "",
            choices: [
                { 
                    name: "", 
                    validator(){ 
                        if(this.name.length < 3) this.valid = false; else this.valid = true
                    },
                    valid: false 
                }, 
                { 
                    name: "", 
                    validator(){ 
                        if(this.name.length < 3) this.valid = false; else this.valid = true
                    },
                    valid: false 
                }
            ],
            extra_choices: [],
            is_public: true,
            loading: true
        }
    },
    mounted(){
        this.$socket.on('poll_voted', ({ poll_id, option_id }) => {
            // update poll 
            // play some animations maybe?
            let index = this.polls.findIndex(p => p._id == poll_id)
            if (index !== -1) {
                let option = document.querySelector(`.el-${option_id}`)
                option.classList.add('new-vote')
                option.style.width = `calc(${this.polls[index].options.find(o => o._id == option_id).percentage + '2px'})`
                setTimeout(() => {
                    option.classList.remove('new-vote')
                }, 2000)

                this.$store.dispatch('updatePoll', { poll_id, option_id })
                this.polls = this.$store.state.polls
            }
        })
    },
    methods: {
        addChoice(){
            this.extra_choices.push(
                { 
                    name: "", 
                    validator(){ 
                        if(this.name.length < 3) this.valid = false; else this.valid = true
                    },
                    valid: false 
                })
        },
        submitPoll(){
            let options = this.choices.concat(this.extra_choices)
            options.forEach(option => option.validator())
            let invalid = options.some((option) => option.valid == false)
            if (invalid){
                return 
            }

            options.forEach((option) => delete option.valid)
            fetch('http://localhost:3000/polls', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$store.state.access_token}`
                },
                body: JSON.stringify({ options, title: this.poll_title, public: this.is_public })
            })
                .then((res) => {
                    if(res.status != 200) throw Error()
                    res.json()
                })
                .then((data) => {
                    this.polls.push(data.poll)
                    this.$store.commit('SET_POLLS', this.polls)
                    this.polls = this.$store.state.polls
                })
                .catch(() => {
                    this.$store.commit('CLEAR_ACCESS_TOKEN')
                })
        }
    },

    beforeMount(){
        fetch('http://localhost:3000/polls', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$store.state.access_token}`
                }
            })
                .then((res) => {
                    if(res.status != 200) throw Error()
                    return res.json()
                })
                .then(data => {
                    this.loading = false
                    this.$store.commit('SET_POLLS', data.polls)
                    this.polls = this.$store.state.polls
                })
                .catch(() => {
                    this.loading = false
                    this.$store.commit('CLEAR_ACCESS_TOKEN')
                })
    }
}
</script>

<style scoped>
.create-poll{
    margin-bottom: 10px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 8px;
}

input[type="text"] {
  width: 100%;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
  margin-top: 10px;
}

input[type="submit"] {
  width: 100%;
  height: 40px;
  background-color: #1DA1F2;
  border: none;
  border-radius: 3px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  line-height: 0;
}
#add-option-button {
  width: 100%;
  height: 40px;
  background-color: #b819d8;
  border: none;
  border-radius: 3px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
  line-height: 0;
}


/* TOGGLE SECTION */
.privacy-toggle{
    display: flex;
    align-items: center;
}
.privacy-toggle > p{
    margin-right: 12px;
}

.toggle-container {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 26px;
}

.toggle {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 34px;
  background-color: rgb(255, 255, 255);
}

.toggle-handle {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 26px;
  height: 26px;
  border-radius: 26px;
  background-color: rgb(123, 121, 121);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

input[type="checkbox"] {
  visibility: hidden;
}

input[type="checkbox"]:checked + .toggle .toggle-handle {
  left: calc(100% - 30px);
  background-color: #058154;
}

</style>