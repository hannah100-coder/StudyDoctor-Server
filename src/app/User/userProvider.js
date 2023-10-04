const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리


// 멘토 or 멘티 체크
exports.retrieveMentorOrMentee = async function(userIndex) {
    const connection = await pool.getConnection(async (conn) => conn);
    const mentorOrMenteeResult = await userDao.selectMentorOrMentee(connection, userIndex);
    const mentorOrMentee = mentorOrMenteeResult[0].mentorOrMentee

    let result = [mentorOrMentee];

    if(mentorOrMentee == 0) {     // Mentor
        const mentorIndexResult = await userDao.selectMentorIndex(connection, userIndex);
        result.push(mentorIndexResult[0].mentorIndex)
    }else if(mentorOrMentee == 1) {   // Mentee
        const menteeIndexResult = await userDao.selectMenteeIndex(connection, userIndex);
        result.push(menteeIndexResult[0].menteeIndex)
    }else {
         // 에러 -> result에 다른 값 push()
    }

    connection.release();
    return result;
}