module.exports = function(app){
    const profile = require('./profileController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    //post는 맨 처음 한 번만 해야함
    // user 프로필 입력 API
    app.post('/app/user/profile/userIdx/:userIdx', profile.postProfile)


    // user 프로필 조회 API
    app.get('/app/user/profile/userIdx/:userIdx', profile.getProfile)


    // user 프로필 편집 API
    app.patch('/app/user/profile/userIdx/:userIdx', profile.patchProfile);
};

