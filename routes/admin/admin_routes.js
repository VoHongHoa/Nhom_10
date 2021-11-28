/* controller */
const express = require('express');
const adminModel = require('../../models/admin_model');
const restrict = require("../../middlewares/auth_mw");
const router = express.Router();

router.get('/sp_daban',restrict, async function(req, res){
    
    const list = await adminModel.dssanpham();
    res.render(`admin/view_admin/sp_daban`,{
        sp_list: list,
        empty: list.length === 0
    });
})
router.get('/kh_tongtien',restrict, async function(req, res){
    const list = await adminModel.dskhachhang();
    res.render(`admin/view_admin/kh_tongtien`,{
        kh_list: list,
        empty: list.length === 0
    });
})
module.exports = router