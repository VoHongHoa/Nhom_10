/* controller */
const express = require('express');
const hoadonmodel = require('../../models/hoa_don_model')
const restrict = require("../../middlewares/auth_mw_admin");
const router = express.Router();

router.get('/',restrict, async function(req, res){
    
    const list = await hoadonmodel.all();
    res.render(`admin/view_hoa_don/list`,{
        hoadon: list,
        empty: list.length === 0
    });
})
router.get('/add',restrict ,function(req, res){
    res.render(`admin/view_hoa_don/add`);
})
router.post('/add',restrict, async function(req, res){
    await hoadonmodel.add(req.body)
    res.render(`admin/view_hoa_don/add`);
})

router.get('/edit',restrict, async function(req, res){
    const id = +req.query.id || -1;
    const rows = await hoadonmodel.single(id);
    if(rows.length===0)
    res.send('invalid parameter');
    const hoadon = rows[0];
    res.render(`admin/view_hoa_don/edit`, {
        hoadon
    });
})

 router.post('/update',restrict, async function(req, res){
    await hoadonmodel.update(req.body)
     res.redirect('/admin/hoa_don');
 })
 
 router.post('/del',restrict, async function(req, res){
     await hoadonmodel.del(req.body.id_kh)
     res.redirect('/admin/hoa_don');
 })
module.exports = router