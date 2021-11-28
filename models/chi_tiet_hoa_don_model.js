const db = require('../utils/db');
const TBL_chi_tiet_hd = 'chi_tiet_hoa_don';
module.exports ={
    all: function(){
        return db.load(`select * from ${TBL_chi_tiet_hd} `);
    },
    add: function(entity){
        return db.add(TBL_chi_tiet_hd, entity)
    },
    single: function(id, id1){
        return db.load(`select * from ${TBL_chi_tiet_hd} where id_hd = ${id} and id_sp = ${id1}` );
    },

    update: function (entity){
        const condition = {
            id_hd : entity.id_hd
        }
        delete entity.id_hd;
        return db.update(TBL_chi_tiet_hd, entity, condition)
    },
    del: function (id,id1){
        const condition ={
            id_hd : id,
            id_sp : id1
        }
        //console.log(condition)
        return db.delctsp(TBL_chi_tiet_hd, condition.id_hd, condition.id_sp)
    }
}