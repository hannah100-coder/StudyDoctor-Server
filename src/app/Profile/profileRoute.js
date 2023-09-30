const user = require("../User/userController");
module.exports = function(app){
    const profile = require('./profileController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // user 프로필 입력 API
    app.post('/app/user/profile', profile.postProfile)

    // user 프로필 조회 API
    app.get('/app/user/profile', profile.getProfile)

    // user 프로필 편집 API
    //app.patch('/app/user/profile/edit', profile.patchProfile);

};

