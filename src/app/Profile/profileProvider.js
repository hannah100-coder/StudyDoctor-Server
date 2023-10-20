const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const profileDao = require("./profileDao");

/*
 * API 멘토/맨티 프로필 조회
 */

//멘토 프로필 조회 API
exports.retrieveMentorProfile = async function(userIndex){
    const connection = await pool.getConnection(async (conn) => conn);
    const selectMentorProfileResult = await profileDao.selectMentorProfile(connection, userIndex);

    connection.release();
    return selectMentorProfileResult;
}

//멘티 프로필 조회 API
exports.retrieveMenteeProfile = async function(userIndex){
    const connection = await pool.getConnection(async (conn) => conn);
    const selectMenteeProfileResult = await profileDao.selectMenteeProfile(connection, userIndex);

    connection.release();
    return selectMenteeProfileResult;
}


/*
 * userIndex로 멘토인지 멘티인지 가져오기
 */

exports.retrieveMentorOrMentee = async function(userIndex){
    const connection = await pool.getConnection(async (conn) => conn);
    const mentorOrMenteeResult = await profileDao.selectMentorOrMentee(connection, userIndex);

    connection.release();
    return mentorOrMenteeResult;

}