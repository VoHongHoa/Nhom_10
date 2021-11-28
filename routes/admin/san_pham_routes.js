/* controller */
const express = require('express');
const san_phamModel = require('../../models/san_pham.model');
const restrict = require("../../middlewares/auth_mw_admin");
const router = express.Router();

router.get('/',restrict, async function(req, res){
    
    const list = await san_phamModel.all();
    res.render(`admin/view_san_pham/list`,{
        san_pham: list,
        empty: list.length === 0
    });
})

router.get('/add',restrict, function(req, res){
    res.render(`admin/view_san_pham/add`,{
    });
})

router.post('/add',restrict, async function(req, res){
     const rs = await san_phamModel.add(req.body)
     res.render(`admin/view_san_pham/add`);
 })

 router.get('/edit',restrict, async function(req, res){
    const id = +req.query.id || -1;
    const rows = await san_phamModel.single(id);
    if(rows.length===0)
    res.send('invalid parameter');
    const san_pham = rows[0];
    res.render(`admin/view_san_pham/edit`, {
        san_pham
    });
})

router.post('/update',restrict, async function(req, res){
    /* const entity = {
         id_loai_sp: req.body.id_loai_sp,
         ten_loai_sp: req.body.ten_loai_sp
     }*/
     
     // entity trùng với req.body
 
     const rs = await san_phamModel.update(req.body)
     res.redirect('/admin/san_pham');
 })
 
 router.post('/del',restrict, async function(req, res){
     await san_phamModel.del(req.body.id_sp)
     res.redirect('/admin/san_pham');
 })


module.exports = router