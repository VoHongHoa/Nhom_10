const db = require('../utils/db');
const TBL_san_pham = 'san_pham';
const TBL_loai_sp = 'loai_sp'
module.exports ={
    all: function(){
        return db.load(`select * from ${TBL_san_pham} `);
    },
    limit: function(limit){
        return db.load(`select * from ${TBL_san_pham} limit ${limit}`);
    },
    paging: function(limit, offset){
        return db.load(`select * from ${TBL_san_pham} limit ${limit} offset ${offset}`);
    },
    pagingByCat: function(catId, limit, offset){
        return db.load(`select * from ${TBL_san_pham} where id_loai_sp = ${catId} limit ${limit} offset ${offset}`);
    },
    add: function(entity){
        return db.add(TBL_san_pham, entity)
     },
     single: function(id){
        return db.load(`select * from ${TBL_san_pham} where id_sp = ${id}`);
    },
    findbyname: function (tensp){
        return db.load(`select * from ${TBL_san_pham} where ten_sp = '${tensp}'`)
    },
    update: function (entity){
        const condition = {
            id_sp : entity.id_sp
        }
        delete entity.id_sp;
        return db.update(TBL_san_pham, entity, condition)
    },
    del: function (id){
        const condition = {
            id_sp : id
        }
        return db.del(TBL_san_pham, condition)
    },
    findloaisp: function (tenloaisp){
        return db.load(`SELECT * from san_pham INNER JOIN loai_sp on san_pham.id_loai_sp = loai_sp.id_loai_sp WHERE loai_sp.ten_loai_sp = '${tenloaisp}'`)
    },
    findspkm: function (value = 0){
        return db.load(`select * from ${TBL_san_pham} where giam_gia_sp = ${value}`)
    },
    findbyid: function (idsp){
        return db.load(`select * from ${TBL_san_pham} where id_sp=${idsp}`)
    },
    findbyid_size_color: function (idsp,size,color){
        return db.load(`select * from ${TBL_san_pham} where id_sp = ${idsp} and size_sp = ${size} and mau_sp = '${color}'`)
    },
    count: async function(){
        const rows = await db.load(`select count(*) as total from ${TBL_san_pham}`);
        return rows[0].total;
    },
    countByCat: async function(id_loai_sp){
        const rows = await db.load(`select count(*) as total from ${TBL_san_pham} where id_loai_sp = ${id_loai_sp}`);
        return rows[0].total;
    }
}