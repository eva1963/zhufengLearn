~ function() {
    let bannerRender = (function() {
        let container = document.querySelector('.container'),
            wrapper = document.querySelector('.wrapper'),
            focus = document.querySelector('.focus'),
            arrowLeft = document.querySelector('.arrowLeft'),
            arrowRight = document.querySelector('.arrowRight'),
            slideList = null,
            focusList = null,
            page = 0,
            stepIndex = 0,
            interval = 1000,
            speed = 200,
            timer = null;

        let getData = function() {
            return new Promise(resolve => {
                let xhr = new XMLHttpRequest;
                xhr.open('get', 'json/banner.json');
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let data = JSON.parse(xhr.responseText);
                        resolve(data);
                    }
                }
                xhr.send(null);
            })
        }

        let bindHTML = function(data) {
            let slideStr = ``,
                focusStr = ``;

            data.forEach(({ img, desc }, index) => {
                slideStr += `<div class="slide"><img src="${img}" alt="${desc}"></div>`;
                focusStr += `<li class="${index === 0 ? 'active' :''}"></li>`;
            });
            wrapper.innerHTML = slideStr;
            focus.innerHTML = focusStr;

            slideList = wrapper.querySelectorAll('.slide');
            focusList = focus.querySelectorAll('li');

            wrapper.appendChild(slideList[0].cloneNode(true));
            slideList = wrapper.querySelectorAll('.slide');

            utils.css(wrapper, 'width', utils.css(container, 'width') * slideList.length);
        }

        let autoMove = () => {
            stepIndex++;
            if (stepIndex >= slideList.length) {
                utils.css(wrapper, 'left', 0);
                stepIndex = 1;
            }
            animate(wrapper, {
                left: -stepIndex * utils.css(container, 'width')
            }, 200)
            changeFocus();
        }

        let changeFocus = () => {
            let tempIndex = stepIndex;
            stepIndex === 4 ? tempIndex = 0 : null;
            utils.each(focusList, (index, item) => {
                item.className = tempIndex === index ? 'active' : '';
            })
        }

        let bindFocus = function() {
            utils.each(focusList, (index, item) => {
                item.onclick = function() {
                    if (stepIndex === index) return;
                    stepIndex = index;
                    animate(wrapper, {
                        left: -stepIndex * utils.css(container, 'width')
                    }, 200)
                    changeFocus();
                }
            })
        }

        let handleContainer = (ev) => {
            container.onmouseenter = () => {
                clearInterval(timer);
            }
            container.onmouseleave = () => {
                timer = setInterval(autoMove, interval);
            }
        }


        let handleArrow = () => {
            arrowLeft.onclick = function() {
                stepIndex--;
                if (stepIndex < 0) {
                    utils.css(wrapper, 'left', -(slideList.length - 1) * utils.css(container, 'width'));
                    stepIndex = slideList.length - 2;
                }
                animate(wrapper, {
                    left: -stepIndex * utils.css(container, 'width')
                }, 200)
                changeFocus();
            }
            arrowRight.onclick = autoMove;
        }

        return {
            init: function() {
                let promise = getData();
                promise.then(bindHTML).then(() => {
                    timer = setInterval(autoMove, interval);
                }).then(() => {
                    bindFocus();
                    handleContainer();
                    handleArrow();
                })
            }
        }
    })();
    bannerRender.init();
}();