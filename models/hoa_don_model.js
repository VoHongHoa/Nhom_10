const db = require('../utils/db');
const TBL_hoa_don = 'hoa_don';
module.exports ={
    all: function(){
        return db.load(`select * from ${TBL_hoa_don} `);
    },
    add: function(entity){
        return db.add(TBL_hoa_don, entity)
    },
    single: function(id){
        return db.load(`select * from ${TBL_hoa_don} where id_hd = ${id}`);
    },

    update: function (entity){
        const condition = {
            id_hd : entity.id_hd
        }
        delete entity.id_hd;
        return db.update(TBL_hoa_don, entity, condition)
    },
    del: function (id){
        const condition = {
            id_hd : id
        }
        return db.del(TBL_hoa_don, condition)
    },
    single_kh_hd: function(id){
        return db.load(`select * from ${TBL_hoa_don} where id_kh = ${id}`);
    }


}