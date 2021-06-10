const Keys = require('../models/key');

module.exports = {
    getLanding(req, res, next){
        res.render('index');
    },
    async getKeyManager(req, res, next) {
        const { id } = res.locals.currentUser;
        const keys = await Keys.find({ user: { _id: id } })
            .populate('user')
            .exec()
        res.render('keys/key-manager', { title: 'Manager', keys });
    },
    async postKey(req, res, next) {
        const { title, key } = req.body;
        const newKey = new Keys({ title, key })
        newKey.user = req.user._id;
        await newKey.save();
        req.flash('success', 'New key added!')
        res.redirect('/key-manager');
    },
    putKey(req, res, next) {
        res.send('Put key');
    },
    async deleteKey(req, res, next) {
        const { id } = req.params;
        await Keys.findByIdAndDelete(id)
        req.flash('success', 'Deleted key!');
        res.redirect('/key-manager');
    },
}