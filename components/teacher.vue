<template>
    <div class="main">
        <div class="header">
            <div><img src="../assets/back.png" alt=""></div>
            <div @click="goindex"><span>返回</span></div>
        </div>
        <div v-for="(item,index) in info">
            <div class="logo">
<!--              <img :src="item.img" alt="" v-if>-->
              <img src="../assets/teacher2x.png">
            </div>
            <div class="text">
                <div>
                    <span>{{item.title}}</span>
                </div>
                <div>
                    <span>{{item.content}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data(){
            return{
                info:'',
            }
        },
      created () {
        axios({
          url: '/apis/index.php/v2/trail/lesson?sid=88&lid=663',
          method: 'get',
          headers: {
            "Content-Type":"application/json"
          },
        }).then(res => {
          this.info=res.data.data.teachers
        })
      },
      methods:{
          goindex(){
            this.$router.push('/')
            this.$router.go(0)
          }
      }
    }
</script>

<style lang="less">
    * {
        margin: 0;
        padding: 0;
    }

    .header {
        width: 375px;
        height: 40px;
        background: #FFFFFF;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.08);
        opacity: 1;
        display: flex;
        justify-content: left;
        align-items: center;

        >div:nth-child(1) {
            margin: 6px 0 0 14px;
        }

        >div:nth-child(2) {
            margin: 3px 0 0 3px;
            >span {
                height: 20px;
                font-size: 14px;
                font-weight: 400;
                line-height: 22px;
                color: #A2A2A2;
                opacity: 1;
            }
        }

    }
    .logo{
        margin: 30px 0 0 143px;
        width: 90px;
        height: 90px;
        background: rgba(0, 0, 0, 0);
        border: 3px solid #04A7EC;
        border-radius: 50%;
        opacity: 1;
        img{
            width: 90px;
            height: 90px;
        }
    }
    .text{
        >div:nth-child(1){
            margin: 30px 0 0 161px;
            width: 54px;
            height: 25px;
            font-size: 18px;
            font-weight: 600;
            line-height: 25px;
            color: #333333;
            opacity: 1;
        }
        >div:nth-child(2){
            margin: 10px 0 0 30px;
            width: 315px;
            height: 87px;
            font-size: 12px;
            font-weight: 400;
            line-height: 17px;
            color: #666666;
            opacity: 1;
        }
    }

</style>
