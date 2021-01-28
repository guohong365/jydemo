(function ($) {
    if (!$) {
        console.error("jquery must be loaded.");
        return;
    }

    let datset = {
        source: [
            ["交易时间", "城市", "卡类", "交易次数", "交易金额"],
            ["2020", "安宁", "安宁八街卡", 2000.00, 2000.00],
            ["2020", "安宁", "安宁太平卡", 130000.00, 130000.00],
            ["2020", "安宁", "安宁学生卡", 236000.00, 236000.00],
            ["2020", "安宁", "安宁普通卡", 806000.00, 806000.00],
            ["2020", "安宁", "安宁爱心卡", 1.00, 1.00],
            ["2020", "安宁", "安宁银联二维码", 4259000.00, 4259000.00],
            ["2020", "安宁", "安宁银联双免", 1331000.00, 1331000.00],
            ["2020", "安宁", "小程序二维码", 20000.00, 20000.00],
            ["2020", "安宁", "小程序学生卡", 0.00, 0.00],
            ["2020", "禄劝", "禄劝优惠卡", 1000.00, 1000.00],
            ["2020", "禄劝", "禄劝员工卡", 2000.00, 2000.00],
            ["2020", "禄劝", "禄劝学生卡", 115000.00, 115000.00],
            ["2020", "禄劝", "禄劝支付宝", 1000.00, 1000.00],
            ["2020", "禄劝", "禄劝普通卡", 64000.00, 64000.00],
            ["2020", "禄劝", "禄劝老年卡", 133000.00, 133000.00],
            ["2020", "禄劝", "禄劝银联二维码", 164000.00, 164000.00],
            ["2020", "禄劝", "禄劝银联双免", 24000.00, 24000.00],
            ["2020", "嵩明", "嵩明普通卡", 8000.00, 8000.00],
            ["2020", "嵩明", "嵩明爱心卡", 0.00, 0.00],
            ["2020", "嵩明", "嵩明银联二维码", 241.00, 241.00],
            ["2020", "嵩明", "嵩明银联双免", 40.00, 40.00],
            ["2020", "嵩明", "职教园公交卡", 1000.00, 1000.00],
            ["2020", "元谋", "元谋银联二维码", 1000.00, 1000.00],
            ["2020", "元谋", "元谋银联双免", 104.00, 104.00],
            ["2020", "东川", "东川优惠卡", 48000.00, 48000.00],
            ["2020", "东川", "东川学生卡", 30000.00, 30000.00],
            ["2020", "东川", "东川支付宝", 96.00, 96.00],
            ["2020", "东川", "东川普通卡", 46000.00, 46000.00],
            ["2020", "东川", "东川爱心卡", 0.00, 0.00],
            ["2020", "东川", "东川银联二维码", 9000.00, 9000.00],
            ["2020", "东川", "东川银联双免", 2000.00, 2000.00],
            ["2020", "景洪", "景洪员工卡", 4000.00, 4000.00],
            ["2020", "景洪", "景洪学生卡", 0.00, 0.00],
            ["2020", "景洪", "景洪支付宝", 0.00, 0.00],
            ["2020", "景洪", "景洪普通卡", 395000.00, 395000.00],
            ["2020", "景洪", "景洪爱心卡", 0.00, 0.00],
            ["2020", "景洪", "景洪老人卡", 60.00, 60.00],
            ["2020", "景洪", "景洪银联二维码", 95000.00, 95000.00],
            ["2020", "景洪", "景洪银联双免", 30000.00, 30000.00],
        ]
    };

    let matrix = $.createDataSet(datset.source);
    let result = matrix.select(function (row, index) {
        if (row[1] === '安宁') return row;
        return undefined;
    });
    console.log(result);
    console.log("=============");

    console.log("select distinct");
    matrix.selectDistinct(function (row) {
        return [row[1]];
    });

    console.log('getGroupKeys');
    console.log(matrix.dimension);
    result = matrix.getGroupKeys(matrix.dimension, [1, 2], { value: 'top: ' });
    console.log(result);
    console.log("==============");
    console.log('getGroupKeys');
    console.log(matrix.dimension);
    result = matrix.getGroupKeys(matrix.dimension, ['城市', 2], { value: 'top: ' });
    console.log(result);
    console.log("==============");
    console.log('getGroupKeys');
    console.log(matrix.dimension);
    result = matrix.getGroupKeys(matrix.dimension, ['城市', '卡类'], { value: 'top: ' });
    console.log(result);
    console.log("==============");

    console.log('sum 3 by 1');
    result = matrix.sum(3, [0, 1, 2]);

    console.log(Object.create(result));
    console.log("==============")
    /*
    console.log('sum 4 by 1');
    result = matrix.sum(matrix, 4, 1);
    console.log(matrix);
    console.log("==============")
    */
    //result = matrix.sum(matrix, 3, function (row) {
    //    return [row[1], row[2].slice(2)];
    //});
    //console.log(result);

}(window.jQuery));