const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const profileDao = require("./profileDao");

//**********의미적 validation은 나중에************



/*
 * API 멘토/맨티 프로필 조회
 */

//멘토 프로필 조회 API
exports.retrieveMentorProfile = async function(userIndex){
    const connection = await pool.getConnection(async (conn) => conn);
    const mentorProfileResult = await profileDao.selectMentorProfile(connection, userIndex);

    connection.release();
    return mentorProfileResult;
}

//멘티 프로필 조회 API
exports.retrieveMenteeProfile = async function(userIndex){
    const connection = await pool.getConnection(async (conn) => conn);
    const menteeProfileResult = await profileDao.selectMenteeProfile(connection, userIndex);

    connection.release();
    return menteeProfileResult;
}