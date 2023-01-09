<template>
    <div class="container">
        <h2>Polls</h2>
        <div class="create-poll">
            <form>
                <div>
                    <label for="poll-question">Poll Question:</label><br>
                    <input type="text" id="poll-question" name="poll-question"><br>
                </div>
                <div>
                    <label for="poll-option-1">Option 1:</label><br>
                    <input type="text" id="poll-option-1" name="poll-option-1"><br>
                </div>
                <div>
                    <label for="poll-option-2">Option 2:</label><br>
                    <input type="text" id="poll-option-2" name="poll-option-2"><br>
                </div>
                <input type="submit" value="Submit">
            </form>
        </div>

        <div class="polls">
            <p>Your Polls</p>
            <PollBox />
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
            choices: [{ value: "" }, { value: "" }],
            loading: true
        }
    },
    beforeMount(){
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

</style>