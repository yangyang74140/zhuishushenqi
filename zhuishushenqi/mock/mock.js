var Mock = require('mockjs')
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})
// 输出结果
// console.log(JSON.stringify(data, null, 4))

Mock.mock("http://127.0.0.1:3000/ceshi",{
    'title1':'@cparagraph(10)',
    'title2':'@cparagraph(7)',
    'title3':'@cparagraph(7)',
    'title4':'@cparagraph(7)',
    'title5':'@cparagraph(6)',
    'title6':'@cparagraph(8)',
    'title7':'@cparagraph(5)',
});