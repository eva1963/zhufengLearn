/**
 * @autor: Eva
 * @Created by Eva on 2018/5/1.
 */
/*let str = "2018/4/30 17:50:23";

let ary = str.match(/\d+/g).map(item =>{
    return item < 10 ? item = '0'+ item : item;
});
let template = '{0}年{1}月{2}日 {3}时{4}分{5}秒',
    reg = /\{(\d+)\}/g;*/

/*
template.replace(reg,function (...arg) {
    arg[1] = ary[]
});
*/

let ary = [1,[2,[3,[4,5]]],6];
let ary1 =[a,[b,[c,[d,e]]],f] = ary;
console.log(ary1);
