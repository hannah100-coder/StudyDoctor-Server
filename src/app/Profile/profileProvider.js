const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const profileDao = require("./profileDao");




exports.retrieveMentorSelfProfile = async function(userIndex){
    const connection = await pool.getConnection(async (conn) => conn);
    const mentorSelfProfileResult = await profileDao.selectMentorSelfProfile(connection, userIndex);

    connection.release();
    return mentorSelfProfileResult;
}