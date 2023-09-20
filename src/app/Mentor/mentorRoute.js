const user = require("../User/userController");
module.exports = function(app){
    const mentor = require('./mentorController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 멘토 전체 조회 API
    app.get('/app/mentor/all', mentor.getMentorAll)

};

