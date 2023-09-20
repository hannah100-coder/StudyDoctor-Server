module.exports = function(app){
    const profile = require('./profileController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // user 프로필 입력 API
    app.post('/app/user/profile', jwtMiddleware, profile.postProfile);

    // user 자신의 프로필 조회 API
    app.get('/app/user/profile', jwtMiddleware, profile.getSelfProfile);

    // user 프로필 편집 API
    app.patch('/app/user/profile/edit', jwtMiddleware, profile.patchProfile);

};

