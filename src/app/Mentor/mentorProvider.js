const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const mentorDao = require("./mentorDao");



// 모든 멘토 조회 API
exports.retrieveMentorAll = async function() {
    const connection = await pool.getConnection(async (conn) => conn);
    const mentorAllResult = await mentorDao.selectMentorAll(connection);

    connection.release();
    return mentorAllResult;
}
