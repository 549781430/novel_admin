module.exports = {
    extend: function(target, source, flag) {
        for (var key in source) {
            if (source.hasOwnProperty(key))
                flag ?
                (target[key] = source[key]) :
                (target[key] === void 0 && (target[key] = source[key]));
        }
        return target;
    },
    // 向前台返回JSON方法的简单封装
    jsonWrite: function(res, ret) {
        if (typeof ret === 'undefined') {
            res.json({
                state: '0',
                info: '操作失败',
                data: null
            });
        } else {
            res.json(ret);
        }
    }
};