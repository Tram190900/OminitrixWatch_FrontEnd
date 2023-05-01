var listWatchInCart = []
function add2Cart(watchid){
    listWatchInCart.push({
        "watchID":watchid,
        "quantity":1,
    })
    sessionStorage.setItem('cart',JSON.stringify(listWatchInCart))
    document.getElementById('quantityCart').innerText = listWatchInCart.length
    alert("Thêm vào giỏ hàng thành công")
    
}
function changeQuantity(price,watchid){
    qty = parseInt(document.querySelector('.Qty'+watchid).value)
    arr = JSON.parse(sessionStorage.getItem('cart'))
    index = arr.findIndex((item=>item.watchID===watchid))
    newQty = arr[index].quantity = qty
    total = price*qty
    document.querySelector('.total'+watchid).innerText = (total).toLocaleString('en-US', {style : 'currency', currency : 'VND'})

    

    sessionStorage.setItem('cart',JSON.stringify(arr))
    return price*qty
}

function removeToCart(watchID){
    arr = JSON.parse(sessionStorage.getItem('cart'))
    arrNew = arr.find(function(a){
        return a.watchID !== watchID
    })
    sessionStorage.setItem('cart',JSON.stringify(arrNew))
    location.reload()
}

function quantityInCart(){
    if('cart' in sessionStorage){
        arr = JSON.parse(sessionStorage.getItem('cart'))
        document.getElementById('quantityCart').innerText = arr.length
    }else{
        document.getElementById('quantityCart').innerText = '0'
    }
}
