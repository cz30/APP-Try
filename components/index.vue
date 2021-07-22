<template>
    <div class="main">
<!--        视频播放区-->
        <player v-bind:fData="data1"></player>
<!--        <div class="mv" @click="showPopup1">-->
<!--        </div>-->
<!--        视频标题区-->
        <div class="mv_title"  @click="showPopup2">
            <div class="top_text">
                <span>[视频]</span>
                <span>{{mvText.title}}</span>
            </div>
            <div class="bottom_text">
                <span>￥{{mvText.price}}</span>
                <span>免费试看</span>
                <span>{{mvText.trail_views}}已试看</span>
            </div>
            <div class="hr"></div>
        </div>
<!--        老师信息区-->
        <div class="teacher" @click="toInfo">
            <div>
                <span>授课老师</span>
            </div>
            <div class="flexbox">
                <div class="box" v-for="(item,index) in teacher">
                    <div>
                        <img :src="item.img" alt="" v-if>
                        <img src="../assets/teacher1.png">
                    </div>
                    <div>
                        <span>{{item.title}}</span><br>
                        <span>主讲老师</span>
                    </div>
                    <div>
                        <img src="../assets/toteacher.png">
                    </div>
                </div>
            </div>
        </div>
<!--        课程章节区-->
        <div class="chapter"
             v-for="(item,index) in chapter"
             @click="watchChapter(index,item)"
             :class="{'active span':isActive===index}"
        >
            <div class="total">
                <div>
                    <img src="../assets/play.png" alt="" v-if="isActive === index">
                  <img src="../assets/unplay.png" alt="" v-else>
                </div>
                <div class="text" >
                    <span>{{item.title}}</span><br>
                    <span>课程时长：{{item.vtime}}</span>
                </div>
                <div>
                    <img src="../assets/button-play.png" alt="" v-if="item.trail===true">
                    <img class="move" src="../assets/button-lock.png" alt="" v-else>
                </div>
            </div>
            <div class="hr"></div>

        </div>
        <!--        vant插件区-->
        <!--        无法试看弹窗-->
        <van-popup v-model="showUnRegister" closeable round>
            <div class="popup1">
                <div>该视频不提供试看</div>
                <div>您可咨询“春华教育”继续学习</div>
                <div>联系电话：{{school}}</div>
                <van-button type="info" @click="callPhone(school)">立即联系</van-button>
                <div @click="showUnRegister=false">稍后联系</div>
            </div>
        </van-popup>
        <!--        注册弹窗-->
        <van-popup v-model="showRegister" closeable round>
            <div class="popup2">
                <div>用户注册</div>
                <div>输入手机号注册 </div>
                <div>解锁更多专业视频</div>
                <div><input type="number" placeholder="请输入手机号" v-model="phonenumber"></div>
                <van-button type="info" @click="register">立即注册</van-button>
            </div>
        </van-popup>
        <!--        注册成功弹窗-->
        <van-popup v-model="showSuccess" closeable round>
            <div class="popup3">
                <div>注册成功！</div>
                <van-button type="info">继续观看</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import axios from 'axios'
    import player from './player'
    export default {
        data() {
            return {
                showSearch:false,
                phonenumber:'',
                school:'',
                isActive: false,
                data1: '88083abbf5bcf1356e05d39666be527a_8',
                mvText: '',
                mvUrl: '',
                teacher: '',
                chapter:'',
                trail:'',
                //弹框设置
                showUnRegister: false,
                showRegister: false,
                showSuccess:false,
            }
        },
        components: {
          player,
        },
        created() {
          axios({
            url: '/apis/index.php/v2/trail/lesson?sid=88&lid=663',
            method: 'get',
            headers: {
              "Content-Type":"application/json"
            },
          }).then(res => {
            console.log(res.data)
            this.mvText=res.data.data
            this.teacher=res.data.data.teachers
            this.chapter=res.data.data.videos
            this.school=res.data.data.school.concat_phone
            console.log(this.chapter)
            // console.log(res.data.data.videos[0].trail)
          })
        },
        mounted() {
          // this.$toast('提示文案');
        },
        methods:{
            showPopup1() {
                this.showUnRegister = true;
            },
            callPhone(school){
              window.location.href = 'tel://' + school
            },
            showPopup2() {
              if (localStorage.getItem('key') === 'alreadyReg'){
                console.log("已登录")
              }else {
                console.log("未登录")
                this.showRegister = true;
              }
            },
            register(){
              axios({
                url: '/apis/index.php/v2/trail/create',
                method: 'post',
                data:{
                  lid:663,
                  uid:1134,
                  sid:88,
                  phone:this.phonenumber
                },
              }).then(res=>{
                console.log(res)
                if (res.data.code===0){
                  localStorage.setItem('key','alreadyReg')
                  this.$toast.success('验证成功！');
                  this.showRegister = false;
                  this.showSuccess = true;
                }else {
                  this.$toast.fail('手机号码格式不正确！');
                }
              })
            },
            showPopup3() {
                this.showSuccess = true;
            },
            toInfo(){
                this.$router.push('/teacher')
            },
            watchChapter(index,item){
              this.showSearch = ! this.showSearch;
              this.isActive = index;
              if (item.trail===false){
                this.showUnRegister = true;
              }else{
                this.data1=item.video
                console.log(item.video)
              }
            }

        },
    }
</script>

<style lang="less">
  * {
    margin: 0;
    padding: 0;
  }
  .active span{
    color: #04A7EC !important;
  }
  .img{
    width: 10rem;
  }

  .header {
    width: 10rem;
    height: 40px;
    background: #FFFFFF;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.08);
    opacity: 1;
    display: flex;
    justify-content: left;
    align-items: center;

    >div:nth-child(1) {
      margin: -13px 0 0 0.338rem;
    }

    >div:nth-child(2) {
      margin: -16px 0 0 0.072rem;
      >span {
        height: 20px;
        font-size: 0.338rem;
        font-weight: 400;
        line-height: 22px;
        color: #A2A2A2;
        opacity: 1;
      }
    }

  }

  .mv_title {
    margin-top: 0.4rem;
    .top_text {
      padding: 7px 0;
      span:nth-child(1) {
        height: 25px;
        font-size: 0.434rem;
        font-weight: bold;
        line-height: 25px;
        color: #04A7EC;
        opacity: 1;
        margin-left: 0.241rem;
      }

      span:nth-child(2) {
        height: 25px;
        font-size: 0.434rem;
        font-weight: bold;
        line-height: 25px;
        color: #333333;
        opacity: 1;
        margin-left: 0.241rem;
      }
    }

    .bottom_text {
      margin-top: 0.1rem;
      span:nth-child(1) {
        height: 22px;
        font-size: 0.386rem;
        font-weight: bold;
        line-height: 22px;
        color: #999999;
        opacity: 1;
        margin-left: 0.241rem;
        text-decoration: line-through;

      }

      span:nth-child(2) {
        height: 22px;
        font-size: 0.386rem;
        font-weight: 400;
        line-height: 22px;
        color: #FF6666;
        opacity: 1;
        margin-left: 0.241rem;

      }

      span:nth-child(3) {
        height: 20px;
        font-size: 0.338rem;
        font-weight: 400;
        line-height: 20px;
        color: #999999;
        opacity: 1;
        margin-left: 4rem;

      }
    }

    .hr {
      width: 9.574rem;
      height: 1px;
      background: #F5F5F5;
      opacity: 1;
      margin: 10px 0.241rem 0 0.241rem;
    }
  }

  .teacher {
    margin-top: 0.3rem;
    overflow-y:auto;/*可滑动*/
    div:nth-child(1) > span {
      height: 20px;
      font-size: 0.338rem;
      font-weight: 400;
      line-height: 20px;
      color: #333333;
      opacity: 1;
      margin-left: 0.241rem;
    }
    .flexbox{
      display: flex;
      margin-top: 8px;
      /*老师信息盒子*/
      .box {
        overflow: hidden;
        margin-left: 0.241rem;
        width: 3.526rem;
        height: 60px;
        background: #F5F5F5;
        opacity: 1;
        border-radius: 4px;
        display: flex;
        /*头像区*/
        div:nth-child(1){
          margin: -3% 0 10px 0.241rem;
          /*width: 3.526rem;*/
          background: #F5F5F5;
          opacity: 1;
          border-radius: 4px;
        }
        /*名字+职位*/
        div:nth-child(2){
          margin: 12px 0 0 0.241rem;
          width: 4.83rem;
          font-size: 0;
          >span:nth-child(1){
            width: 1.352rem;
            height: 20px;
            font-size: 0.338rem;
            font-weight: bold;
            line-height: 20px;
            color: #333333;
            opacity: 1;
          }
          >span:nth-child(3){
            padding-top: 1rem;
            width: 0.966rem;
            height: 14px;
            font-size: 0.241rem;
            font-weight: 400;
            line-height: 14px;
            color: #999999;
            opacity: 1;
          }
        }
        /*按钮*/
        div:nth-child(3){
          margin-top: 22px;
        }
      }
    }

  }

  .class_title{
    margin-top: 12px;
    height: 50px;
    background: #F5F5F5;
    opacity: 1;
    >span{
      margin: 14px 0 0 0.289rem;
      width: 4.758rem;
      height: 22px;
      font-size: 0.386rem;
      font-weight: 400;
      line-height: 22px;
      color: #333333;
      opacity: 1;
    }
  }

  .chapter{
    width: 10rem;
    height: 72px;
    background: #FFFFFF;
    opacity: 1;
    margin-top: 5px;
    .total{
      display: flex;
      >div:nth-child(1){
        margin: 27px 0 0 0.24rem;
      }
      .text{
        width: 6.478rem;
        line-height: 20px;
        margin: 14px 0 0 0.338rem;
        font-size: 0;

        >span:nth-child(1){
          /*width: 3.478rem;*/
          height: 22px;
          font-size: 0.386rem;
          font-weight: bold;
          line-height: 22px;
          color: #999999;
          opacity: 1;
        }
        >span:nth-child(3){
          margin-top: 4px;
          width: 2.463rem;
          height: 17px;
          font-size: 0.29rem;
          font-weight: 400;
          line-height: 17px;
          color: #999999;
          opacity: 1;
        }
      }
      .move{
        margin-left: 25px;
      }
      >div:nth-child(3){
        margin: 21px 0 0 0.5rem ;
      }


    }
    .hr{
      margin: 0.2rem 0.241rem 0 0.24rem;
      width: 9.574rem;
      height: 1px;
      background: #F5F5F5;
      opacity: 1;
    }
  }
  /*弹窗区*/
  .van-popup--center{
    top: 29% !important;
  }
  /*未注册提示弹窗*/
  .popup1{
    width: 7.246rem;
    height: 209px;
    background: #FFFFFF;
    opacity: 1;
    border-radius: 0.241rem;
    >div:nth-child(1){
      margin: 35px 0 0 1.884rem;
      width: 3.478rem;
      height: 25px;
      font-size: 0.434rem;
      font-weight: bold;
      line-height: 25px;
      color: #333333;
      opacity: 1;

    }

    >div:nth-child(2){
      margin: 18px 0 0 1.111rem;
      height: 22px;
      font-size: 0.386rem;
      font-weight: 400;
      line-height: 28px;
      color: #484848;
      opacity: 1;
    }
    >div:nth-child(3){
      margin: 4px 0 0 1.545rem;
      height: 22px;
      font-size: 0.386rem;
      font-weight: 400;
      line-height: 28px;
      color: #484848;
      opacity: 1;
    }
    >button{
      margin: 22px 0 0 0.386rem;
      width: 6.521rem;
      height: 42px;
      background: #04A7EC;
      opacity: 1;
      border-radius: 4px;
    }
    >div:nth-child(5){
      margin: 16px 0 0 3.043rem;
      height: 17px;
      font-size: 0.289rem;
      font-weight: 400;
      line-height: 17px;
      color: #999999;
      opacity: 1;
    }

  }
  /*注册弹窗*/
  .popup2{
    width: 7.246rem;
    height: 230px;
    background: #FFFFFF;
    opacity: 1;
    border-radius: 0.241rem;
    >div:nth-child(1){
      margin: 14px 0 0 2.946rem;
      height: 20px;
      font-size: 0.338rem;
      font-weight: 400;
      line-height: 20px;
      color: #333333;
      opacity: 1;

    }

    >div:nth-child(2){
      margin: 18px 0 0 2.149rem;
      height: 22px;
      font-size: 0.434rem;
      font-weight: bold;
      line-height: 25px;
      color: #333333;
      opacity: 1;
    }
    >div:nth-child(3){
      margin: 4px 0 0 1.884rem;
      height: 22px;
      font-size: 0.434rem;
      font-weight: bold;
      line-height: 25px;
      color: #333333;
      opacity: 1;
    }
    >div:nth-child(4)>input{
      margin: 20px 0 0 0.386rem;
      width: 6.521rem;
      height: 42px;
      background: #FFFFFF;
      border: 1px solid #E0E0E0;
      opacity: 1;
      border-radius: 5px;
      font-size: 20px;
    }
    /*修改提示字体样式*/
    >div:nth-child(4)>input::-webkit-input-placeholder{
      height: 20px;
      font-size: 0.386rem;
      font-weight: 400;
      line-height: 20px;
      color: #999999;
      opacity: 1;
      position: absolute;
      left: 0.265rem;
      top: 13px;
    }
    >button{
      margin: 10px 0 0 0.386rem;
      width: 6.521rem;
      height: 42px;
      background: #04A7EC;
      opacity: 1;
      border-radius: 4px;
      font-size: 0.338rem;
      font-weight: 400;
    }


  }
  /*注册成功弹窗*/
  .popup3{
    width: 7.246rem;
    height: 155px;
    background: #FFFFFF;
    opacity: 1;
    border-radius: 0.241rem;
    >div:nth-child(1){
      margin: 54px 0 0 2.608rem;
      width: 3.478rem;
      height: 25px;
      font-size: 0.434rem;
      font-weight: bold;
      line-height: 25px;
      color: #333333;
      opacity: 1;

    }
    >button{
      margin: 60px 0 0 0.386rem;
      width: 6.521rem;
      height: 42px;
      background: #04A7EC;
      opacity: 1;
      border-radius: 4px;
    }
  }
</style>
