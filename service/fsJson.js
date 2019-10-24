const fs = require('fs')
const axios = require('axios')


fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
    let newData = JSON.parse(data)

    console.log('读文件')
    function deleteErrorImage() {
        let pushData = []
        newData.map(async(value, index) => {
            try {
                let result = await axios.get(value.IMAGE1)
                //console.log(value)
                fs.appendFile('./data_json/newGoods2.json',JSON.stringify(value)+',',function(err, ret) {
                    if(err) {throw err}
                    })
            } catch (err) {
                console.log(err + 'bb')
            }
        })
        console.log(pushData)
    }

});


// fs.writeFile('./data_json/newGoods2.json', JSON.stringify(pushData), function(err) {
//     if (err) console.log('写文件操作失败');
//     else console.log('写文件操作成功');
// })