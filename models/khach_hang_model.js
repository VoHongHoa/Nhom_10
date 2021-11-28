const db = require('../utils/db');
const TBL_khach_hang = 'khach_hang';
module.exports ={
    all: function(){
        return db.load(`select * from ${TBL_khach_hang} `);
    },
    add: function(entity){
        return db.add(TBL_khach_hang, entity)
    },
    single: function(id){
        return db.load(`select * from ${TBL_khach_hang} where id_kh = ${id}`);
    },

    singleBySdt: async function(so_dt_kh) {
        const rows = await db.load(`select * from ${TBL_khach_hang} where so_dt_kh = ${so_dt_kh}`);
        if(rows.length === 0)
            return null;
        return rows[0];
    },

    update: function (entity){
        const condition = {
            id_kh : entity.id_kh
        }
        delete entity.id_kh;
        return db.update(TBL_khach_hang, entity, condition)
    },
    del: function (id){
        const condition = {
            id_kh : id
        }
        return db.del(TBL_khach_hang, condition)
    },
    findbyid: function (id){
        return db.load(`select ten_kh from ${TBL_khach_hang} where id_kh = ${id}`)
    }

}