const db = require('../utils/db');
module.exports ={
    dssanpham: function(){
        return db.load(`SELECT san_pham.id_sp,san_pham.ten_sp,san_pham.gia_sp,SUM(chi_tiet_hoa_don.so_luong) AS 'so_luong', SUM(san_pham.gia_sp*chi_tiet_hoa_don.so_luong) AS 'thanh_tien' FROM san_pham INNER JOIN chi_tiet_hoa_don on san_pham.id_sp = chi_tiet_hoa_don.id_sp GROUP BY san_pham.id_sp, san_pham.ten_sp;`)
    },
    dskhachhang: function(){
        return db.load(`SELECT khach_hang.id_kh, khach_hang.ten_kh, SUM(chi_tiet_hoa_don.so_luong*san_pham.gia_sp) AS 'tongtien' FROM khach_hang INNER JOIN hoa_don ON khach_hang.id_kh=hoa_don.id_kh INNER JOIN chi_tiet_hoa_don ON hoa_don.id_hd=chi_tiet_hoa_don.id_hd INNER JOIN san_pham ON chi_tiet_hoa_don.id_sp=san_pham.id_sp GROUP BY khach_hang.id_kh, khach_hang.ten_kh;`)
    }
}