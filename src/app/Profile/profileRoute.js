module.exports = function(app){
    const profile = require('./profileController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 멘토 자신의 프로필 조회 API
    app.get('/app/user_profile', profile.getSelfProfile);


};

