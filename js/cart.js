let dsTivi = [];
let dsNhom = [];
let dsPhone = [];
let dsFood = [];
var carts = []

const addtocart = (key, _nhom) => {
    let Ma_so = key;
    let value = Number(document.getElementById("sl" + Ma_so).value);

    let vt = -1;
    // // Lưu vào sessionStorage
    if (sessionStorage.getItem("carts") != undefined) {
        carts = JSON.parse(sessionStorage.getItem("carts"))
        vt = carts.findIndex(item => item.maso == key);
    }

    if (vt == -1) {
        let tmp = {};
        if (_nhom == 1) {
            tmp = dsTivi.find(x => x.Ma_so == key);
        } else if (_nhom == 2){
            tmp = dsPhone.find(x => x.Ma_so == key);
        } else {
            tmp = dsFood.find(x => x.Ma_so == key);
        }

        let cart = {
            maso: key,
            soluong: value,
            ten: tmp.Ten,
            dongiaban: Number(tmp.Don_gia_Ban),
            nhom: _nhom
        }

        carts.push(cart) // Thêm 

    } else {
        carts[vt].soluong += value // Cập nhật lại số lượng
    }


    if (carts.length > 0) {
        sessionStorage.setItem("carts", JSON.stringify(carts))
    } else {
        sessionStorage.removeItem("carts")
    }
    Th_Gio_hang.innerHTML = `${carts.length}`

}



const Xuat_Tivi_Mua = (carts, Th_Cha) => {
    Th_Cha.innerHTML = ""
    var noi_dung_HTML = ``
    carts.forEach(TiviMua => {
        let thanhTien = TiviMua.soluong * TiviMua.dongiaban
        // noi_dung_HTML += `
        // <tr>
        //     <td scope="row">
        //         <img src=${Dia_chi_Dich_vu}/${TiviMua.maso}.png style="width:80px" />
        //     </td >
        //     <td class="text-nowrap">${TiviMua.ten}</td>
        //     <td>
        //         <input onchange="soLuong('${TiviMua.maso}',this)" type="number" min="1" max="10" value="${TiviMua.soluong}" class="text-right" />
        //     </td>
        //     <td>${Tao_Chuoi_The_hien_So_nguyen_duong(TiviMua.dongiaban)}<sup>đ</sup></td>
        //     <td>${Tao_Chuoi_The_hien_So_nguyen_duong(thanhTien)}<sup>đ</sup></td>
        //     <td class='xoa' onclick="xoaGiohang('${TiviMua.maso}')"> Xóa </td>
        // </tr >
        // `
        noi_dung_HTML += `
            <tr>
                    <td class="align-middle"><img src=${Dia_chi_Dich_vu}/${TiviMua.maso}.png alt="" style="width: 50px;"></td>
                    <td class="align-middle">${TiviMua.ten}</td>
                    <td class="align-middle">  
                         <input onchange="soLuong('${TiviMua.maso}',this)" type="number" min="1" max="10" value="${TiviMua.soluong}" class="text-right" />
                    </td>
                    <td class="align-middle">${Tao_Chuoi_The_hien_So_nguyen_duong(TiviMua.dongiaban)}<sup>đ</sup></td>
                    <td class="align-middle">${Tao_Chuoi_The_hien_So_nguyen_duong(thanhTien)}<sup>đ</sup></td>
                    <td class="align-middle xoa" onclick="xoaGiohang('${TiviMua.maso}')"><button class="btn btn-sm btn-danger"><i
                        class="fa fa-times"></i></button></td>
            </tr>
        `
    })
    noi_dung_HTML += `
        <tr>
                <td colspan="6" id="Th_Tong" style="text-align: right;"></td>
                
        </tr>
    `
    Th_Cha.innerHTML = noi_dung_HTML
    tongThanhtien()
}

const Xuat_Phone_Mua = (carts, Th_Cha) => {
    Th_Cha.innerHTML = ""
    var noi_dung_HTML = ``
    carts.forEach(PhoneMua => {
        let thanhTien = PhoneMua.soluong * PhoneMua.dongiaban
        // noi_dung_HTML += `
        // <tr>
        //     <td scope="row">
        //         <img src=${Dia_chi_Dich_vu}/${TiviMua.maso}.png style="width:80px" />
        //     </td >
        //     <td class="text-nowrap">${TiviMua.ten}</td>
        //     <td>
        //         <input onchange="soLuong('${TiviMua.maso}',this)" type="number" min="1" max="10" value="${TiviMua.soluong}" class="text-right" />
        //     </td>
        //     <td>${Tao_Chuoi_The_hien_So_nguyen_duong(TiviMua.dongiaban)}<sup>đ</sup></td>
        //     <td>${Tao_Chuoi_The_hien_So_nguyen_duong(thanhTien)}<sup>đ</sup></td>
        //     <td class='xoa' onclick="xoaGiohang('${TiviMua.maso}')"> Xóa </td>
        // </tr >
        // `
        noi_dung_HTML += `
        <tr>
        <td class="align-middle"><img src=${Dia_chi_Dich_vu}/${PhoneMua.maso}.png alt="" style="width: 50px;"></td>
        <td class="align-middle">${PhoneMua.ten}</td>
        <td class="align-middle">  
            <input onchange="soLuong('${PhoneMua.maso}',this)" type="number" min="1" max="10" value="${PhoneMua.soluong}" class="text-right" />
        </td>
        <td class="align-middle">${Tao_Chuoi_The_hien_So_nguyen_duong(PhoneMua.dongiaban)}<sup>đ</sup></td>
        <td class="align-middle">${Tao_Chuoi_The_hien_So_nguyen_duong(thanhTien)}<sup>đ</sup></td>
        <td class="align-middle xoa" onclick="xoaGiohang('${PhoneMua.maso}')"><button class="btn btn-sm btn-danger"><i
                    class="fa fa-times"></i></button></td>
    </tr>
        `
    })
    noi_dung_HTML += `
        <tr>
                <td colspan="6" id="Th_Tong" style="text-align: right;"></td>
                
        </tr>
    `
    Th_Cha.innerHTML = noi_dung_HTML
    tongThanhtien()

}

const Xuat_Food_Mua = (carts, Th_Cha) => {
    Th_Cha.innerHTML = ""
    var noi_dung_HTML = ``
    carts.forEach(FoodMua => {
        let thanhTien = FoodMua.soluong * FoodMua.dongiaban
        // noi_dung_HTML += `
        // <tr>
        //     <td scope="row">
        //         <img src=${Dia_chi_Dich_vu}/${TiviMua.maso}.png style="width:80px" />
        //     </td >
        //     <td class="text-nowrap">${TiviMua.ten}</td>
        //     <td>
        //         <input onchange="soLuong('${TiviMua.maso}',this)" type="number" min="1" max="10" value="${TiviMua.soluong}" class="text-right" />
        //     </td>
        //     <td>${Tao_Chuoi_The_hien_So_nguyen_duong(TiviMua.dongiaban)}<sup>đ</sup></td>
        //     <td>${Tao_Chuoi_The_hien_So_nguyen_duong(thanhTien)}<sup>đ</sup></td>
        //     <td class='xoa' onclick="xoaGiohang('${TiviMua.maso}')"> Xóa </td>
        // </tr >
        // `
        noi_dung_HTML += `
        <tr>
        <td class="align-middle"><img src=${Dia_chi_Dich_vu}/${FoodMua.maso}.png alt="" style="width: 50px;"></td>
        <td class="align-middle">${FoodMua.ten}</td>
        <td class="align-middle">  
            <input onchange="soLuong('${FoodMua.maso}',this)" type="number" min="1" max="10" value="${FoodMua.soluong}" class="text-right" />
        </td>
        <td class="align-middle">${Tao_Chuoi_The_hien_So_nguyen_duong(FoodMua.dongiaban)}<sup>đ</sup></td>
        <td class="align-middle">${Tao_Chuoi_The_hien_So_nguyen_duong(thanhTien)}<sup>đ</sup></td>
        <td class="align-middle xoa" onclick="xoaGiohang('${FoodMua.maso}')"><button class="btn btn-sm btn-danger"><i
                    class="fa fa-times"></i></button></td>
    </tr>
        `
    })
    noi_dung_HTML += `
        <tr>
                <td colspan="6" id="Th_Tong" style="text-align: right;"></td>
                
        </tr>
    `
    Th_Cha.innerHTML = noi_dung_HTML
    tongThanhtien()

}

const tongThanhtien = () => {
    let kq = 0
    carts = JSON.parse(sessionStorage.getItem("carts"))
    carts.forEach(tv => {
        kq += (tv.soluong * tv.dongiaban)
    })
    Th_Tong.innerHTML = `<strong>Tổng thành tiền:</strong> ${Tao_Chuoi_The_hien_So_nguyen_duong(kq)}<sup>đ</sup>`
}

const xoaGiohang = (maSoXoa) => {
    if (confirm(`Bạn có đồng ý Xóa sản phẩm không?`)) {
        let vt = carts.findIndex(x => x.maso == maSoXoa)
        carts.splice(vt, 1)
        if (carts.length > 0) {
            sessionStorage.setItem("carts", JSON.stringify(carts))
            Xuat_Tivi_Mua(carts, Th_Carts)
            Xuat_Phone_Mua(carts, Th_Carts)
            Xuat_Food_Mua(carts, Th_Carts)
            tongThanhtien()
        } else {
            Th_XoaCarts.click()
        }
    }
}
const soLuong = (maSo, sl) => {
    console.dir(sl)
    let tr = sl.parentNode.parentNode
    let soLuong = sl.value
    //console.log(soLuong)
    let dt = carts.find(x => x.maso == maSo)
    dt.soluong = Number(soLuong)
    sessionStorage.setItem("carts", JSON.stringify(carts))
    let thanhTien = Number(soLuong) * Number(dt.dongiaban)
    tr.children[4].innerHTML = `${Tao_Chuoi_The_hien_So_nguyen_duong(thanhTien)}<sup>đ</sup>`
    tongThanhtien()
}
const datHang = () => {
    let dsDonHang = []
    carts = JSON.parse(sessionStorage.getItem("carts"));
    let Khach_hang = {
        "Ho_ten": document.querySelector("#Th_Ho_ten").value,
        "Dien_thoai": document.querySelector("#Th_Dien_thoai").value,
        "Email": document.querySelector("#Th_Email").value,
        "Dia_chi": document.querySelector("#Th_Dia_chi").value
    }
    carts.forEach(item => {
        let donDathang = {
            "Ngay_Dat_hang": new Date(),
            "Ngay_Giao_hang": document.querySelector("#Th_Ngay_Giao_hang").value,
            "So_luong": Number(item.soluong),
            "Don_gia_Ban": Number(item.dongiaban),
            "Tien": Number(item.soluong) * Number(item.dongiaban),
            "Trang_thai": "CHUA_GIAO_HANG",
            "Khach_hang": Khach_hang
        };
        let maso = item.maso;
        let donhang = {
            key: maso,
            dathang: donDathang,
            nhom: item.nhom
        }
        dsDonHang.push(donhang)
        //console.log(dsDonHang);
    })

    // Gọi API 
    apiDathang(dsDonHang).then(result => {
        console.log(result);
        alert('Đơn đặt hàng thành công...')
        Th_XoaCarts.click();
    }).catch(err => {
        console.log(err);
    })


}

