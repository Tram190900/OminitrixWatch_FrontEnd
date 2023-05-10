function add2Cart(watchid,price) {
  if ("cart" in sessionStorage) {
    listWatchInCart = JSON.parse(sessionStorage.getItem("cart"));
    listWatchInCart.push({
      watchID: watchid,
      quantity: 1,
      price:price
    });
    sessionStorage.setItem("cart", JSON.stringify(listWatchInCart));
    document.getElementById("quantityCart").innerText = listWatchInCart.length;
    alert("Thêm vào giỏ hàng thành công");
  } else {
    listWatchInCart = [];
    listWatchInCart.push({
      watchID: watchid,
      quantity: 1,
      price:price
    });
    sessionStorage.setItem("cart", JSON.stringify(listWatchInCart));
    document.getElementById("quantityCart").innerText = listWatchInCart.length;
    alert("Thêm vào giỏ hàng thành công");
  }
}
function changeQuantity(price, watchid) {
  qty = parseInt(document.querySelector(".Qty" + watchid).value);
  arr = JSON.parse(sessionStorage.getItem("cart"));
  index = arr.findIndex((item) => item.watchID === watchid);
  newQty = arr[index].quantity = qty;
  total = price * qty;
  document.querySelector(".total" + watchid).innerText = total.toLocaleString(
    "en-US",
    { style: "currency", currency: "VND" }
  );

  sessionStorage.setItem("cart", JSON.stringify(arr));
  location.reload()
  return price * qty;
}

function removeToCart(watchID) {
  arr = JSON.parse(sessionStorage.getItem("cart"));
  console.log(arr);
  var arrNew = [];
  arrNew.push(
    arr.find(function (a) {
      return a.watchID !== watchID;
    })
  );
  if(!arrNew){
    sessionStorage.setItem("cart", JSON.stringify(arrNew));
  }else{
    sessionStorage.removeItem('cart')
  }
  location.reload()
}

function quantityInCart() {
  if ("cart" in sessionStorage) {
    arr = JSON.parse(sessionStorage.getItem("cart"));
    document.getElementById("quantityCart").innerText = arr.length;
  } else {
    document.getElementById("quantityCart").innerText = "0";
  }
}
