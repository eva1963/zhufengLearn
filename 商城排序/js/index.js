/**
 * Created by Eva on 2018/4/24.
 */
// 获取元素
let header = document.getElementById('header'),
    headerList = header.getElementsByTagName('a'),
    list = document.getElementById('list'),
    productList = list.getElementsByTagName('li');

// Ajax获取数据
~function () {
    let xhr = new XMLHttpRequest(),
        productData = null;
    xhr.open('get', 'json/product.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            productData = JSON.parse(xhr.responseText);
        }
    };
    xhr.send(null);

    let str = '';
    for (let i = 0; i < productData.length; i++) {
        let {
            title,
            img,
            price,
            hot,
            time
        } = productData[i];
        str += `<li data-time="${time}" data-price="${price}" data-hot="${hot}">
            <img src="${img}"/>
            <p>${title}</p>
            <span>￥${price}</span>
        </li>`;
        list.innerHTML = str;
    }


    for (let i = 0; i < headerList.length; i++) {
        headerList[i].index = i;
        headerList[i].flag = -1;
        headerList[i].onclick = function () {
            this.flag *= -1;
            for (let j = 0; j < headerList.length; j++) {
                let item = headerList[j];
                if (item !== headerList[i]) {
                    item.flag = -1;
                }
            }
            sortList.call(this);
        }
    }

    function sortList() {
        let productAry = [].slice.call(productList);

        productAry.sort((a, b) => {
            let {index, flag} = this,
                ary = ['data-time', 'data-price', 'data-hot'],
                aInn = a.getAttribute(ary[index]),
                bInn = b.getAttribute(ary[index]);
            if (index === 0) {
                aInn = aInn.replace(/-/g, '');
                bInn = bInn.replace(/-/g, '');
            }
            return (aInn - bInn) * flag;
        });

        for (let i = 0; i < productAry.length; i++) {
            let item = productAry[i];
            list.appendChild(item);
        }
    }
}();