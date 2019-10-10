<template lang="html">
  <div class="home com_border">
    <h2>Home组件<button @click='fetchData'>Mock请求数据</button></h2>
        
    <div>
      <ul>
        <li>
          <router-link to="/home/news">News</router-link>
          <router-link to="/home/message">Message</router-link>
        </li>
      </ul>

      <div>
        <router-view></router-view>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  methods: {
    fetchData() {
      let url = "/hotFood"
      // let url = "/cold"
      // let url = "/drink"
      axios
        .get(url)
        .then(function(response) {
          console.log(response); // 得到数据
          let {data:{data:detailArr}} = response
          let {foodDetail} =detailArr
          console.log(foodDetail[0]);
          

        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="less">
.home h2 {
  font-size: bold;
  color: green;
}
</style>
