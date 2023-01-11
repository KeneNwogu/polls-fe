import createPersistedState from "vuex-persistedstate"
import { createStore } from 'vuex'

export default createStore({
  state: {
    access_token: "",
    voted_polls: [],
    polls: [],
    socket: null
  },
  getters: {
  },
  mutations: {
    SET_SOCKET(state, socket){
      state.socket = socket
    },
    SET_ACCESS_TOKEN(state, token){
      state.access_token = token
    },
    CLEAR_ACCESS_TOKEN(state){
      state.access_token = null
    },
    SET_POLLS(state, polls) {
      polls = polls.map((poll) => {
        let total_votes = poll.options.reduce((acc, option) => { return acc + option.votes }, 0)
        poll.total_votes = total_votes

        poll.options = poll.options.map((option) => {
            if (total_votes) option.percentage = Math.round((option.votes / total_votes) * 100);
            else option.percentage = 0
            return option
        })
        return poll
      })

      state.polls = polls
    },
    // adds poll to voted polls 
    ADD_VOTING_POLL(state, poll){
      let index = state.voted_polls.findIndex(p => p._id == poll._id)
      let total_votes = poll.options.reduce((acc, option) => { return acc + option.votes }, 0)
      poll.total_votes = total_votes

      poll.options = poll.options.map((option) => {
        if (total_votes) option.percentage = Math.round((option.votes / total_votes) * 100);
        else option.percentage = 0
        // console.log(Math.round((option.votes / total_votes) * 100))
        return option
      })

      
      if(index == -1){
        poll.voted = false;
        state.voted_polls.push(poll);
      }

      else{
        state.voted_polls[index].total_votes = poll.total_votes
        state.voted_polls[index].options.forEach((option, index) => {
          option.votes = poll.options[index].votes
          if (total_votes) option.percentage = Math.round((option.votes / total_votes) * 100);
          else option.percentage = 0
        })
      }
    },

    VOTE_POLL(state, { poll_id, option_id, from_socket=false }){
      console.log(from_socket)
      let index = state.voted_polls.findIndex(p => p._id == poll_id)
      if(index !== -1){
        let poll = state.voted_polls[index]
        poll.total_votes += 1

        let option_index = poll.options.findIndex(o => o._id == option_id)
        if(option_index !== -1){
          poll.options[option_index].votes += 1
          console.log(poll.options[option_index]._id, option_id)
          console.log(poll.options[option_index].name)
          if(!from_socket) {
            poll.voted = true
            poll.options[option_index].voted = true
          }
        }
        
        state.voted_polls[index] = poll
        this.commit('ADD_VOTING_POLL', state.voted_polls[index])
      }
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
