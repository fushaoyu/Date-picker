<template>
  <div class="container">
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-date"
      :disabled="disabled"
      :size="size"
      :value="inputTime"
      @focus="getPicker"
      ref="myInput">
      <i
        slot="suffix"
        v-show="inputTime"
        style="cursor: pointer"
        class="el-icon-circle-close"
        @click="deleteDateTime"
      ></i>
    </el-input>

    <div class="myVueTime" id="myPanel" v-show="isShow" :class="placement=='top'? 'locationBottom':'locationTop'">
      <div class="TimeTitle" :style="{'background-color':theme }">
        <i class="el-icon-arrow-left" @click="formerYears"></i>
        <div @click="openYear">{{nowYear}}</div>
        <i class="el-icon-arrow-right" @click="future"></i>
      </div>
      <!--年-->
      <div class="MyYear" v-show="isYear">
        <div class="MyYearTitle">
          <i class="el-icon-arrow-left" @click="YearsBackwards"></i>
          年份
          <i class="el-icon-arrow-right" @click="YearsForward"></i>
        </div>
        <div class="content">
          <div class="MyYearNumber" v-for="item in yearList" @click="YearSelect(item)">
            {{item}}
          </div>
        </div>
      </div>

      <div v-show="!isMyYear">
        <!--月-->
        <div class="MyMonth" v-show="isMyMonth">
          <div class="MyMonthTitle">月份</div>
          <div class="content">
            <div class="MyMonthNumber" v-for="item in 12" @click="chaecMonth(item)">{{item}}</div>
          </div>
        </div>
        <!--日-->
        <div class="MyDay" v-show="isMyDay">
          <div class="MyDayTitle">日期</div>
          <div class="content">
            <div
              class="MyDayNumber"
              @click="chaeckDay(item)"
              v-for="item in monthNumber"
              :key="item">
              {{item}}
            </div>
          </div>
        </div>
        <!--时-->
        <div class="MyHour" v-show="isMyHour">
          <div class="MyHourTitle">小时</div>
          <div class="content">
            <div class="MyHourNumber" v-for="item in hour" @click="chaecHour(item)">{{item}}</div>
          </div>
        </div>
        <!--分-->
        <div class="MyMinute" v-show="isMyMinute">
          <div class="MyMinuteTitle">分钟</div>
          <div class="content">
            <div class="MyHourNumber" v-for="item in minute" @click="chaecMinute(item)">{{item}}</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { DateUtil,hour,minute } from './DateTime'
    export default {
      name: "fsy_Picker",
      props:{
        //输入框大小
        size:{
          type:String,
          default:'small',
        },
        //主题色
        theme:{
          type:String,
          default:'red'
        },
        //位置
        placement:{
          type:String,
          default:'bottom'
        },
        //格式
        format:{
          type:String,
          default:'YYYY-MM-dd HH:mm'
        },
        //禁用
        disabled:{
          type:Boolean,
          default:false
        }
      },
        data() {
            return {
              isShow:false,
              isMyYear:false,//选择年时关闭时分秒
              isYear:false,//年
              isMyMonth:true,//月
              isMyDay:false,//日
              isMyHour:false,//时
              isMyMinute:false,//分
              hour:hour,
              minute:minute,
              yearList:[],
              nowMonth:new Date().getMonth(), // 当前月
              nowYear:null, // 当前年
              nowDate:null,
              DateTime:null,
              inputTime:'',
              monthNumber:null,

            }
        },
        // 组件
        components: {},
        //生命周期
        mounted() {
          this.getYear();
          this.monthNumber = DateUtil.getMonthDays();
          this.My_getYear();
        },
       //方法
        methods: {
        //点击外面关闭时间选择
          hidePanel(e){
            if (!this.$el.contains(e.target)) {
              this.isShow = false;
            }
          },
          getPicker() {
            this.isShow = true;
            if (this.format == 'HH:mm') {
              this.isMyMonth=false;
              this.isMyHour=true;
            }
          },
          //获取年份
          My_getYear(){
            let nowYear = new Date().getYear();
            this.nowYear = nowYear+= (nowYear < 2000) ? 1900 : 0;
          },
          //往年
          formerYears() {
            this.nowYear--;
            this.inputTime = this.nowYear +'-'+ this.DateTime;
          },
          //未来
          future() {
            this.nowYear++;
            this.inputTime = this.nowYear +'-'+ this.DateTime;
          },
          //打开年份
          openYear() {
            if (this.format == 'HH:mm') {
              return false;
            }
            this.isYear = !this.isYear;
            this.isMyYear = !this.isMyYear
          },
          //选择年
          YearSelect(num) {
            this.isYear = false;//年
            this.isMyYear = false;//年
            if (this.DateTime) {
              this.inputTime = num +'-'+ this.DateTime;
            } else {
              this.inputTime = num
            }
            this.nowYear = num;
          },
        //选择月
          chaecMonth(num) {
            this.isMyMonth = false;
            this.isMyDay = true;
            let n = null;
            if (num < 10) {
              n = '0' + num
            } else {
              n = num
            }
            this.nowDate = n;
            this.DateTime = this.nowDate;
            this.monthNumber = DateUtil.getMonthDays(this.nowYear,num);
          },
          //选择日
          chaeckDay( num ) {
            this.isMyDay = false;
            let n = null;
            if (num < 10) {
              n = '0' + num
            } else {
              n = num
            }
            this.DateTime += '-'+n+' ';
            if (this.format == 'YYYY-MM-dd') {
              this.inputTime = this.nowYear +'-'+ this.DateTime;
              this.isShow = false;
              this.isMyMonth = true;
              this.My_getYear();
              this.$emit('input', this.inputTime);
              return false
            }
            this.isMyHour = true;
          },
          //选择时
          chaecHour( num ) {
            this.isMyHour = false;
            this.isMyMinute = true;
            if (this.format == 'HH:mm') {
              this.DateTime = num;
            } else {
              this.DateTime += num;
            }

          },
          //选择分
          chaecMinute( num ) {
            this.isShow = false;
            this.isMyMinute = false;
            this.isMyMonth = true;
            this.DateTime+=':'+num;

            if (this.format == 'YYYY-MM-dd HH:mm:ss') {
              this.inputTime = this.nowYear +'-'+ this.DateTime + ':00';
            } else if (this.format == 'YYYY-MM-dd HH:mm') {
              this.inputTime = this.nowYear +'-'+ this.DateTime;
            } else if (this.format == 'HH:mm') {
              this.inputTime = this.DateTime;
            }
            this.My_getYear();
            this.$emit('input', this.inputTime);
          },
          //清控
          deleteDateTime() {
            this.inputTime = '';
            this.$emit('input', '');
          },
          //生成年份
          getYear() {
            let myDate= new Date();
            let startYear=myDate.getFullYear()-10;//起始年份
            let endYear=myDate.getFullYear()+10;//结束年份
            const arr = [];
            for (let i=startYear;i<=endYear;i++) {
              arr.push(i)
            }
            this.yearList = arr;
          },
          //年向后
          YearsBackwards() {
            let num = this.yearList[0]
            let startYear=num-20;//起始年份
            let endYear=num;//结束年份
            const arr = [];
            for (let i=startYear;i<=endYear;i++) {
              arr.push(i)
            }
            this.yearList = arr;
          },
          //年向前
          YearsForward() {
            let num = this.yearList[this.yearList.length-1]
            let startYear=num;//起始年份
            let endYear=num+20;//结束年份
            const arr = [];
            for (let i=startYear;i<=endYear;i++) {
              arr.push(i)
            }
            this.yearList = arr;
          },
        },
      watch:{
        'isShow':function (val) {
          if (val) {
            document.addEventListener('click',this.hidePanel,false)
          } else {
              this.isYear = false;//年
              this.isMyYear = false;//年
              this.getYear();
              this.isMyMonth = true;//月
              this.isMyDay=false;//日
              this.isMyHour=false;//时
              this.isMyMinute=false;//分
            document.removeEventListener('click',this.hidePanel,false)
          }
        }
      }
    }
</script>

<style lang="less" scoped>
  .el-icon-arrow-left,.el-icon-arrow-right{
    cursor: pointer;
  }
  .locationTop{
    top:35px;
  }
  .locationBottom{
    bottom: 35px;
  }
  .container{
    position: relative;
    /deep/.el-input__suffix{
      top:7px;
    }
    .myVueTime{
      position: absolute;
      left: 0;
      width: 300px;
      min-height: 150px;
      background-color: white;
      box-shadow: 0px 5px 10px #E1F1FF;
      z-index: 9999;
      border-radius: 10px;
      .TimeTitle{
        width: 100%;
        height: 30px;
        background-color: red;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: white;
        border-radius: 10px 10px 0 0;
        div{
          cursor: pointer;
        }
      }
    }
    .MyYear{
      width: 100%;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding:0  10px 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      position: absolute;
      top:30px;
      left: 0;
      background-color: white;
      box-shadow: 0px 5px 10px #E1F1FF;
      border-radius: 5px;
      .MyYearTitle{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 30px;
      }
      .content{
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding-left: 15px;
        .MyYearNumber{
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 3px;
          border: solid 1px #E6E6E6;
          margin-right: 10px;
          margin-bottom: 8px;
          cursor: pointer;
          color: #999999;
        }
        .MyYearNumber:hover{
          background-color: #E1F0FF;
          color: #000000;
        }
      }
    }
    .MyMonth{
      width: 100%;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding:0  10px 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      .MyMonthTitle{
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .content{
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding-left: 15px;
        .MyMonthNumber{
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 30px;
          border: solid 1px #E6E6E6;
          margin-right: 10px;
          margin-bottom: 8px;
          cursor: pointer;
          color: #999999;
        }
        .MyMonthNumber:hover{
          background-color: #E1F0FF;
          color: #000000;
        }
      }
    }
    .MyDay{
      width: 100%;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding:0  10px 0 10px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .MyDayTitle{
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .content{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding-left: 15px;
        .MyDayNumber{
          width: 30px;
          height: 30px;
          border: solid 1px #E6E6E6;
          border-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
          margin-bottom: 10px;
          cursor: pointer;
          color: #999999;
        }
        .MyDayNumber:hover{
          background-color: #E1F0FF;
          color: #000000;
        }
      }

    }
    .MyHour{
      width: 100%;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding:0  10px 0 10px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .MyHourTitle{
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .content{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding-left: 15px;
        .MyHourNumber{
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 30px;
          border: solid 1px #E6E6E6;
          margin-right: 10px;
          margin-bottom: 8px;
          cursor: pointer;
          color: #999999;
        }
        .MyHourNumber:hover{
          background-color: #E1F0FF;
          color: #000000;
        }
      }
    }
    .MyMinute{
      width: 100%;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding:0  10px 0 10px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .MyMinuteTitle{
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .content{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        .MyHourNumber{
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 30px;
          border: solid 1px #E6E6E6;
          margin-right: 10px;
          margin-bottom: 8px;
          cursor: pointer;
          color: #999999;
        }
        .MyHourNumber:hover{
          background-color: #E1F0FF;
          color: #000000;
        }
      }
    }
  }

</style>
