const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const profileDao = require("./profileDao");

//**********의미적 validation은 나중에************


//멘토 프로필 조회 API
exports.retrieveMentorSelfProfile = async function(userIndex){
    const connection = await pool.getConnection(async (conn) => conn);
    const mentorSelfProfileResult = await profileDao.selectMentorSelfProfile(connection, userIndex);

    connection.release();
    return mentorSelfProfileResult;
}


//멘티 프로필 조회 API
exports.retrieveMenteeSelfProfile = async function(userIndex){
    const connection = await pool.getConnection(async (conn) => conn);
    const menteeSelfProfileResult = await profileDao.selectMenteeSelfProfile(connection, userIndex);

    connection.release();
    return menteeSelfProfileResult;
}