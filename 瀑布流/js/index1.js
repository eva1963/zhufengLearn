/**
 * 完全基于原生js方案
 */

~function () {
    let imgData = null,
        page = 0,
        flowList = document.querySelectorAll('.flowBox > li');

    let getData = function () {
        let xhr = new XMLHttpRequest;
        xhr.open('get', `json/data.json?page=${page}`, false);
        xhr.onreadystatechange = function () {
            (this.readyState === 4 && this.status === 200) ? imgData = JSON.parse(xhr.responseText) : null;
        };
        xhr.send(null);
    };
    getData();

    let queryHTML = function ({title, pic, link}={}) {
        return `<a href="${link}"><div><img src="${pic}" alt=""></div><span>${title}</span></a>`;
    };

    let bindHTML = function () {
        let flowAry = [].slice.call(flowList);
        for (let i = 0; i < imgData.length; i += 3) {
            let item1 = imgData[i],
                item2 = imgData[i + 1],
                item3 = imgData[i + 2];

            flowAry.sort((a, b) => {
                return a.offsetHeight - b.offsetHeight;
            });

            if (item1) {
                flowAry[0].innerHTML += queryHTML(item1);
            }
            if (item2) {
                flowAry[1].innerHTML += queryHTML(item2);
            }
            if (item3) {
                flowAry[2].innerHTML += queryHTML(item3);
            }
        }

    };
    bindHTML();
}();