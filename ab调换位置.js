//结构解析方法调换a,b的位置
var a =10;
var b =20;
[a,b]= [b,a];
console.log(a,b);
//还有方法是用一个c来调换位置，或者用求和的方式；
//=>让A和B交换数据
var a=10;
var b=20;
var c=a;
a=b;
b=c;
console.log(a,b);

//=>让E和F交换数据
var e=10;
var f=20;
e=e+f;
f=e-f;
e=e-f;
console.log(e,f);


