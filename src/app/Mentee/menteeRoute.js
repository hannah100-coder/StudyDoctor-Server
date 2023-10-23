const mentor = require("../Mentor/mentorController");
module.exports = function(app){
    const mentee = require('./menteeController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 멘티 전체 조회 API
    app.get('/app/mentee/all', mentee.getMenteeAll)

};

