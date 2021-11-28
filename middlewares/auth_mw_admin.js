module.exports = function (req, res, next){
    const user = req.session.authUser ;
    if(!req.session.isAuthenticated || user.quyen !== 1)
    {
        return res.redirect(`/web/dangnhap`);
    }
    next()
}