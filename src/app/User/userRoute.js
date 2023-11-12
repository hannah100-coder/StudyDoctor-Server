module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 로그인 API
    //app.post('/auth/kakao', user.getKakaoJWT);

    app.post('/app/kakao/signin', user.signInKakao);


    //1-1. 자동 로그인 API
    app.get('/app/user/autologin', jwtMiddleware, user.autoLogin);

    // 2. 로그아웃 API
    app.get('/app/user/logout', jwtMiddleware, user.logoutUser);


};
