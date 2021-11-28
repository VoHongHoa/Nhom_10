const btn = document.querySelector(".btn_giohang")
//console.log(btn)
btn.addEventListener("click",function(){
    carttotal()
})


function carttotal(){
    var cartItem = document.querySelectorAll('tbody tr')
    var total=0;
    var count =0;
    //console.log(cartItem)
    for(var i=0; i<cartItem.length;i++){
        var inputvalue = cartItem[i].querySelector(".so_luong").value
        var productPrice = cartItem[i].querySelector(".price").innerText
        //console.log(inputvalue,productPrice)
        var totalA = inputvalue*productPrice
        total = total + totalA
        count = Number(count) + Number(inputvalue)
        //console.log(total)
    }
    
    var cartTotal = document.querySelector(".total")
    //console.log(cartTotal)
    cartTotal.innerHTML = total
    var cartcount = document.querySelector(".count")
    cartcount.innerHTML = count
    inputchange()
}

function inputchange(){
    var cartItem = document.querySelectorAll('tbody tr')
    for(var i=0; i<cartItem.length;i++){
        var inputValue=cartItem[i].querySelector("input")
        inputValue.addEventListener("change",function(){
            carttotal()
        })
    }
}

