
function registration(){
    var userid = "customer05"
                var first_name = document.getElementById('firstName').value
                var last_name = document.getElementById('lastName').value
                var phone = document.getElementById('phone').value
                var email = document.getElementById('email').value
                var password = document.getElementById('password').value
    
                var user={
                    "userid" :userid,
                    "address": "",
                    "email": email,
                    "first_name": first_name,
                    "last_name": last_name,
                    "phone": phone
                }
                var account ={
                    "userid": userid,
                    "password": password,
                    "role": "customer"
                }
                
                axios.post('https://6447c77c7bb84f5a3e48a467.mockapi.io/users', user)
                    .then(function(response){
                    if (response.status == 201) {
                        axios.post('https://6447c77c7bb84f5a3e48a467.mockapi.io/account',account)
                            .then(function(response){
                                if(response.status==201 || response.status==200){
                                    location.href = '../HTML/Home.html' 
                                    sessionStorage.setItem('userid',JSON.stringify(user))
                                    sessionStorage.setItem('account',JSON.stringify(account))
                                }
                            })    
                    }    
                    }).catch(function(err){
                        console.log(err);
                    })

}

function isCustomer(){
        if('userid' in sessionStorage && 'account' in sessionStorage){
            user = JSON.parse(sessionStorage.getItem('userid'))
            account = JSON.parse(sessionStorage.getItem('account'))

            document.getElementById('guest').style.display ="none"
            document.getElementById('customer').style.display ="inline"
            document.getElementById('userName').innerHTML = '<i class="material-icons">account_circle</i>'+user.last_name+''
            if(account.role==="customer"){
                document.getElementById('roleAdmin').style.display="none"
                console.log('customer');
            }else if(account.role==='admin'){
                document.getElementById('roleAdmin').style.display="inline"
                console.log('admin');
            }
            console.log("exit");
        }else{
            document.getElementById('guest').style.display ="inline"
            document.getElementById('customer').style.display ="none"
            console.log('userid dont exit');
        }
    
}

function logOut(){
    sessionStorage.removeItem('userid')
    sessionStorage.removeItem('account')
    document.getElementById('guest').style.display ="inline"
    document.getElementById('customer').style.display ="none"
    console.log('userid dont exit');
}

function login(){
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    axios.get('../JS/users.json')
            .then(function(response){
                let user = response.data.find(function(u){
                    return u.email===email
                })
                console.log(user);
                if(typeof(user)!='undefined'){
                    axios.get('../JS/account.json')
                    .then(function(response){
                        let account = response.data.find(function(a){
                            return a.userid === user.userid
                        })
                        if(typeof(account)!='undefined'){
                            if(account.password===password){
                                location.href = '../HTML/Home.html' 
                                sessionStorage.setItem('userid',JSON.stringify(user))
                                sessionStorage.setItem('account',JSON.stringify(account))
                            }else{
                                alert('Password sai. Nhập lại password')
                                document.getElementById('password').focus()
                            }
                        }else{
                            alert('Tài khoản này không tồn tại')
                        }
                    })
                }else{
                    alert('Email không đúng')
                    document.getElementById('email').focus()
                }
                
            })
        
        
}