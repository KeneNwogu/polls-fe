<template>
    <div class="input-container" style="margin-top: 50px">
        <div class="form-control search-container">
            <label for="username">Twitter username:</label>
            <input type="text" name="username" id="username" v-model="username">

            <div id="search-results" v-show="username.length">
                <div class="result">Result 1</div>
                <div class="result">Result 2</div>
                <div class="result">Result 3</div>
            </div>
        </div>

        <div class="form-control text-container">
            <label for="message">Message:</label>
            <textarea name="message" id="message" cols="30" rows="10" maxlength="100" v-model="message"></textarea>
            <div id="character-limit" :class="{
                    red: (100 - message.length) <= 10,
                    yellow: (100 - message.length) <= 20 && (100 - message.length) > 10
                }">
                {{ 100 - message.length }}</div>
        </div>

        <div class="form-control">
            <button type="submit">Send Message</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            message: "",
            username: ""
        }
    }
}
</script>

<style scoped>
.form-control{
    margin-bottom: 20px;
}
.form-control > label {
    display: block;
    margin-bottom: 8px;
}
.form-control > input, .form-control > textarea, .form-control > button{
    width: 100%;
}
.form-control > input{
    padding: 10px 0;
    border-radius: 6px;
    border: none;
}

.form-control > textarea{
    border-radius: 6px;
    border: none;
}

.form-control > button{
    padding: 15px 0;
    background-color: rgb(11, 115, 205);
    border: none;
    outline: none;
    border-radius: 6px;
    font-size: 1.1em;
    font-weight: 600;
}

/* TEXT BOX */
.text-container{
    display: flex;
    flex-direction: column;
}

#character-limit {
  font-size: 12px;
  color: gray;
  text-align: right;
}

#character-limit.red{
    color: red;
}

#character-limit.yellow{
    color: rgb(239, 156, 12);
}

/* SEARCH BOX */
.search-container {
  position: relative;
}

#search-results {
  position: absolute;
  top: calc(100% + 15px); /* adjust this value to position the pop-up element above the search input */
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid gray;
}

.result {
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
  color: black;
}

.result:hover {
  background-color: lightgray;
}
</style>