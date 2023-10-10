module.exports = function(app){
    const profile = require('./profileController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    //post는 맨 처음 한 번만 해야함
    // mentor 프로필 입력 API
    app.post('/app/mentor/profile/userIndex/:userIndex', profile.postMentorProfile)
    app.post('/app/mentee/profile/userIndex/:userIndex', profile.postMenteeProfile)


    // user 프로필 조회 API
    app.get('/app/mentor/profile/userIndex/:userIndex', profile.getMentorProfile)
    app.get('/app/mentee/profile/userIndex/:userIndex', profile.getMenteeProfile)


    // user 프로필 편집 API
    app.patch('/app/mentor/profile/userIndex/:userIndex', profile.patchMentorProfile);
    app.patch('/app/mentee/profile/userIndex/:userIndex', profile.patchMenteeProfile);

    //user 닉네임 조회 API
    app.get('/app/mentor/profile/nickname', profile.getMentorNickname)
    app.get('/app/mentee/profile/nickname', profile.getMenteeNickname)
};