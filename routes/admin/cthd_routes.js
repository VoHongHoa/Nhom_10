/* controller */
const express = require('express');
const cthdModel = require('../../models/chi_tiet_hoa_don_model');
const restrict = require("../../middlewares/auth_mw");
const router = express.Router();

router.get('/',restrict, async function(req, res){
    
    const list = await cthdModel.all();
    res.render(`admin/view_cthd/list`,{
        cthd: list,
        empty: list.length === 0
    });
})

router.get('/add',restrict, function(req, res){
    res.render(`admin/view_cthd/add`,{
    });
})

router.post('/add',restrict,async function(req, res){
     const rs = await cthdModel.add(req.body)
     res.render(`admin/view_cthd/add`);
 })

 router.get('/edit',restrict, async function(req, res){
    const id_hd = +req.query.id_hd || -1;
    const id_sp = +req.query.id_sp || -1;
    const rows = await cthdModel.single(id_hd,id_sp);
    console.log(id_hd,id_sp)
    const cthd = rows[0];
    res.render(`admin/view_cthd/edit`, {
        cthd
    });
})

router.post('/update',restrict,async function(req, res){

     const rs = await cthdModel.update(req.body)
     res.redirect('/admin/cthd');
 })
 router.post('/del',restrict,async function(req, res){
     await cthdModel.del(req.body.id_hd,req.body.id_sp)
     res.redirect('/admin/cthd');
 })
module.exports = router