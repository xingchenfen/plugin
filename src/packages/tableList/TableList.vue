<template>
    <div class="tableList" :style="sizeF">
        <!-- 设置头部的名称 第二个没有名称themeSet[1].name 默认时不要头部-->
        <div v-if="themeSet[1].value" :class="['rowHeader',themeStyle]" :style="{background:'rgba('+rgb+'1)',padding: linePadding}">
            <div class="colArea" 
            v-for="(item,i) in themeSet"
            :key="i"
            :style="{'margin-right':gutter,'flex-shrink':item.flex?item.flex:1}" v-html="item.value"></div>
        </div>
      
        <div class="rowBody" v-for="(list,index) in dataInfo" :key="index" 
        @click="rowClick(list,index)"
        :style="{background: index%2?('rgba('+rgb+opacity+')'):'',padding: linePadding}">
            <div class="colArea" 
            v-for="(item,i) in themeSet" :key="i"
            :style="{'margin-right':gutter,'flex-shrink':themeSet[i].flex}">
                 <slot :name="item.label" :row="list" :rowIndex="index" :columIndex="i">{{list[item.label]}}</slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'tableList',
    props:{
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
    },
    watch:{
        theme:{//把主题色转为RGB格式
            handler(val,newVal){
                if(!val)return;
                let arry = '';   //判断是三位还是六位
                if(val.length === 4){
                    for(let i = 1;i < val.length;i++){
                        arry=arry+parseInt("0x" + val[i] + val[i])+',';
                    }
                }else{
                    for(let i = 1;i < val.length;i += 2){
                        arry = arry+parseInt("0x" + val.slice(i,i+2))+',';
                    }
                }
                console.log(arry)
                this.rgb =arry;
            },
            immediate:true
        }
    },
    data(){
        return{
            rgb: '231,251,233',//主题色 转RGBA,
        }
    },
    methods:{
        rowClick(row,index){
            this.$emit('rowClick',row,index)
        },
        
    },
}
</script>
<style scoped>
.tableList{
    width: 100%;
    color: #666666;
 }
    .bold{
        font-weight: bold;
    }
    .black{
        color: #333;
    }
    
    .rowHeader,.rowBody{
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }  
    .colArea{
        width: 100%;
        overflow: hidden;
    }
    .rowHeader >.colArea:last-child{
        margin-right: 0!important;
    }
    .rowBody>.colArea:last-child{
        margin-right: 0 !important;
    }

</style>