<template>
      <div id="player" ></div>
</template>
<script>
  export default {
    props: ['fData'],
    data() {
      return {
        vodPlayerJs: 'https://player.polyv.net/script/player.js',
        vid:this.fData,
      };
    },
    mounted(){
        // this.loadPlayerScript(this.loadPlayer);

    },
    watch:{   // 使用监听的方式，监听数据的变化
      // fData(val){
      //   this.vid = val;
      //   this.$forceUpdate()
      // },
      fData:{
        handler(newValue){

          console.log(newValue)
          if (newValue !==''){
            if (this.player) {
              this.player.destroy();
            }
            this.vid = newValue;
            this.loadPlayerScript(this.loadPlayer);
          }
        },
        immediate:true
      }
    },

    methods: {
      loadPlayerScript(callback) {
        if (!window.polyvPlayer) {
          const myScript = document.createElement('script');
          myScript.setAttribute('src', this.vodPlayerJs);
          myScript.onload = callback;
          document.body.appendChild(myScript);
        } else {
          callback();
        }
      },

      loadPlayer() {
        const polyvPlayer = window.polyvPlayer;
        this.player = polyvPlayer({
          wrap: '#player',
          width: '100%',
          height: 230,
          vid: this.vid ,
          adSkip: true, //是否显示跳过广告的按钮，默认为false
          adMatter: [{ // 广告参数详细配置
            location: 4, //广告位置： 1 片头广告，2 暂停广告，3 片尾广告，4 弹窗广告
            adtype: 1,  //广告资源类型： 1 图片广告，2 视频广告，3 swf广告（flash播放器生效）
            matterurl: 'https://myDomain.com/ad.mp4', //广告资源URL
            addrurl: 'http://www.polyv.net/', //广告点击跳转链接
            timesize: 3, //广告时长，单位：秒
            cataid: 1560331332756, //需播放广告的视频分类ID,默认为1
            poplocation: 1, //弹窗广告位置（1 右下角，2 右上角，3 左下角，4 左上角）
            popuptime: 5,//弹窗广告出现的时间(移动端无效)，单位：秒
            skiptime: 1, //广告跳过按钮出现时间
            skipenabled: true,//是否显示跳过按钮
            skipbutton: '跳过'//跳过按钮提示文案
          }]
        });
      }
    },
    destroyed() {
      if (this.player) {
        this.player.destroy();
      }
    },
  };
</script>

