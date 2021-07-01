# star-npm-tablelist

$ npm install -g vue-cli
$ vue init webpack-simple my-project
$ cd my-project
$ npm install
> A Vue.js project
修改package.json
"private": true,===》false
+ "main": "./dist/TableList.js",//打包后的组件
修改webpack.config.js 
+ const NODE_ENV = process.env.NODE_ENV;
- entry: './src/main.js',
- output: {
-    path: path.resolve(__dirname, './dist'),
-    publicPath: '/dist/',
-    filename: 'build.js'
- },
+ entry: NODE_ENV == 'development' ? './src/main.js' : './src/packages/tableList/index.js',
+ output: {
+    path: path.resolve(__dirname, './dist'),
+    publicPath: '/dist/',
+    filename: 'TableList.js',
+    library: 'TableList',
+    libraryTarget: 'umd',
+ },
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).


/**移动端配置  1rem=100px*/

#<tableList :themeSet="setInfo" :dataInfo="dataInfo" > #@rowClick="rowClick"//行点击事件
#    <template slot="time" slot-scope="{row,rowIndex,columIndex}" >
#         {{row.time}}12{{rowIndex}}-{{columIndex}}
#    </template>
#    <template slot="speed" slot-scope="{row}" >
#        {{row.speed=='未完成'?'error':row.speed}}
#    </template>
#  </tableList>


//设置table
setInfo:[
    {label:'name',value:'姓名',slotBool:false,flex:20},
    {label:'homeworkNum',value:'完成率',slotBool:true,flex:19},
    // {label:'tfRate',value:'正确率',slotBool:false,flex:20},excelFieldTfFinish
    {label:'userId',value:'详情',slotBool:true,flex:21},
],
//数据
dataInfo:[{
    name: '全部完成',
    homeworkNum: 50,
    userId: 50,
},]

//参数配置
    gutter: {/**列间距 */
        type: String,
        default: '10px',
    },
    /**设置要显示的内容 设置的是表头 */
    /**label要显示的字段(表格内容根据label来取) value表头的内容(如果第二条的value为空 表头隐藏) slot为true就是有插槽 flex:设置width 大小**/
    themeSet:{
        type:Array,
        required:true,
        // default:()=>{ 
        //     return [
        //         {label:'',value:'',slotBool:false,flex:1},
        //         {label:'',value:'',slotBool:false,flex:1},
        //         {label:'',value:'',slotBool:false,flex:1},
        //         {label:'',value:'',slotBool:false,flex:1},
        //         {label:'',value:'',slotBool:true,flex:1},
        //     ];
        // }, 
        // required: true,
    },
    /*传的数据*/
    dataInfo:{
        type:Array,
        required:true,
    },
    themeStyle:{/**table表头样式 */
        type: String,
        default: 'bold black'
    },
    theme:{/**主题颜色 */
        type:String,
        default:'#E7FBE9',
    },
    sizeF:{/**字体大小 */
        type: Object,
        default: ()=>{
            return {'font-size':'0.28rem','line-height':'0.32rem'};
        },
    },
    /**设置每一行的padding */
    linePadding:{
        type:String,
        default: '0.14rem 0',
    },
    //设置一行的背景透明的
    opacity:{
        type:Number,
        default: 0.4
    }