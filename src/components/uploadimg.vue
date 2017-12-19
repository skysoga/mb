<template>
  <div class="fix uploadimage">
    <span class="formBtn" :style="'background:url('+imgurl+') no-repeat;background-size:100%;'">
      <em v-show="!value">上传{{title}}</em>
      <input v-show="!value" ref="file" type="file" @change="selects()" >
      <ins v-show="value" class="delBtn" @click="reset()">删除</ins>
    </span>
  </div>
</template>
<script>
/* 图片上传组件说明：
上传图片是根据父级组件的:type类型保存图片
 */
export default {
  props:['type','title'],
  data(){
      return{
        value:'',
        imgurl:'',
        imgShow:false
      }
  },
  created(){
    document.addEventListener('click',(e)=>{
      if(e.target.localName=='img')return;
      if(this.imgShow){
        this.imgShow=false
      }
    },true)
  },
  methods:{
    selects(){
      var dom=this.$refs.file,
          img=dom.files[0]      
        if(!img){
          return ;
        }
        //图片不超过1MB
        if(img.size > 1048576){
          layer.msgWarn('图片文件过大，请上传1M以内的图片！')
          return false
        }
        if(!(img.type.indexOf('image')==0 && img.type && /\.(?:jpg|png|gif)$/.test(img.name)) ){
            alert('图片只能是jpg,gif,png');
            return ;
        }
        var reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (e)=>{
          var photo=new Image()
          photo.src=e.target.result
          photo.onload=()=>{
            var imgsrc=photo.src
            // 压缩尺寸1000像素以内
            photo.width>1000&&(imgsrc=this.compress(photo,1000))
            this.value='图片添加成功！等待提交保存'
            this.$parent.ajaxData[this.type]=imgsrc
            this.imgurl=imgsrc
          }
        }
    },
    reset(){
      this.$parent.ajaxData[this.type]=''
      this.imgurl=''
      this.value=''
    },
    compress(img,max){
      let canvas = document.createElement("canvas");  
      let ctx = canvas.getContext('2d');  
      let tCanvas = document.createElement("canvas");  
      let tctx = tCanvas.getContext("2d");  
      let initSize = img.src.length;
      let iwidth=img.width,iheight=img.height
      var bili=1
      if(img.width>max){
        bili=max/img.width
        img.width=max
        img.height=img.height*bili
      }
      let width = img.width;  
      let height = img.height;
      let ratio;  
      if ((ratio = width * height / 4000000) > 1) {  
        ratio = Math.sqrt(ratio);  
        width /= ratio;  
        height /= ratio;  
      } else {  
        ratio = 1;  
      }  
      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle = "#fff";  
      ctx.fillRect(0, 0, canvas.width, canvas.height);  
      let count;  
      if ((count = width * height / 1000000) > 1) {  
        count = ~~(Math.sqrt(count) + 1); 
        let nw = ~~(width / count);  
        let nh = ~~(height / count);  
        tCanvas.width = nw;  
        tCanvas.height = nh;  
        for (let i = 0; i < count; i++) {  
          for (let j = 0; j < count; j++) {  
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);  
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);  
          }  
        }  
      } else {  
        ctx.drawImage(img, 0, 0, width, height);
      }      
      let ndata = canvas.toDataURL('image/jpeg', 0.7);      
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;  
      return ndata;  
    }
  }
}
</script>
<style lang="scss" scoped>
.uploadimage{
  position: relative;
}
.formBtn{
  position: relative;
  border-radius: 3px;
  padding: 0 18px;
  background: #f2f3f5;
  color: #6c6c6c;
  border: 1px solid #e9e9e9;
  margin: .6em;
  height:10em;
  line-height: 10em;
  display: block;
  // float: left;
  text-align: center;
  cursor: pointer;
  input{
    opacity: 0;
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    border: 1px solid #e9e9e9;
    color: #666;
  }
}
.delBtn{
  position: absolute;
  z-index: 9;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  background: rgba(0,0,0,.5);
}
</style>
