# fsy-date-picker

> A Vue.js project

## 此时间选择器是基于vue + element UI研发，使用时请确认是否是使用这两种框架。

# 使用方式
    npm i --save fsy-date-picker

    main.js文件引入

    import F_DatePicker from 'fsy-date-picker';

    Vue.use(F_DatePicker);

基本用法
    <F_DatePicker></F_DatePicker>

# 属性
参数	      说明	     类型	         可选值	         默认值

size	  输入框尺寸	string	large, small, mini      -

theme     主题色   string          -              red

placement 位置    string        top,bottom      bottom

disabled  禁用    Boolean       true,false      false

format    格式    string   YYYY-MM-dd,          YYYY-MM-dd HH:mm

                          YYYY-MM-dd HH:mm,

                          YYYY-MM-dd HH:mm:ss,

                          HH:mm




