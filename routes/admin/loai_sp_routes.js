/* controller */
const express = require('express');
const loaispmodel = require('../../models/loai_sp_model')
const restrict = require("../../middlewares/auth_mw_admin");

const router = express.Router();

router.get('/',restrict, async function(req, res){
    
    const list = await loaispmodel.all();
    res.render(`admin/view_loai_sp/list`,{
        loaisp: list,
        empty: list.length === 0

    });
})
router.get('/add',restrict, function(req, res){
    res.render(`admin/view_loai_sp/add`);
})
router.post('/add',restrict, async function(req, res){
   /* const entity = {
        id_loai_sp: req.body.id_loai_sp,
        ten_loai_sp: req.body.ten_loai_sp
    }*/
    
    // entity trùng với req.body

    const rs = await loaispmodel.add(req.body)
    res.render(`admin/view_loai_sp/add`);
})

router.get('/edit',restrict, async function(req, res){
    const id = +req.query.id || -1;
    const rows = await loaispmodel.single(id);
    if(rows.length===0)
    res.send('invalid parameter');
    const loai_sp = rows[0];
    res.render(`admin/view_loai_sp/edit`, {
        loai_sp
    });
})

 router.post('/update',restrict, async function(req, res){
    /* const entity = {
         id_loai_sp: req.body.id_loai_sp,
         ten_loai_sp: req.body.ten_loai_sp
     }*/
     
     // entity trùng với req.body
 
     const rs = await loaispmodel.update(req.body)
     res.redirect('/admin/loai_sp');
 })
 
 router.post('/del',restrict, async function(req, res){
     await loaispmodel.del(req.body.id_loai_sp)
     res.redirect('/admin/loai_sp');
 })
module.exports = router