const user = require("../User/userController");
module.exports = function(app){
    const mentor = require('./mentorController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 멘토 전체 조회 API
    app.get('/app/mentors/all', mentor.getMentorAll)

    // 멘토 디테일 조회 API
    app.get('/app/mentor/detail/:userIndex', mentor.getMentorDetail)

    // 멘토 필터링 조회 API
    app.get('/app/mentors/filter', mentor.getMentorFilter)

    // 멘토 닉네임 검색 조회 API
    app.get('/app/mentor', mentor.getMentorByNickname)
};

