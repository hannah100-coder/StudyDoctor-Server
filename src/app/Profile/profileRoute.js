module.exports = function(app){
    const profile = require('./profileController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // user 프로필 입력 API
    app.post('/app/user/profile', profile.postProfile);
    app.post('/app/user/profile?userIdx=4&mentorOrMentee=0', profile.postProfile);

    // user 프로필 조회 API
    app.get('/app/user/profile', profile.getProfile);

    // user 프로필 편집 API
    app.patch('/app/user/profile/edit', profile.patchProfile);

};

