/*实现 一个$attr(domId,name,value)遍历id是domId的，内部属性为name且值为value的元素
 let $attr = (domID, name, value) => {

 let tagList = document.getElementsByTagName('*');
 tagList = [...tagList]; //基于ES6展开运算符
 tagList = tagList.filter(item => {
 return this.id == domID && this.getAttribute(name) == value;
 })
 return tagList;
 };
 */

/*算法:
 递归
 去重
 冒泡排序
 插入排序
 快速排序
 时间复杂度
 空间复杂度
 KMP
 ...
 */
//=>递归： 函数自己调用自己执行的就是递归(递归是基于条件判断的，因为我们不能形成死递归，在某个条件下我们需要结束递归操作)
/*function fn() {
 fn();
 }
 fn();*/

//1-100之间获取既是3也是5倍数的和
/*function fn(n) {
    if (n > 100) return 0;
    if (n % 15 === 0) {
        return n + fn(n + 1);
    }
    return fn(n + 1);
}
fn(1);*/

//数组扁平化
/*let ary = [1,[2,[3,[4,5]]],6];
let [a,[b,[c,[f,d]]],r] = [...ary];
let ary1 = [a, b, c, f, d, r];
console.log(ary1);*/

/*ES6的继承
class point {
    constructor() {
        this.x =10;
        this.y = 20;
    }
    getX() {
        console.log(2222);
    }
}
point.prototype.AA = function () {
    console.log('111');
};
let f = new point();
console.log(f.__proto__.constructor === f.constructor);
console.log(f.constructor === point);
console.log(point.__proto__);
point.prototype.getX();*/

/*

let str = '珠峰zhufeng哈哈，eva培训,good good study';
str = str.replace(/[a-zA-Z]+/g,' $& ');
str = str.replace(/^[a-zA-Z]+\s{2}$/g,(...arg)=>{
    console.log(arg);
});
console.log(str);
*/




