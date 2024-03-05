const xuatPhone = (dsPhone) => {
    let html = ``;
    dsPhone = dsPhone.slice(0, 8);
    dsPhone.forEach((Phone, index) => {
        html += `
        <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
        <div class="product-item bg-light mb-4">
        <div class="product-img position-relative overflow-hidden">
            <img class="img-fluid w-100" src="${Dia_chi_Dich_vu}/${Phone.Ma_so}.png" alt="">
            <div class="product-action">
                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
            </div>
        </div>
        <div class="text-center py-4">
            <a class="h6 text-decoration-none text-truncate" href="">${Phone.Ten}</a>
            <div class="d-flex align-items-center justify-content-center mt-2">
                <h5>${Tao_Chuoi_The_hien_So_nguyen_duong(Phone.Don_gia_Ban)}<sup>đ</sup></h5>
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
                    <input type="number" min=1 max=10 value=1 id="sl${Phone.Ma_so}" />
                    <a class="btn btn-outline-dark mt-auto" href="javaScript:void(0)" onclick="addtocart('${Phone.Ma_so}',2)" >Add to cart</a>
                </div>
            </div>
        </div>
        </div>
        `
    });
    return html;
}

const xuatAlldt = (dsPhone) => {
    let html = ``;
    
    dsPhone.forEach((Phone, index) => {
        html += `
        <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
        <div class="product-item bg-light mb-4">
        <div class="product-img position-relative overflow-hidden">
            <img class="img-fluid w-100" src="${Dia_chi_Dich_vu}/${Phone.Ma_so}.png" alt="">
            <div class="product-action">
                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
            </div>
        </div>
        <div class="text-center py-4">
            <a class="h6 text-decoration-none text-truncate" href="">${Phone.Ten}</a>
            <div class="d-flex align-items-center justify-content-center mt-2">
                <h5>${Tao_Chuoi_The_hien_So_nguyen_duong(Phone.Don_gia_Ban)}<sup>đ</sup></h5>
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
                    <input type="number" min=1 max=10 value=1 id="sl${Phone.Ma_so}" />
                    <a class="btn btn-outline-dark mt-auto" href="javaScript:void(0)" onclick="addtocart('${Phone.Ma_so}',2)" >Add to cart</a>
                </div>
            </div>
        </div>
        </div>
        `
    });
    return html;
}