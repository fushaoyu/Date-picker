var now = new Date(); // 当前日期
var nowDayOfWeek = now.getDay(); // 今天本周的第几天
var nowDay = now.getDate(); // 当前日
var nowMonth = now.getMonth(); // 当前月
var nowYear = now.getYear(); // 当前年
nowYear += (nowYear < 2000) ? 1900 : 0;

var DateUtil = {
  /**
   * 获得当前日期
   *
   * @returns
   */
  getNowDay : function() {
    return this.formatDate(new Date());
  },
  /**
   * 获得本周的开始时间
   *
   * @returns
   */
  getStartDayOfWeek : function() {
    var day = nowDayOfWeek || 7;
    return this.formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 1 - day));
  },
  /**
   * 获得本周的结束时间
   *
   * @returns
   */
  getEndDayOfWeek : function() {
    var day = nowDayOfWeek || 7;
    return this.formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 7 - day));
  },
  /**
   * 获得本月的开始时间
   *
   * @returns
   */
  getStartDayOfMonth : function() {
    var monthStartDate = new Date(nowYear, nowMonth, 1);
    return this.formatDate(monthStartDate);
  },
  /**
   * 获得本月的结束时间
   *
   * @returns
   */
  getEndDayOfMonth : function() {
    var monthEndDate = new Date(nowYear, nowMonth, this.getMonthDays());
    return this.formatDate(monthEndDate);
  },
  /**
   * 获得本月天数
   *
   * @returns
   */
  getMonthDays : function(Y,M) {
    var days = null;
    var monthStartDate=null;
    var monthEndDate=null;
    if (Y&&M) {
      monthStartDate = new Date(Y, M, 1);
      monthEndDate = new Date(Y, M + 1, 1);
    } else {
      monthStartDate = new Date(nowYear, nowMonth, 1);
      monthEndDate = new Date(nowYear, nowMonth + 1, 1);
    }
    days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
  },
  /**
   * @param 日期格式化
   * @returns {String}
   */
  formatDate : function(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();

    if (mymonth < 10) {
      mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
      myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
  }
};
//小时
const hour = [
  '01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','00'
];
//分
const minute = [
  '00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'
];

export  {
  DateUtil,
  hour,
  minute
}
