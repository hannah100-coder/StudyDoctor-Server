const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const menteeDao = require("./menteeDao");
const mentorDao = require("../Mentor/mentorDao");


// 모든 멘티 조회 API
exports.retrieveMenteeAll = async function() {
    const connection = await pool.getConnection(async (conn) => conn);
    const menteeAllResult = await menteeDao.selectMenteeAll(connection);

    connection.release();
    return menteeAllResult;
}