// Thư viện http của node
const http = require("http");
// Khai báo port cho dịch vụ
const port = normalizePort(process.env.PORT || 8080);
// Khai báo thư viện fs  của node xử lý thư mục và tập tin
const fs = require("fs");
// Khai báo thư viện mongoDB
const db = require("./mongoDB");
// Khai báo thư viện SendMail
const sendMail = require("./sendMail");
// Khai báo thư viện SMS
const sms = require('./SMS');

// Tạo dịch vụ:
/*
    request: yêu cầu
    response: hồi đáp
*/
//========================================================================================
const dich_vu = http.createServer((req, res) => {
    let method = req.method;
    let url = req.url;
    // Cấp quyền
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (method == "GET") {
        if (url == "/dsTivi") {
            db.getAll("tivi").then(result => {
                let kq = JSON.stringify(result)
                res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                res.end(kq);
            }).catch(err => {
                res.end(JSON.stringify(err));
            })
        } else if (url == "/dsDienthoai") {
            db.getAll("phone").then(result => {
                let kq = JSON.stringify(result)
                res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                res.end(kq);
            }).catch(err => {
                res.end(JSON.stringify(err));
            })
        } else if (url == "/dsHocsinh") {
            db.getAll("hocsinh").then(result => {
                let kq = JSON.stringify(result)
                res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                res.end(kq);
            }).catch(err => {
                res.end(JSON.stringify(err));
            })
        } else if (url == "/dsMathang") {
            db.getAll("matHang").then(result => {
                let kq = JSON.stringify(result)
                res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                res.end(kq);
            }).catch(err => {
                res.end(JSON.stringify(err));
            })
        } else if (url == "/dsNguoidung") {
            db.getAll("user").then(result => {
                let kq = JSON.stringify(result)
                res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                res.end(kq);
            }).catch(err => {
                res.end(JSON.stringify(err));
            })
        } else if (url == "/Cuahang") {
            db.getOne("store").then(result => {
                let kq = JSON.stringify(result);
                res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                res.end(kq);
            }).catch(err => {
                res.end(JSON.stringify(err));
            })
        } else if (url.match("\.png$")) {
            let imagePath = `./images/${url}`;
            if (!fs.existsSync(imagePath)) {
                imagePath = `./images/noImage.png`;
            }

            let fileStream = fs.createReadStream(imagePath);
            res.writeHead(200, { "Content-Type": "image/png" });
            fileStream.pipe(res);
        } else {
            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
            let kq = `Bạn sử dụng phương thức GET - ${url} `
            res.end(kq);
        }
    } else if (method == "POST") {
        // Lấy dữ liệu gởi
        let noi_dung_nhan = ``;
        // Nhận thông tin gởi gán vào biến noi_dung_nhan
        req.on("data", (data) => {
            noi_dung_nhan += data;
        })
        //////////////////////////////////////////////////////////////
        if (url == "/Dangnhap") {
            req.on("end", () => {
                let ket_qua = {
                    "Noi_dung": true
                }
                let user = JSON.parse(noi_dung_nhan);
                let dieukien = {
                    $and: [
                        { "Ten_Dang_nhap": user.Ten_Dang_nhap },
                        { "Mat_khau": user.Mat_khau }
                    ]
                }
                db.getOne("user", dieukien).then(result => {
                    console.log(result)
                    ket_qua.Noi_dung = {
                        "Ho_ten": result.Ten,
                        "Nhom": {
                            "Ma_so": result.Nhom_Nguoi_dung.Ma_so,
                            "Ten": result.Nhom_Nguoi_dung.Ten
                        }
                    };
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));

                }).catch(err => {
                    console.log(err);
                    ket_qua.Noi_dung = false;
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));
                })
            })
        } else if (url == "/Dathang") {
            req.on('end', function () {
                let dsDathang = JSON.parse(noi_dung_nhan);
                let ket_qua = { "Noi_dung": [] };
                dsDathang.forEach(item => {
                    let filter = {
                        "Ma_so": item.key

                    }
                    let nhom = item.nhom;
                    let collectionName = "matHang";
                    if (nhom == 1) {
                        collectionName = "tivi";
                    } else if (nhom == 2) {
                        collectionName = "phone"
                    }
                    db.getOne(collectionName, filter).then(result => {
                        //result.Danh_sach_Phieu_Ban.push(item.dathang);

                        // Update
                        let capnhat = {}
                        
                        if (collectionName == "matHang") {
                            result.Danh_sach_Ban_hang.push(item.dathang);

                            capnhat = {
                                $set: { Danh_sach_Ban_hang: result.Danh_sach_Ban_hang }
                            }
                        } else {
                            result.Danh_sach_Phieu_Ban.push(item.dathang);
                            capnhat = {
                                $set: { Danh_sach_Phieu_Ban: result.Danh_sach_Phieu_Ban }
                            }
                        }
                        let obj = {
                            "Ma_so": result.Ma_so,
                            "Update": true
                        }
                        db.updateOne(collectionName, filter, capnhat).then(result => {
                            if (result.modifiedCount == 0) {
                                obj.Update = false

                            }
                            ket_qua.Noi_dung.push(obj);
                            //console.log(ket_qua.Noi_dung)
                            if (ket_qua.Noi_dung.length == dsDathang.length) {
                                res.end(JSON.stringify(ket_qua));
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    }).catch(err => {
                        console.log(err);
                    })

                })
            })

        } else if (url == "/SuaDienthoai") { // thêm - sửa - xóa điện thoại
            req.on('end', function () {
                let mobile = JSON.parse(noi_dung_nhan);
                let ket_qua = { "Noi_dung": true };
                db.updateOne("phone", mobile.condition, mobile.update).then(result => {
                    console.log(result);
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));
                }).catch(err => {
                    console.log(err);
                    ket_qua.Noi_dung = false;
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua))
                })
            })
        } else if (url == "/ThemDienthoai") {
            req.on('end', function () {
                let mobile = JSON.parse(noi_dung_nhan);
                let ket_qua = { "Noi_dung": true };
                db.insertOne("phone", mobile).then(result => {
                    console.log(result);
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));
                }).catch(err => {
                    console.log(err);
                    ket_qua.Noi_dung = false;
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));
                })
            })
        } else if (url == "/ImagesDienthoai") {
            req.on('end', function () {
                let img = JSON.parse(noi_dung_nhan);
                let Ket_qua = { "Noi_dung": true };
                // upload img in images ------------------------------

                let kq = saveMedia(img.name, img.src)
                if (kq == "OK") {
                    res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" });
                    res.end(JSON.stringify(Ket_qua));
                } else {
                    Ket_qua.Noi_dung = false
                    res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" });
                    res.end(JSON.stringify(Ket_qua));
                }

                // upload img host cloudinary ------------------------------
                /*
                imgCloud.UPLOAD_CLOUDINARY(img.name,img.src).then(result=>{
                    console.log(result);
                    res.end(JSON.stringify(Ket_qua));

                }).catch(err=>{
                    Ket_qua.Noi_dung=false
                    res.end(JSON.stringify(Ket_qua))
                })
                */
            })

        } else if (url == "/XoaDienthoai") {
            req.on('end', function () {
                let mobile = JSON.parse(noi_dung_nhan);
                let ket_qua = { "Noi_dung": true };
                db.deleteOne("phone", mobile).then(result => {
                    console.log(result);
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));
                }).catch(err => {
                    console.log(err);
                    ket_qua.Noi_dung = false;
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua))
                })

            })

        } else if (url == "/SuaTivi") { // thêm - sửa - xóa tivi
            req.on('end', function () {
                let tivi = JSON.parse(noi_dung_nhan);
                let ket_qua = { "Noi_dung": true };
                db.updateOne("tivi", tivi.condition, tivi.update).then(result => {
                    console.log(result);
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));
                }).catch(err => {
                    console.log(err);
                    ket_qua.Noi_dung = false;
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua))
                })
            })
        } else if (url == "/ThemTivi") {
            req.on('end', function () {
                let tivi = JSON.parse(noi_dung_nhan);
                let ket_qua = { "Noi_dung": true };
                db.insertOne("tivi", tivi).then(result => {
                    console.log(result);
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));
                }).catch(err => {
                    console.log(err);
                    ket_qua.Noi_dung = false;
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));
                })
            })
        } else if (url == "/ImagesTivi") {
            req.on('end', function () {
                let img = JSON.parse(noi_dung_nhan);
                let Ket_qua = { "Noi_dung": true };
                // upload img in images ------------------------------

                let kq = saveMedia(img.name, img.src)
                if (kq == "OK") {
                    res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" });
                    res.end(JSON.stringify(Ket_qua));
                } else {
                    Ket_qua.Noi_dung = false
                    res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" });
                    res.end(JSON.stringify(Ket_qua));
                }

                // upload img host cloudinary ------------------------------
                /*
                imgCloud.UPLOAD_CLOUDINARY(img.name,img.src).then(result=>{
                    console.log(result);
                    res.end(JSON.stringify(Ket_qua));

                }).catch(err=>{
                    Ket_qua.Noi_dung=false
                    res.end(JSON.stringify(Ket_qua))
                })
                */
            })

        } else if (url == "/XoaTivi") {
            req.on('end', function () {
                let tivi = JSON.parse(noi_dung_nhan);
                let ket_qua = { "Noi_dung": true };
                db.deleteOne("tivi", tivi).then(result => {
                    console.log(result);
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));
                }).catch(err => {
                    console.log(err);
                    ket_qua.Noi_dung = false;
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua))
                })

            })

        } else if (url == "/SuaFood") { // thêm - sửa - xóa Food
            req.on('end', function () {
                let food = JSON.parse(noi_dung_nhan);
                let ket_qua = { "Noi_dung": true };
                db.updateOne("matHang", food.condition, food.update).then(result => {
                    console.log(result);
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));
                }).catch(err => {
                    console.log(err);
                    ket_qua.Noi_dung = false;
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua))
                })
            })
        } else if (url == "/ThemFood") {
            req.on('end', function () {
                let food = JSON.parse(noi_dung_nhan);
                let ket_qua = { "Noi_dung": true };
                db.insertOne("matHang", food).then(result => {
                    console.log(result);
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));
                }).catch(err => {
                    console.log(err);
                    ket_qua.Noi_dung = false;
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));
                })
            })
        } else if (url == "/ImagesFood") {
            req.on('end', function () {
                let img = JSON.parse(noi_dung_nhan);
                let Ket_qua = { "Noi_dung": true };
                // upload img in images ------------------------------

                let kq = saveMedia(img.name, img.src)
                if (kq == "OK") {
                    res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" });
                    res.end(JSON.stringify(Ket_qua));
                } else {
                    Ket_qua.Noi_dung = false
                    res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" });
                    res.end(JSON.stringify(Ket_qua));
                }

                // upload img host cloudinary ------------------------------
                /*
                imgCloud.UPLOAD_CLOUDINARY(img.name,img.src).then(result=>{
                    console.log(result);
                    res.end(JSON.stringify(Ket_qua));

                }).catch(err=>{
                    Ket_qua.Noi_dung=false
                    res.end(JSON.stringify(Ket_qua))
                })
                */
            })

        } else if (url == "/XoaFood") {
            req.on('end', function () {
                let food = JSON.parse(noi_dung_nhan);
                let ket_qua = { "Noi_dung": true };
                db.deleteOne("matHang", food).then(result => {
                    console.log(result);
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));
                }).catch(err => {
                    console.log(err);
                    ket_qua.Noi_dung = false;
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua))
                })

            })

        } else if (url == "/SendMail") {
            req.on("end", () => {
                let kq = {
                    "noi_dung": true
                }
                let info = JSON.parse(noi_dung_nhan);

                let from = `phuongnamdpn98@gmail.com`;
                let to = `phuongnamdpn98@gmail.com`;
                let subject = info.subject;
                let body = info.body;
                sendMail.Goi_Thu_Lien_he(from, to, subject, body).then(result => {
                    console.log(result)
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(kq));
                }).catch(err => {
                    console.log(err)
                    kq.noi_dung = false;
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(kq));
                })
            })
        } else if (url == "/SMS") {
            req.on("end", () => {
                let kq = {
                    "noi_dung": true
                }

                let info = JSON.parse(noi_dung_nhan);
                let so_dien_thoai = info.so_dien_thoai;
                let noi_dung = info.noi_dung;

                sms.Goi_Tin_nhan(so_dien_thoai, noi_dung).then(result => {
                    console.log(result)
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(kq));
                }).catch(err => {
                    console.log(err)
                    kq.noi_dung = false;
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(kq));
                })
            })
        } else if (url == "/ThemNguoidung") {
            req.on("end", () => {
                let kq = {
                    "noi_dung": true
                }
                let user = JSON.parse(noi_dung_nhan);
                // Xử lý thêm vào collection Nguoi_dung.json
                db.insertOne("user", user).then(result => {
                    console.log(result);
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(kq));
                }).catch(err => {
                    console.log(err);
                    kq.noi_dung = false;
                    res.end(JSON.stringify(kq));
                })
            })
        } else if (url == "/SuaNguoidung") {
            req.on("end", () => {
                let kq = {
                    "noi_dung": true
                }
                let objSua = JSON.parse(noi_dung_nhan);
                let filter = {
                    "Ma_so": objSua.Ma_so
                }
                let user = {
                    $set: {
                        "Ten": objSua.Ten,
                        "Ten_Dang_nhap": objSua.Ten_Dang_nhap,
                        "Mat_khau": objSua.Mat_khau
                    }
                }
                db.updateOne("user", filter, user).then(result => {
                    console.log(result);
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(kq));
                }).catch(err => {
                    console.log(err);
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    kq.noi_dung = false;
                    res.end(JSON.stringify(kq));
                })
            })
        } else if (url == "/XoaNguoidung") {
            req.on("end", () => {
                let kq = {
                    "noi_dung": true
                }
                let objXoa = JSON.parse(noi_dung_nhan);
                let filter = {
                    "Ma_so": objXoa.Ma_so
                }
                db.deleteOne("user", filter).catch(result => {
                    console.log(result);
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(kq));
                }).catch(err => {
                    console.log(err);
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    kq.noi_dung = false;
                    res.end(JSON.stringify(kq));
                })

            })
        } else {
            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
            let kq = `Bạn sử dụng phương thức POST - ${url} `
            res.end(kq);
        }
    } else {
        res.end(`Dịch vụ  method:${method} - url:${url} `)
    }
})

// Dịch vụ lắng nghe tại địa chỉ và cổng nào

dich_vu.listen(port, () => {
    console.log(`Dịch vụ thực thi tại địa chỉ http://localhost:${port}`)
})

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

// Upload Media -----------------------------------------------------------------
function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Error ...');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

function saveMedia(Ten, Chuoi_nhi_phan) {
    var Kq = "OK"
    try {
        var Nhi_phan = decodeBase64Image(Chuoi_nhi_phan);
        var Duong_dan = "./images/" + Ten
        fs.writeFileSync(Duong_dan, Nhi_phan.data);
    } catch (Loi) {
        Kq = Loi.toString()
    }
    return Kq
}
