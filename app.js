const express = require('express');/*khai bao thu vien express */
const exphbs  = require('express-handlebars');
const session = require('express-session')
const bcrypt = require('bcryptjs')

const khachhangmodel = require("./models/khach_hang_model");
const hoa_don_model = require("./models/hoa_don_model")
const chi_tiet_hd = require("./models/chi_tiet_hoa_don_model")
const restrict = require("./middlewares/auth_mw")


const app = express();
/*Cho phep nhan du lieu */

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
     // secure: true 
    }
}))

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.use(express.urlencoded({
    extended: true
})
)
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main.hbs'
}));
app.set('view engine', '.hbs');

app.use(express.static(__dirname+'/public'))

app.use(async function(req, res, next) {
    if(req.session.isAuthenticated === null)
    {
        req.session.isAuthenticated = false;
    }
    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    res.locals.lcAuthUser = req.session.authUser;
    next()
})


app.post('/web/dangnhap',async function (req,res){
    const user = await khachhangmodel.singleBySdt(req.body.so_dt_kh)
    if(user === null) {
        return res.render(`web/dangnhap`, {layout: false, err: 'Số điện thoại hoặc mật khẩu không đúng!'})
    }
    const rs = bcrypt.compareSync(req.body.pass, user.pass)
    if(rs === false)
    {
        return res.render(`web/dangnhap`, {layout: false, err: 'Số điện thoại hoặc mật khẩu không đúng!'})
    }

    delete user.pass;
    req.session.isAuthenticated = true;
    req.session.authUser = user;
    console.log(req.session.authUser)
    if(user.quyen === 0)
    {
        const url = req.query.retUrl || '/web'
        res.redirect(url)
    }
    if(user.quyen !==0)
    {
        console.log(req.url)
        //res.render(`/main_admin`, {layout: false})
        res.redirect('/admin/loai_sp')
    }
})
app.post('/web/dang_ky',async function (req,res){
    const pass = bcrypt.hashSync(req.body.pass, 8)
    const entity = {
        id_kh: req.body.id_kh,
        ten_kh: req.body.ten_kh,
        so_dt_kh: req.body.so_dt_kh,
        pass,
        dia_chi_kh: req.body.dia_chi_kh,
        quyen: 0
    }
    await khachhangmodel.add(entity)
    res.redirect(`/web/dangnhap`);
})
const san_phamModel = require('./models/san_pham.model');
const Cart = require('./models/cart')

app.get('/web/views_sp/:id',async function (req,res){
    var productid = req.params.id;
    var product = await san_phamModel.findbyid(productid);
    res.render('web/chitietsp',{
        product: product
    })
})

app.get('/web/add/:id',async function(req, res, next) {
    var productId = req.params.id;
    var count = req.query.soluong
    var size = req.query.size
    var color = req.query.color
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    var product = await san_phamModel.findbyid_size_color(productId,size,color);
    product.map(function(p){
        p.gia_moi = p.gia_sp*(100 - p.giam_gia_sp)/100 ;
    })
    cart.add(product[0], productId,count);
    var entity = {
       id_kh : req.session.authUser.id_kh,
       trang_thai_hd : 0,
       ngay_hd: new Date()
    }
    var rows_1 = await hoa_don_model.single_kh_hd(entity.id_kh)
    if(rows_1.length === 0){
       await hoa_don_model.add(entity)
    }
    var rows = await hoa_don_model.single_kh_hd(entity.id_kh)
    var entity1 = {
        id_hd : rows[0].id_hd,
        id_sp : productId,
        so_luong: count
    }
    //console.log(entity1)
    chi_tiet_hd.add(entity1)

    req.session.cart = cart;
    res.redirect(req.get('referer'));
});

app.get('/web/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/web/cart');
});
app.get('/web/delete/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/web/cart');
});



const home = require('./routes/web/index_routers')
app.use('/web',home);

const categoryRouter = require('./routes/admin/san_pham_routes');
app.use('/admin/san_pham', categoryRouter);

const loaispRouter = require('./routes/admin/loai_sp_routes');
app.use('/admin/loai_sp', loaispRouter);

const khachhangRouter = require('./routes/admin/khach_hang_routes');


app.use('/admin/khach_hang', khachhangRouter);

app.use('/admin/hoa_don', require('./routes/admin/hoa_don_routes'));

app.use('/admin/cthd', require('./routes/admin/cthd_routes'));

app.use('/admin/doanh_thu', require('./routes/admin/admin_routes'));



const port =8080;
app.listen(port,function(){
    console.log(`Server is running at port: ${port}`);
})
