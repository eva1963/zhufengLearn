/**
 * Created by Eva on 2018/4/24.
 */
let tabBox = document.getElementById('tabBox'),
    tabList = tabBox.getElementsByTagName('li'),
    divBox = document.getElementById('divBox'),
    divList = divBox.getElementsByTagName('div');

for (let i = 0; i < tabList.length; i++) {
    tabList[i].onmouseover  =function () {
        changeTab(i);
    }
}
function changeTab(_index) {
    for (let i = 0; i < tabList.length; i++) {
        divList[i].className = tabList[i].className = '';
    }
    tabList[_index].className = divList[_index].className = 'active';
}

