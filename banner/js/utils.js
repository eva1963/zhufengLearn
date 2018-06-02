let utils = (function() {
    let getCss = (ele, attr) => {
        let value, reg = null;
        if ('getComputedStyle' in window) {
            value = getComputedStyle(ele)[attr];
            reg = /^-?\d+(\.\d+)?(px|em|rem|pt)$/i;
            if (isNaN(value)) {
                reg.test(value) ? value = parseFloat(value) : null;
            }
        }
        return value;
    }

    let setCss = (ele, attr, value) => {
        let reg = /^(opacity|aIndex)$/i;
        if (!reg.test(attr)) {
            value = value + 'px';
        }
        ele.style[attr] = value;
    }

    let setGroupCss = (ele, options = {}) => {
        for (const attr in options) {
            if (options.hasOwnProperty(attr)) {
                setCss(ele, attr, options[attr]);
            }
        }
    }

    let css = (...arg) => {
        let len = arg.length,
            fn = getCss;
        len >= 3 ? fn = setCss : null;
        (len === 2 && arg[1] instanceof Object) ? fn = setGroupCss: null;
        return fn(...arg);
    }


    let each = (obj, callback) => {
        if ('length' in obj) {
            for (let i = 0; i < obj.length; i++) {
                let item = obj[i];
                let result = callback && callback.call(item, i, item);
                if (result === false) break;
            }

        } else {
            for (let attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    let result = callback && callback.call(obj[attr], attr, obj[attr]);
                    if (result === false) break;
                }
            }
        }
    }
    return {
        css,
        each
    }
    window.utils = utils;
})();
window.animate = (ele, target = {}, duration = 1000, callback) => {
    if (typeof duration === 'function') {
        callback = duration;
        duration = 1000;
    }

    let begin = {},
        change = {},
        time = 0;

    utils.each(target, (attr, value) => {
        begin[attr] = utils.css(ele, attr);
        change[attr] = target[attr] - begin[attr];
    })

    clearInterval(ele.timer);
    ele.timer = setInterval(() => {
        time += 17;
        if (time >= duration) {
            utils.css(ele, target);
            clearInterval(ele.timer);
            callback && callback.call(ele);
            return;
        }
        let cur = {};
        utils.each(target, (attr, value) => {
            cur[attr] = time / duration * change[attr] + begin[attr];
        })
        utils.css(ele, cur);
    }, 17);

}