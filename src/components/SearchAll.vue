<template>
  <h1>ツイート一覧</h1> 
  <div class="searchall">
    <!-- <div v-for="twitte in twittes"> 
      <p> {{ twitte.userId }} {{ twitte.date }} </p>
      <p> {{ twitte.context }} </p> -->
    <div v-for="n of 10" :key="n">
      <p v-bind:class="userId">ユーザID 登録日時</p>
      <p id="context">本文</p>
      <button>いいね</button>
    </div>
  </div>

</template>

<script></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchall{
  padding: 1em 1em;
  margin: auto;
  color: #5d627b;
  background: white;
  border-top: solid 5px #5d627b;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
  width: 50%;
}
</style>
