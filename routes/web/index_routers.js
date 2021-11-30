/* controller */
const express = require('express');
const san_phamModel = require('../../models/san_pham.model');
const khach_hangmodel = require('../../models/khach_hang_model')
const khachhangmodel = require('../../models/khach_hang_model');
const Cart = require('../../models/cart')
const restrict = require("../../middlewares/auth_mw");
const loai_spModel = require("../../models/loai_sp_model")
const router = express.Router();
const bcrypt = require('bcryptjs')
/*web index*/

router.get('/', async function(req, res){
    const limit =8; 
    const list = await san_phamModel.limit(limit);
    list.map(function(p){
        p.f_gia_sp= p.gia_sp + 'đ';
        p.gia_moi = p.gia_sp*(100 - p.giam_gia_sp)/100 + 'đ';
        p.f_giam_gia_sp = '-' + p.giam_gia_sp + '%' 
    })
    //console.log(page_item)
    res.render(`web/gioi_thieu`,{
        san_pham: list,
        empty: list.length === 0
    });
})


router.get('/san_pham', async function(req, res){
    const limit = 8;
    const page = +req.query.page || 1
    if (page < 0) page =1
    const offset = (page - 1)*limit;
    const list = await san_phamModel.paging(limit, offset);
    list.map(function(p){
        p.f_gia_sp= p.gia_sp + 'đ';
        p.gia_moi = p.gia_sp*(100 - p.giam_gia_sp)/100 + 'đ';
        p.f_giam_gia_sp = '-' + p.giam_gia_sp + '%' 
    })
    const total = await san_phamModel.count();
    const nPage = Math.ceil(total/limit);
    const page_item = [];
    for (let i = 1;i <= nPage; i++){
        const item ={
            value: i,
            isActive: i === page
        }
        page_item.push(item);
    }
    console.log(page_item)
    res.render(`web/san_pham`,{
        san_pham: list,
        empty: list.length === 0,
        page_item,
        pre: page - 1,
        next: page + 1,
        can_pre: page > 1,
        can_next: page < nPage
    });
})

router.get('/byCat/:id_loai_sp', async function(req, res){
    const limit = 4;
    const page = +req.query.page || 1
    if (page < 0) page =1
    const offset = (page - 1)*limit;
    const list = await san_phamModel.pagingByCat(req.params.id_loai_sp, limit, offset);
    list.map(function(p){
        p.f_gia_sp= p.gia_sp + 'đ';
        p.gia_moi = p.gia_sp*(100 - p.giam_gia_sp)/100 + 'đ';
        p.f_giam_gia_sp = '-' + p.giam_gia_sp + '%' 
    })
    const total = await san_phamModel.countByCat(req.params.id_loai_sp);
    console.log(total)
    const nPage = Math.ceil(total/limit);
    const page_item = [];
    for (let i = 1;i <= nPage; i++){
        const item ={
            value: i,
            isActive: i === page
        }
        page_item.push(item);
    }
    console.log(page_item)
    res.render(`web/byCat`,{
        san_pham: list,
        empty: list.length === 0,
        page_item,
        pre: page - 1,
        next: page + 1,
        can_pre: page > 1,
        can_next: page < nPage
    });
})
router.get('/KM/:giam_gia_sp', async function(req, res){
    const list = await san_phamModel.san_pham_km(req.params.giam_gia_sp);
    list.map(function(p){
        p.f_gia_sp= p.gia_sp + 'đ';
        p.gia_moi = p.gia_sp*(100 - p.giam_gia_sp)/100 + 'đ';
        p.f_giam_gia_sp = '-' + p.giam_gia_sp + '%' 
    })
    res.render(`web/KM`,{
        san_pham: list,
        empty: list.length === 0,
    });
})

/* tin tuc */
router.get('/tin_tuc',async function (req,res){
    res.render(`web/tin_tuc`)
})
/* he thong cua hang */
router.get('/he_thong_shop',async function (req,res){
    res.render(`web/he_thong_shop`)
})
/* thong tin tuyen dun */
router.get('/tuyen_dung',async function (req,res){
    res.render(`web/tuyen_dung`)
})

/* thanh search*/
router.get('/search', async  function (req,res){
    try{
        var searchtext = req.query.searchtext;
        var list = await san_phamModel.findbyname(searchtext);
        if(list.length===0)
        {list = await  san_phamModel.findloaisp(searchtext);}

        list.map(function(p){
            p.f_gia_sp= p.gia_sp + 'đ';
            p.gia_moi = p.gia_sp*(100 - p.giam_gia_sp)/100 + 'đ';
            p.f_giam_gia_sp = '-' + p.giam_gia_sp + '%'
        })
        res.render('web/san_pham',{
            san_pham: list,
            empty: list.length === 0})
    } catch (error){
        res.redirect('/web')
    }
})


/* dang nhap */
router.get('/dangnhap',async function (req,res){
   res.render(`web/dangnhap`, {layout: false})
})


/* profile*/

router.get('/profile', restrict, async function (req,res){
    // await khachhangmodel.add(req.body)
    // console.log(req.session.authUser)
    res.render(`web/profile`);
})
router.post('/profile',restrict, async function (req,res){
    await khachhangmodel.update(req.body);
    res.locals.lcAuthUser.ten_kh = req.body.ten_kh;
    res.locals.lcAuthUser.dia_chi_kh = req.body.dia_chi_kh;
    res.locals.lcAuthUser.so_dt_kh = req.body.so_dt_kh;
    res.render('web/profile');
})
 /*Dang xuat*/
 router.post('/dang_xuat', restrict, function (req, res) {
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    // res.redirect('/web')
    res.redirect(req.headers.referer);
})
/* dang ky*/
router.get('/dang_ky',async function (req,res){
    // await khachhangmodel.add(req.body)
    res.render(`web/dang_ky`, {layout: false});
})





/*web news*/
router.get('/tin_tuc_1',async function (req,res){
    res.render(`web/tin_tuc_1`)
})
router.get('/tin_tuc_2',async function (req,res){
    res.render(`web/tin_tuc_2`)
})
router.get('/tin_tuc_3',async function (req,res){
    res.render(`web/tin_tuc_3`)
})
/* web tuyen dung*/
router.get('/tuyen_dung_1',async function (req,res){
    res.render(`web/tuyen_dung_1`)
})

/* shop cart*/
router.get('/cart', async function (req,res){
    res.render('web/cart')
})

/* mua san pham*/


router.get('/cart',async function(req, res, next) {
    if (!req.session.cart) {
        return res.render('cart', {
            products: null
        });
    }
    var cart = req.session.cart;

    res.render('cart', {
        totalitem : cart.totalQty,
        totalprice : cart.totalPrice,
        cart
    });
});
module.exports=router