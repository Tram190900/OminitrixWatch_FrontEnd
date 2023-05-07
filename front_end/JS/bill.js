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