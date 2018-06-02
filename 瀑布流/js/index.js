/**
 * 利用jquery简化版瀑布流
 */
$(function () {
    let page = 0,
        imgData = null,
        isRun = false;
    let getData = function () {
        page++;
        $.ajax({
            url: `json/data.json?page=${page}`,
            method: 'GET',
            async: false,
            dataType: 'json',
            success: res => imgData = res
        });
    };
    getData();

    let $boxList = $('.flowBox > li');
    let bindHTML = function () {
        for (let i = 0; i < imgData.length; i+=3) {
            $boxList.sort((a, b) => $(a).outerHeight() - $(b).outerHeight())
                .each((index, curLi) => {
                    let item = imgData[i + index];
                    if (!item) return;
                    let {title, pic, link} = item;
                    $(`<a href="${link}"><div><img src="${pic}" alt=""></div><span>${title}</span></a>`).appendTo($(curLi));
                });
        }
        isRun = false;
    };
    bindHTML();

    $(window).on('scroll',()=>{
        let winH = $(window).outerHeight(),
            pageH = document.documentElement.scrollHeight,
            scrollT = $(window).scrollTop();
        if((scrollT+100) >= pageH- winH) {

            if(isRun) return;
            isRun = true;
            if(page >3) {
                alert('没有更多了');
                return;
            }
            getData();
            bindHTML();
        }
    });
});


