var listWatchInCart = []
function add2Cart(watchid){
    
    listWatchInCart.push({
        watchid:watchid,
        quantity:1
    })
    sessionStorage.setItem('cart',JSON.stringify(listWatchInCart))
}
function changeQuantity(watchid){
   
}
