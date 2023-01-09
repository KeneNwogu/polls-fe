<template>
    <!-- Poll container -->
<div class="poll">
  <!-- Poll question -->
  <div class="poll-question">
    What is your favorite color?
  </div>
  <!-- Poll options -->
  <div class="poll-options">
    <!-- Poll option 1 -->
    <div class="poll-option">
      <div class="poll-option-label">Red</div>
      <div class="poll-option-bar">
        <div class="poll-option-bar-fill" style="width: 60%;"></div>
      </div>
      <div class="poll-option-votes">60%</div>
    </div>
    <!-- Poll option 2 -->
    <div class="poll-option">
      <div class="poll-option-label">Green</div>
      <div class="poll-option-bar">
        <div class="poll-option-bar-fill" style="width: 20%;"></div>
      </div>
      <div class="poll-option-votes">20%</div>
    </div>
    <!-- Poll option 3 -->
    <div class="poll-option">
      <div class="poll-option-label">Blue</div>
      <div class="poll-option-bar">
        <div class="poll-option-bar-fill" style="width: 20%;"></div>
      </div>
      <div class="poll-option-votes">20%</div>
    </div>
  </div>
</div>
</template>

<style scoped>
/* Poll container */
.poll {
  /* margin: 10px; */

  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

</style>