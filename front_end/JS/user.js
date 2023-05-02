function editUser(){
    const email = document.getElementById('email').value
    const fName = document.getElementById('newFName').value 
    const lName = document.getElementById('newLName').value 
    const phone = document.getElementById('newPhone').value 
    const address = document.getElementById('newAddress').value 
    const userID= (JSON.parse(sessionStorage.getItem('userid'))).userID
    const avatar = document.getElementById('image_uploads').toDataURL("image/png")
    console.log(avatar);
    // axios.put('http://localhost:9000/ominitrix/user/update',{
    //     userID:userID,
    //     address: address,
    //     email: email,
    //     firstName: fName,
    //     lastName: lName,
    //     phone: phone,
    //     avatar:avatar
    // })
    //     .then((result) => {
    //         if(result.status==200){
    //             alert("Sửa thông tin thành công")
    //         }   
    //     }).catch((err) => {
    //         console.log(err);
    //     });
}
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}