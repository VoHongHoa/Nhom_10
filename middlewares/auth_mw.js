module.exports = function (req, res, next){
    if(!req.session.isAuthenticated)
    {
        return res.redirect(`/web/dangnhap?retUrl=${req.originalUrl}`);
    }
    next()
}