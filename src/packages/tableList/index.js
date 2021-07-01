import tableList from './TableList.vue';
// let tableList = {};
tableList.install = function(Vue, options) {
    Vue.component(tableList.name, tableList);
}
export default tableList;