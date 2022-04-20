<template>
  <div id="new_twitte">
    <input type="text" id="text" v-model="text">
    <div id="error">
        {{ message }}
    </div>
    <button v-on:click="onClick()" type="submit" id="submit">ツイート</button>
  </div>

  

</template>



<script>
export default {
    data: () => {
        return{
        message: '',
        text: ''
        }
    },
     methods: {
         onClick() {
            if(this.text.length > 140){
                this.message = '140文字以内で入力してください'
                return
            }
            if(this.text.length == 0){
                this.message = '文字数0の状態で投稿できません'
                return
            }

            fetch('http://localhost:3000/POST', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'POST_USER_ID': 'testuser',
                    'POST_DATETIME': new Date().toLocaleString(),
                    'POST_TEXT': this.text,
                    'REPLY_POST_ID': null,
                    'POST_IMAGE_ID': null
                })
            })
            this.message = 'ツイートしました'
            //location.reload()
            
        }
     }
}

// const app = new Vue({
//     data: () =>({
//         message: '',
//         text: '',
//         datetime: '',
//         userId: 'testuser',
//     }),
//     methods: {
//         onClick: function(event){
//             if(text.length > 140){
//                 this.message = '140文字以内で入力してください'
//                 return
//             }
//             if(this.text.length == 0){
//                 this.message = '文字数0'
//                 return
//             }

//             this.datetime = new Date().toLocaleString()

//             fetch('http://localhost:3000/POST', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     'POST_USER_ID': this.userId,
//                     'POST_DATETIME': this.datetime,
//                     'POST_TEXT': this.text,
//                     'REPLY_POST_ID': null,
//                     'POST_IMAGE_ID': null
//                 })
//             })

//             location.reload()
//         }
//     }
// })
// //app.mount('#new_twitte')
</script>

<style scoped>
#error{
    color: red;
}
</style>