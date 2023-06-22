<template>
<body>
  <div class="container">
    <div class="input-box">
      <label for="token">Token:</label>
      <input type="text" id="token" placeholder="Enter your token" v-model="token" :disabled="token.length">

      <label for="userId">User ID:</label>
      <input type="text" id="userId" placeholder="Enter user ID" v-model="receiver" :disabled="receiver.length">
    </div>

    <div class="chat-box" id="chatBox">
      <!-- Chat messages will be displayed here -->
        <div class="message" :class="message.received ? 'receive' : 'sent'" v-for="message in messages" :key="message.text">
            {{ message.text }}
        </div>
    </div>

    <div class="input-box">
      <label for="message">Message:</label>
      <input type="text" id="message" placeholder="Type your message" v-model="message">

      <button @click="sendMessage()">Send</button>
    </div>
  </div>
</body>
</template>


<style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f2f2f2;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    }

    .input-box {
      margin-bottom: 10px;
      margin: 0 auto;
    }

    .input-box input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .chat-box {
      height: 400px;
      overflow-y: scroll;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .message {
      margin-bottom: 10px;
      padding: 5px;
      background-color: #f2f2f2;
      border-radius: 4px;
    }
  </style>

<script>
    import { io } from 'socket.io-client'
    export default {
        data(){
            return {
                token: "",
                receiver: "",
                socket: null,
                message: "",
                messages: []
            }
        },
        methods: {
          sendMessage(){
            this.socket.emit('send_message', { receiver: this.receiver, message: this.message })
            this.messages.push({ received: false, text: this.message })
            this.message = ""
          }
        },
        watch: {
            token(newValue){
                console.log(newValue)
                // connect to server
                this.socket = io('http://localhost:3000', { extraHeaders: { Authorization: this.token }})
            },

            socket(newValue){
                if(newValue){
                    console.log(newValue, this.socket)
                    this.socket.on('receive_message', ({ message }) =>{ 
                      console.log('received', message)
                      this.messages.push({ received: true, text: message })
                  })
                }
            }
        }
    }
</script>