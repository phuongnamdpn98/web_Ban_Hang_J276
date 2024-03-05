// let dsTivi = [];
// let dsPhone = [];
// let dsFood = [];

// API Điện thoại cho danh mục
apiDienthoai().then(result => {
    //console.log(result);
    dsPhone = result
    document.getElementById("Th_DienThoai").innerHTML = xuatAlldt(dsPhone);

}).catch(err => {
    console.log(err);
})
// API Điện thoại cho trang chủ
apiDienthoai().then(result => {
    //console.log(result);
    dsPhone = result
    document.getElementById("ThDienThoai").innerHTML = xuatPhone(dsPhone);

}).catch(err => {
    console.log(err);
})

// API Tivi cho trang chủ
apiTivi().then(result => {
    //console.log(result);
    dsTivi = result
    document.getElementById("ThTivi").innerHTML = xuatTivi(dsTivi);


}).catch(err => {
    console.log(err);
})

// API Tivi cho danh mục
apiTivi().then(result => {
    //console.log(result);
    dsTivi = result
    document.getElementById("Th_Tivi").innerHTML = xuatAllTivi(dsTivi);


}).catch(err => {
    console.log(err);
})

// API Food cho danh mục
apiFood().then(result => {
    dsFood = result;
    document.getElementById("ThFood").innerHTML = xuatAllFood(dsFood);
    Tao_Co_so_Du_lieu_indexedDB()

}).catch(err => {
    console.log(err);
})