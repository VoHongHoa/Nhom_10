/* controller */
const express = require('express');
const khachhangmodel = require('../../models/khach_hang_model')
const restrict = require("../../middlewares/auth_mw_admin");
const router = express.Router();

router.get('/',restrict, async function(req, res){
    
    const list = await khachhangmodel.all();
    res.render(`admin/view_khach_hang/list`,{
        khachhang: list,
        empty: list.length === 0
    });
})
router.get('/add',restrict, function(req, res){
    res.render(`admin/view_khach_hang/add`);
})
router.post('/add',restrict, async function(req, res){
    await khachhangmodel.add(req.body)
    res.render(`admin/view_khach_hang/add`);
})

router.get('/edit',restrict, async function(req, res){
    const id = +req.query.id || -1;
    const rows = await khachhangmodel.single(id);
    if(rows.length===0)
    res.send('invalid parameter');
    const khachhang = rows[0];
    res.render(`admin/view_khach_hang/edit`, {
        khachhang
    });
})

 router.post('/update',restrict, async function(req, res){
    await khachhangmodel.update(req.body)
     res.redirect('/admin/khach_hang');
 })
 
 router.post('/del',restrict, async function(req, res){
     await khachhangmodel.del(req.body.id_kh)
     res.redirect('/admin/khach_hang');
 })
module.exports = router