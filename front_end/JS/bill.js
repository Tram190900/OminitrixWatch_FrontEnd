function findBillByEmail(email){
    axios.all([
        axios.get('http://localhost:9000/ominitrix/bill'),
        axios.get('http://localhost:9000/ominitrix/user'),
        axios.get('http://localhost:9000/ominitrix/payment')
    ]).then(axios.spread((bills, users, payments)=>{
        userByEmail = users.data.filter((u)=>{
            return u.email === email
        })
        bill = bills.data.filter((b)=>{
            return b.userID === user.userID
        })
        document.getElementById('bodyTblOrder').innerHTML = bill.map(function(bill){
            var user = userByEmail.find(function(u){
                return u.userID === bill.userID
            })
            var payment = payments.data.find(function(p){
                return p.billID === bill.billID
            })
            return(
                '<tr>'+
                    '<td><a class="tablinks" onclick="location.href=\'EditOrder.html?billId='+bill.billID+'\'">'+bill.billID+'</a></td>'+
                    '<td id="email">'+user.email+'</td>'+
                    '<td>'+bill.date+'</td>'+
                    '<td>'+payment.status+'</td>'+
                    '<td>'+bill.total.toLocaleString('en-US', {style : 'currency', currency : 'VND'})+'</td>'+
                    '<td>'+
                        '<span style="display: flex;background:none">'+
                            '<button id="btnEdit"'+
                                'onclick="location.href=\'EditOrder.html?billId='+bill.billID+'\'">'+
                                '<i class="material-icons">edit</i>'+
                            '</button>'+
                            '<button id="btnDelete">'+
                                '<i class="material-icons">delete</i>'+
                            '</button>'+
                        '</span>'+
                    '</td>'+
                '</tr>'
            )
        }).join('')
    })).catch((err) => {
        
    });
}

function changeQuantityInBill(watchID,billID,price){
    quantity = document.querySelector('#quantity'+watchID+'').value
    console.log(quantity);
    console.log(billID);
    console.log(price);
    
}
function totalByMonth(month){
    var tong = 0
    axios.get('http://localhost:9000/ominitrix/bill/month-bill/'+month)
        .then((result) => {
            result.data.forEach(element => {
                tong = tong + element.total
            });
            console.log(tong);
            return tong
        }).catch((err) => {
            console.log(err);
        });
}
function addBill(){
    user = JSON.parse(sessionStorage.getItem('userid'))
    var userID = user.userID

    total = parseFloat(sessionStorage.getItem('total'))
    date = new Date()

    var index = 0
    axios.get('http://localhost:9000/ominitrix/bill')
        .then(function(res){
            index += Object.entries(res.data).length
            axios.post('http://localhost:9000/ominitrix/bill/add',{
                    "date": date,
                    "total": total,
                    "userID": userID,
                    "billID":"B_"+(index+1)
                }).then(function(res){
                    if(res.status==200){
                        console.log(res.data.billID);
                        var billID = res.data.billID
                        cart = JSON.parse(sessionStorage.getItem('cart'))
                        cart.forEach(item=>{
                            axios.post('http://localhost:9000/ominitrix/bill-detail/add',{
                                "quantity": item.quantity,
                                "price": item.price,
                                "watchID": item.watchID,
                                "billID":billID
                            }).then(function(res){
                                console.log(res.data);
                            })
                            axios.post('http://localhost:9000/ominitrix/payment/add',{
                                "status": "paid",
                                "billID":billID
                            }).then(function(res){
                                console.log(res.data);
                                sessionStorage.removeItem('cart')
                                location.reload()
                            })
                        })
                        
                    }
                })
        })
    // axios.post('http://localhost:9000/ominitrix/bill/add',{
    //     "date": date,
    //     "total": total,
    //     "userID": userID,
    //     "billID":"B_"+(index+1)
    // }).then(function(res){
    //     if(res.status==200){
    //         console.log(res.data.billID);
    //         var billID = res.data.billID
    //         cart = JSON.parse(sessionStorage.getItem('cart'))
    //         cart.forEach(item=>{
    //             axios.post('http://localhost:9000/ominitrix/bill-detail/add',{
    //                 "quantity": item.quantity,
    //                 "price": item.price,
    //                 "watchID": item.watchID,
    //                 "billID":billID
    //             }).then(function(res){
    //                 console.log(res.data);
    //             })
    //             axios.post('http://localhost:9000/ominitrix/payment/add',{
    //                 "status": "paid",
    //                 "billID":billID
    //             }).then(function(res){
    //                 console.log(res.data);
    //                 sessionStorage.removeItem('cart')
    //                 location.reload()
    //             })
    //         })
            
    //     }
    //  })
}