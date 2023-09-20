const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");

const profileProvider = require("./profileProvider");
const profileDao = require("./profileDao");

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

//**********의미적 validation은 나중에************

//멘토 프로필 입력 API
exports.insertMentorProfile = async function(insertMentorParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const mentorInsertResult = await profileDao.insertMentorProfile(connection, insertMentorParams);

    connection.release();
    return mentorInsertResult;
}


//멘티 프로필 입력 API
exports.insertMenteeProfile = async function(insertMenteeParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const menteeInsertResult = await profileDao.insertMenteeProfile(connection, insertMenteeParams);

    connection.release();
    return menteeInsertResult;
}