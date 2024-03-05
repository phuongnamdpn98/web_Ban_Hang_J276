const xuatTivi = (dsTivi) => {
    let html = ``;
    dsTivi = dsTivi.slice(0, 8);
    dsTivi.forEach((tivi, index) => {
        html += `
        <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
        <div class="product-item bg-light mb-4">
        <div class="product-img position-relative overflow-hidden">
            <img class="img-fluid w-100" src="${Dia_chi_Dich_vu}/${tivi.Ma_so}.png" alt="">
            <div class="product-action">
                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
            </div>
        </div>
        <div class="text-center py-4">
            <a class="h6 text-decoration-none text-truncate" href="">${tivi.Ten}</a>
            <div class="d-flex align-items-center justify-content-center mt-2">
                <h5>${Tao_Chuoi_The_hien_So_nguyen_duong(tivi.Don_gia_Ban)}<sup>đ</sup></h5>
            </div>
            <div class="d-flex align-items-center justify-content-center mb-1">
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star-half-alt text-primary mr-1"></small>
                <small>(99)</small>
            </div>
        </div>
        <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center">
                    <input type="number" min=1 max=10 value=1 id="sl${tivi.Ma_so}" />
                    <a class="btn btn-outline-dark mt-auto" href="javaScript:void(0)" onclick="addtocart('${tivi.Ma_so}',1)" >Add to cart</a>
                </div>
            </div>
        </div>
        </div>
        `
    });
    return html;
}

const xuatAllTivi = (dsTivi) => {
    let html = ``;
    //dsTivi = dsTivi.slice(0, 8);
    dsTivi.forEach((tivi, index) => {
        html += `
        <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
        <div class="product-item bg-light mb-4">
        <div class="product-img position-relative overflow-hidden">
            <img class="img-fluid w-100" src="${Dia_chi_Dich_vu}/${tivi.Ma_so}.png" alt="">
            <div class="product-action">
                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
            </div>
        </div>
        <div class="text-center py-4">
            <a class="h6 text-decoration-none text-truncate" href="">${tivi.Ten}</a>
            <div class="d-flex align-items-center justify-content-center mt-2">
                <h5>${Tao_Chuoi_The_hien_So_nguyen_duong(tivi.Don_gia_Ban)}<sup>đ</sup></h5>
            </div>
            <div class="d-flex align-items-center justify-content-center mb-1">
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star-half-alt text-primary mr-1"></small>
                <small>(99)</small>
            </div>
        </div>
        <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center">
                    <input type="number" min=1 max=10 value=1 id="sl${tivi.Ma_so}" />
                    <a class="btn btn-outline-dark mt-auto" href="javaScript:void(0)" onclick="addtocart('${tivi.Ma_so}',1)" >Add to cart</a>
                </div>
            </div>
        </div>
        </div>
        `
    });
    return html;
}

// let tong = dsTivi.length;
// let limit = 10;
// let pages = tong % limit == 0 ? tong / limit : parseInt(tong / limit) + 1;

// Tao_thanh_phan_trang(pages, Th_Phan_trang)
// Hien_thi_san_pham_phan_trang(dsTivi, Th_Tivi, 0, 10)

// // Active cho nút phân trang đầu tiên
// document.querySelectorAll(".pagination")[0].childNodes[0].className+=' active'

// function Tao_thanh_phan_trang(pages, Th_Phan_trang) {
//     let noi_dung = ``
//     noi_dung += `<nav>
//                     <ul class="pagination justify-content-center">`
//     for (i = 1; i <= pages; i++) {
//         noi_dung += `<li class="page-item"><a class="page-link" href="javaScript:void(0)">${i}</a></li>`
//     }
//     noi_dung += `</ul>
//             </nav>`
//     Th_Phan_trang.innerHTML = noi_dung
// }

// function Hien_thi_san_pham_phan_trang(ds, Th_Tivi, vt, limit) {
//     Th_Tivi.innerHTML = ``
//     let Dem = 0
//     ds.forEach((tivi, index) => {
//         if (index >= vt && Dem < limit) {
//             var noi_dung = `<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
//                         <div class="product-item bg-light mb-4">
//                         <div class="product-img position-relative overflow-hidden">
//                             <img class="img-fluid w-100" src="${Dia_chi_Dich_vu}/${tivi.Ma_so}.png" alt="">
//                             <div class="product-action">
//                                 <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
//                                 <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
//                                 <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
//                                 <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
//                             </div>
//                         </div>
//                         <div class="text-center py-4">
//                             <a class="h6 text-decoration-none text-truncate" href="">${tivi.Ten}</a>
//                             <div class="d-flex align-items-center justify-content-center mt-2">
//                                 <h5>${Tao_Chuoi_The_hien_So_nguyen_duong(tivi.Don_gia_Ban)}<sup>đ</sup></h5>
//                             </div>
//                             <div class="d-flex align-items-center justify-content-center mb-1">
//                                 <small class="fa fa-star text-primary mr-1"></small>
//                                 <small class="fa fa-star text-primary mr-1"></small>
//                                 <small class="fa fa-star text-primary mr-1"></small>
//                                 <small class="fa fa-star text-primary mr-1"></small>
//                                 <small class="fa fa-star-half-alt text-primary mr-1"></small>
//                                 <small>(99)</small>
//                             </div>
//                         </div>
//                         <!-- Product actions-->
//                             <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
//                                 <div class="text-center">
//                                     <input type="number" min=1 max=10 value=1 id="sl${tivi.Ma_so}" />
//                                     <a class="btn btn-outline-dark mt-auto" href="javaScript:void(0)" onclick="addtocart('${tivi.Ma_so}',1)" >Add to cart</a>
//                                 </div>
//                             </div>
//                         </div>
//                         </div>
//                      `;
//             Dem++
//         } else {
//             var noi_dung = `<div class="col-lg-3 col-md-4 col-sm-6 pb-1 d-none">
//                         <div class="product-item bg-light mb-4">
//                         <div class="product-img position-relative overflow-hidden">
//                             <img class="img-fluid w-100" src="${Dia_chi_Dich_vu}/${tivi.Ma_so}.png" alt="">
//                             <div class="product-action">
//                                 <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
//                                 <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
//                                 <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
//                                 <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
//                             </div>
//                         </div>
//                         <div class="text-center py-4">
//                             <a class="h6 text-decoration-none text-truncate" href="">${tivi.Ten}</a>
//                             <div class="d-flex align-items-center justify-content-center mt-2">
//                                 <h5>${Tao_Chuoi_The_hien_So_nguyen_duong(tivi.Don_gia_Ban)}<sup>đ</sup></h5>
//                             </div>
//                             <div class="d-flex align-items-center justify-content-center mb-1">
//                                 <small class="fa fa-star text-primary mr-1"></small>
//                                 <small class="fa fa-star text-primary mr-1"></small>
//                                 <small class="fa fa-star text-primary mr-1"></small>
//                                 <small class="fa fa-star text-primary mr-1"></small>
//                                 <small class="fa fa-star-half-alt text-primary mr-1"></small>
//                                 <small>(99)</small>
//                             </div>
//                         </div>
//                         <!-- Product actions-->
//                             <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
//                                 <div class="text-center">
//                                     <input type="number" min=1 max=10 value=1 id="sl${tivi.Ma_so}" />
//                                     <a class="btn btn-outline-dark mt-auto" href="javaScript:void(0)" onclick="addtocart('${tivi.Ma_so}',1)" >Add to cart</a>
//                                 </div>
//                             </div>
//                         </div>
//                         </div>
//                         `
//             }

//         Th_Tivi.innerHTML += noi_dung
//     })
// }

// function Xu_ly_Phan_trang() {
//     let dsNut = document.querySelectorAll(".page-link");
//     let dsLi = document.querySelectorAll(".page-item");
    
//     dsNut.forEach(nut => {
//         nut.onclick = () => {
            
//             dsLi.forEach(li=>{
//                 li.className="page-item"
//             })
            
//             nut.parentNode.className+=" active"
//             let curPage=Number(nut.innerHTML)
//             let vt=(curPage-1) * limit
//             // Cách 1
//             Hien_thi_san_pham_phan_trang(dsTivi, Th_Tivi,vt,limit) 
//             // Cách 2
            
            
//             // let vtDau=(curPage-1) * limit
//             // let vtCuoi=(limit * curPage) -1
//             // let tmp=danhsach.slice(vtDau,vtCuoi +1)
//             // Hien_thi_san_pham_phan_trang_(tmp, Th_Cha) 
//             // console.log(`vtDau:${vtDau} - vtCuoi:${vtCuoi}`)
            
            
            
//         }
//     })

// }
