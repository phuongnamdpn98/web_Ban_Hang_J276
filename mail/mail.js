CKEDITOR.replace('ndMail', {
    customConfig:"ckcontact.js"
})

document.getElementById("btnGuiMail").onclick= ()=> {
    let ten = document.getElementById("ten").value;
    let email = document.getElementById("email").value;
    let chuDe = document.getElementById("chuDe").value;
    let noidungemail = document.getElementById("ndMail").value;
    let noidung = CKEDITOR.instances.ndMail.getData();

    let body = `<h3>${ten}</h3>`;
    body += `Email:${email} <hr>`;
    body += `${noidung}`;

    let contact = {
        "subject": chuDe,
        "body": body
    }

    apiLienhe(contact).then(result => {
        console.log(result);
        window.location="."
    }).catch(err => {
        console.log(err);
    })
}