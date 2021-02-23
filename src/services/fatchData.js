import data from './data';
export function fatchData() {
    console.log(999)
    let dataSorce = data;
    let dataList = dataSorce.goods;
    let num = 0;
    dataList.map((item, index) => {
        let itemObj = { ...item }
        itemObj.foods.map((p, i) => {
            num++;
            let obj = { ...p };
            obj.sid = num;
            dataList[index].foods[i] = obj;
        })
    })
    return dataList;
}