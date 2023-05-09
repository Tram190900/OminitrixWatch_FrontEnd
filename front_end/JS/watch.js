function deleteById(watchID) {
    axios
        .delete("http://localhost:9000/ominitrix/watch/" + watchID)
        .then(function (res) {
            console.log(res.status);
            if (res.status == 200) {
                alert("xóa thành công");
                location.reload();
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

function updateWatch(watchID, voteLike) {
    console.log("update");
    const price = document.getElementById("newWPrice").value;
    const thichness = document.getElementById("newWThickness").value;
    const quantity = document.getElementById("newWQuantity").value;
    const description = document.getElementById("newDescription").value;
    const watchName = document.getElementById("newWName").value;
    var waterResistance = false;
    if (document.getElementById("newWResistance").checked == true) {
        waterResistance = true;
    }
    var watchGender = false;
    if (document.getElementById("newWResistance").checked == true) {
        watchGender = true;
    }
    const typeID = document.querySelector(".type").value;

    const brandID = document.querySelector(".brand").value;

    const colorID = document.querySelector(".color").value;
    console.log(colorID);

    const images = Array.from(document.querySelector("#fileImage").files);
    const data = new FormData()
    images.forEach(item =>{
        data.append("fileName",item)
    })

    data.append("watchName",watchName)
    data.append("price",price)
    data.append("waterResistance",waterResistance)
    data.append("description",description)
    data.append("thickness",thichness)
    data.append("watchGender",watchGender)
    data.append("voteLike",voteLike)
    data.append("limitQuantity",quantity)
    data.append("colorID",colorID)
    data.append("typeID",typeID)
    data.append("brandID",brandID)
    data.append("watchID", watchID)

    axios({
        method: 'put',
        url:'http://localhost:9000/ominitrix/watch/update',
        headers: { "Content-Type": "multipart/form-data" },
        data:data,
    })
        .then(function (res) {
            location.href = "../Admin/TableProduct.html";
        }).catch(function(err){
            console.log(err);
        });
        
}

function findByBrand(brandId) {
    var brand = document.getElementById("" + brandId + "");
    console.log("Sdfsdf");
    if (brand.checked == true) {
        axios.get("http://localhost:9000/ominitrix/watch").then(function (res) {
            watchs = res.data.filter(function (w) {
                return w.brandID === brandId;
            });
            document.getElementById("listWatch").innerHTML = watchs
                .map(function (watch) {
                    return (
                        '<div class="col-md-4 col-lg-4" style="margin-bottom: 20px;">' +
                        '<div class="card">' +
                        '<div class="card-header" style="position: relative;">' +
                        '<a href="ProductDetail.html?watchId=' +
                        watch.watchID +
                        '">' +
                        '<img src="http://localhost:9000/' +
                        watch.images[0] +
                        '"' +
                        'id="imageCard">' +
                        '<div class="middle">' +
                        '<i class="material-icons" style="color: gray;margin-top: 50%;">remove_red_eye</i>' +
                        "</div>" +
                        "</a>" +
                        "</div>" +
                        '<div class="card-body" style="width: 100%;margin-bottom: -30px;">' +
                        '<a href="ProductDetail.html?watchId=' +
                        watch.watchID +
                        '" class="txtLinkName"><p id="nameWatch">' +
                        watch.watchName +
                        "</p></a>" +
                        '<p id="priceWatch">' +
                        watch.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "VND",
                        }) +
                        "</p>" +
                        "</div>" +
                        '<div style="margin-bottom: 20px;">' +
                        '<button id="btnAdd2Cart" onclick="add2Cart(\'' +
                        watch.watchID +
                        '\')"><i class="material-icons" style="color: white;background-color: black;margin-right: 10px;">shopping_cart</i>Add to Cart</button>' +
                        "</div>" +
                        "</div>" +
                        " </div>"
                    );
                })
                .join("");
        });
    } else {
        location.reload();
    }
}

function adminFindByType(typeID) {
    console.log(typeID.value);
    if (typeID.value !== 'All') {
        const typeName = typeID.options[typeID.selectedIndex].text;
        axios
            .all([
                axios.get(
                    "http://localhost:9000/ominitrix/watch/find-by-type/" + typeID.value
                ),
                axios.get("http://localhost:9000/ominitrix/brand"),
                axios.get("http://localhost:9000/ominitrix/color"),
            ])
            .then(
                axios.spread(function (watchs, brands, colors) {
                    document.getElementById("bobyTblProduct").innerHTML = watchs.data
                        .map(function (watch) {
                            color = colors.data.find(function (c) {
                                return c.colorID === watch.colorID;
                            });
                            brand = brands.data.find(function (b) {
                                return b.brandID === watch.brandID;
                            });
                            return (
                                "<tr>" +
                                '<td><img style="width: 120px;height:130px"' +
                                'src="http://localhost:9000/' +
                                watch.images[0] +
                                '">' +
                                "</td>" +
                                '<td style="width: 260px;">' +
                                watch.watchName +
                                "</td>" +
                                "<td>" +
                                brand.brandName +
                                "</td>" +
                                "<td>" +
                                typeName +
                                "</td>" +
                                '<td><span class="dot" style="background-color:' +
                                color.colorName +
                                ' ;"></span>' +
                                "</td>" +
                                "<td>" +
                                watch.thickness +
                                " mm</td>" +
                                '<td id="water">' +
                                watch.watchGender +
                                "</td>" +
                                "<td>" +
                                watch.price.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "VND",
                                }) +
                                "</td>" +
                                "<td>" +
                                watch.limitQuantity +
                                "</td>" +
                                "<td>" +
                                watch.voteLike +
                                "</td>" +
                                "<td>" +
                                '<span style="display: flex;background:none">' +
                                '<button id="btnEdit"' +
                                "onclick=\"location.href='AddProduct.html?watchId=" +
                                watch.watchID +
                                "'\">" +
                                '<i class="material-icons">edit</i>' +
                                "</button>" +
                                '<button id="btnEdit" onclick="deleteById(\'' +
                                watch.watchID +
                                "')\">" +
                                '<i class="material-icons">delete</i>' +
                                "</button>" +
                                "</span>" +
                                "</td>" +
                                "</tr>"
                            );
                        })
                        .join("");
                })
            );
    } else {
        location.reload();
    }
}
function adminFindByBrand(brandID) {
    console.log(brandID.value);
    if (brandID.value !== 'undefined') {
        const brandName = brandID.options[brandID.selectedIndex].text;
        axios
            .all([
                axios.get("http://localhost:9000/ominitrix/watch"),
                axios.get("http://localhost:9000/ominitrix/type"),
                axios.get("http://localhost:9000/ominitrix/color"),
            ])
            .then(
                axios.spread(function (watchs, types, colors) {
                    watchByBrand = watchs.data.filter(function(w){
                        return w.brandID===brandID.value
                    })
                    console.log(watchByBrand);
                    document.getElementById("bobyTblProduct").innerHTML = watchByBrand
                        .map(function (watch) {
                            color = colors.data.find(function (c) {
                                return c.colorID === watch.colorID;
                            });
                            type = types.data.find(function (b) {
                                return b.typeID === watch.typeID;
                            });
                            return (
                                "<tr>" +
                                '<td><img style="width: 120px;height:130px"' +
                                'src="http://localhost:9000/' +
                                watch.images[0] +
                                '">' +
                                "</td>" +
                                '<td style="width: 260px;">' +
                                watch.watchName +
                                "</td>" +
                                "<td>" +
                                brandName +
                                "</td>" +
                                "<td>" +
                                type.typeName +
                                "</td>" +
                                '<td><span class="dot" style="background-color:' +
                                color.colorName +
                                ' ;"></span>' +
                                "</td>" +
                                "<td>" +
                                watch.thickness +
                                " mm</td>" +
                                '<td id="water">' +
                                watch.watchGender +
                                "</td>" +
                                "<td>" +
                                watch.price.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "VND",
                                }) +
                                "</td>" +
                                "<td>" +
                                watch.limitQuantity +
                                "</td>" +
                                "<td>" +
                                watch.voteLike +
                                "</td>" +
                                "<td>" +
                                '<span style="display: flex;background:none">' +
                                '<button id="btnEdit"' +
                                "onclick=\"location.href='AddProduct.html?watchId=" +
                                watch.watchID +
                                "'\">" +
                                '<i class="material-icons">edit</i>' +
                                "</button>" +
                                '<button id="btnEdit" onclick="deleteById(\'' +
                                watch.watchID +
                                "')\">" +
                                '<i class="material-icons">delete</i>' +
                                "</button>" +
                                "</span>" +
                                "</td>" +
                                "</tr>"
                            );
                        })
                        .join("");
                })
            );
    } else {
        location.reload();
    }
}

function addWatch(){
    console.log("add");
    const addprice = document.getElementById("newWPrice").value;
    const addthichness = document.getElementById("newWThickness").value;
    const addquantity = document.getElementById("newWQuantity").value;
    const adddescription = document.getElementById("newDescription").value;
    const addwatchName = document.getElementById("newWName").value;
    var addwaterResistance = false;
    if (document.getElementById("newWResistance").checked == true) {
        addwaterResistance = true;
    }
    var addwatchGender = false;
    if (document.getElementById("newWResistance").checked == true) {
        addwatchGender = true;
    }
    const addtypeID = document.querySelector(".type").value;

    const addbrandID = document.querySelector(".brand").value;

    const addcolorID = document.querySelector(".color").value;

    const images = Array.from(document.getElementById("fileImage").files);
    const data = new FormData()
    images.forEach(item =>{
        data.append("fileName",item)
    })
    data.append("watchName",addwatchName)
    data.append("price",addprice)
    data.append("waterResistance",addwaterResistance)
    data.append("description",adddescription)
    data.append("thickness",addthichness)
    data.append("watchGender",addwatchGender)
    data.append("voteLike",0)
    data.append("limitQuantity",addquantity)
    data.append("colorID",addcolorID)
    data.append("typeID",addtypeID)
    data.append("brandID",addbrandID)

    axios({
        method: 'post',
        url:'http://localhost:9000/ominitrix/watch/add',
        headers: { "Content-Type": "multipart/form-data" },
        data:data,
    })
        .then(function (res) {
            location.href = "../Admin/TableProduct.html";
        }).catch(function(err){
            console.log(err);
        });
        
}