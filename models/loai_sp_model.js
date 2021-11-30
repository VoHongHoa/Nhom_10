const db = require('../utils/db');
const TBL_loai_sp = 'loai_sp'
module.exports ={
    all: function(){
        return db.load(`select * from ${TBL_loai_sp} `);
    },
    single: function(id){
        return db.load(`select * from loai_sp where id_loai_sp = ${id}`);
    },
    add: function(entity){
       return db.add(TBL_loai_sp, entity)
    },
    update: function (entity){
        const condition = {
            id_loai_sp : entity.id_loai_sp
        }
        delete entity.id_loai_sp;
        return db.update(TBL_loai_sp, entity, condition)
    },
    del: function (id){
        const condition = {
            id_loai_sp : id
        }
        return db.del(TBL_loai_sp, condition)
    },
    So_luong: function(){
        return db.load(`SELECT loai_sp.* ,COUNT(san_pham.id_sp) AS So_luong FROM loai_sp LEFT JOIN san_pham ON loai_sp.id_loai_sp = san_pham.id_loai_sp GROUP BY loai_sp.id_loai_sp, loai_sp.ten_loai_sp`);
    },
    
}