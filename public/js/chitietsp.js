const btn = document.querySelectorAll('.product-content-left-img img');
const anh = document.querySelector(".product-content-left-main-img img")
//console.log(anh)
 btn.forEach(function(button, index){
     button.addEventListener("click",function(event){
         var btnItem = event.target
         var srcImg = btnItem.src
        anh.src = srcImg;
     })
 })
const btn_mau = document.querySelectorAll(".mau_sp")
//console.log(btn_mau)
const mau = document.querySelector(".hien_thi_mau")
//console.log(mau)
btn_mau.forEach(function(button, index){
    button.addEventListener("click",function(event){
        var btnItem = event.target
        var tenmau = btnItem.querySelector(".ten_mau").innerText
        //console.log(tenmau) 
        mau.value = tenmau 
    })
})
const btn_size = document.querySelectorAll(".size_sp")
//console.log(btn_mau)
const size = document.querySelector(".hien_thi_size")
//console.log(mau)
btn_size.forEach(function(button, index){
    button.addEventListener("click",function(event){
        var btnItem = event.target
        var btnParent = btnItem.parentElement
        //console.log(btnParent)
        var so_size = btnParent.querySelector(".so_size").innerText

        // var tensize = btnItem.querySelector(".so_size").innerText
        // //console.log(tensize) 
        size.value = so_size
    })
})