<template>
    <!-- Poll container -->
<div class="poll">
  <!-- Poll question -->
  <div class="poll-question">
    {{ title }}
  </div>
  <!-- Poll options -->
  <div class="poll-options">
    <!-- Poll option 1 -->
    <div class="poll-option" v-for="option in options" :key="option.name">
      <div class="poll-option-label">
        <p>{{ option.name }}</p>
        <div class="round" v-if="vote_box">
          <input type="checkbox" :id="option._id" :checked="option.voted" :disabled="voted" @click="votePoll(option._id)"/>
          <label :for="option._id"></label>
        </div>
      </div>
      <div class="poll-option-bar">
        <div class="poll-option-bar-fill" :class="'el-' + option._id" :style="`width: ${option.percentage}%;`"></div>
      </div>
      <div class="poll-option-votes">{{ option.percentage }}%</div>
    </div>
  </div>
  <div class="poll-details">
    <p>{{ total_votes }} votes</p>
    <div class="share-icons">
        <img src="@/assets/icons/socials/whatsapp.png" alt="whatsapp">
        <img src="@/assets/icons/socials/twitter.png" alt="twitter">
        <img src="@/assets/icons/socials/facebook.png" alt="facebook">
    </div>
  </div>
</div>
</template>
<script>

export default {
    props: {
      id: String,
      title: String,
      options: Array,
      total_votes: Number,
      vote_box: {
        type: Boolean,
        default: false
      },
      voted: {
        type: Boolean,
        default: false
      }
    },
    data(){
        return {
          socket: null
        }
    },
    methods: {
      votePoll(option_id){
        let poll_id = this.$props.id
        this.$socket.emit('vote', { poll_id, option_id })
        this.$store.commit('VOTE_POLL', { poll_id, option_id })
      }
    }
}
</script>
<style scoped>
/* Poll container */
.poll {
  /* margin: 10px; */

  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 12px;
}

/* Poll question */
.poll-question {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Poll options */
.poll-options {
  display: flex;
  flex-direction: column;
}

/* Poll option */
.poll-option {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 30px;
}

/* Poll option label */
.poll-option-label {
  flex: 0 0 20%;
  justify-self: flex-start;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
}
.poll .poll-option-label > p{
  margin-right: 12px;
}

/* Poll option bar */
.poll-option-bar {
  height: 10px;
  background-color: #ccc;
  border-radius: 5px;
  overflow: hidden;
  margin-left: 15px;
}

/* Poll option bar fill */
.poll-option-bar-fill {
  height: 100%;
  background-color: #007bff;
}

/* Poll option votes */
.poll-option-votes {
  flex: 0 0 20%;
  font-size: 14px;
  margin-left: 10px;
  padding-top: 5px;
}

.poll-option-bar, .poll-option-votes, .poll-option-label{
    margin: 0 auto;
    width: 85%;
}
.poll p {
    padding: 0;
    margin: 0;
}

.poll .poll-details{
    display: flex;
    justify-content: space-between;
}

.poll-details .share-icons{
    display: flex;
    justify-content: space-around;
    width: 40%;
}

.share-icons img{
    width: 30px;
    height: 30px;
}

.round {
  position: relative;
}

.round label {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  height: 28px;
  left: 0;
  position: absolute;
  top: 0;
  width: 28px;
}

.round label:after {
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  content: "";
  height: 6px;
  left: 7px;
  opacity: 0;
  position: absolute;
  top: 8px;
  transform: rotate(-45deg);
  width: 12px;
}

.round input[type="checkbox"] {
  visibility: hidden;
}

.round input[type="checkbox"]:checked + label {
  background-color: #66bb6a;
  border-color: #66bb6a;
}

.round input[type="checkbox"]:checked + label:after {
  opacity: 1;
}

/* animation class for when a vote happens */
.new-vote{
  background-color: #66bb6a;
  transition: width 3s forwards;
}

/* 
@keyframes load {
  0% { width: 0; }
  100% { width: `${}`; }
} */
</style>