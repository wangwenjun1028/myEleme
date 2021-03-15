import data from './data';
export function fatchData() {
    let dataSorce = data;
    let dataList = dataSorce.goods;
    let num = 0;
    dataList.map((item, index) => {
        let itemObj = { ...item }
        itemObj.foods.map((p, i) => {
            num++;
            let obj = { ...p };
            obj.sid = num;
            obj.count = 0;
            dataList[index].foods[i] = { ...obj };
        })
    })
    return dataList;
}

export function sellerData() {
    let dataSorce = { ...data };
    return { ...dataSorce.seller };
}
export function ratingsData() {
    let dataSorce = { ...data };
    return [...dataSorce.ratings];
}