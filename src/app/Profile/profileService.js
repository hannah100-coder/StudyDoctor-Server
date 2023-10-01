const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");

const profileProvider = require("./profileProvider");
const profileDao = require("./profileDao");

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");


/*
 * API 멘토/맨티 프로필 입력
 */

//멘토 프로필 입력 API
exports.insertMentorProfile = async function(insertMentorProfileParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const mentorInsertResult = await profileDao.insertMentorProfile(connection, insertMentorProfileParams);

    connection.release();
    return mentorInsertResult;
}

//멘티 프로필 입력 API
exports.insertMenteeProfile = async function(insertMenteeProfileParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const menteeInsertResult = await profileDao.insertMenteeProfile(connection, insertMenteeProfileParams);

    connection.release();
    return menteeInsertResult;
}


/*
 * API 멘토/맨티 유저 테이블에 입력
 */

 exports.updateUserProfile = async function(updateUserProfileParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userProfileUpdateResult = await profileDao.updateUserProfile(connection, updateUserProfileParams);

    connection.release();
    return userProfileUpdateResult;
 }


 /*
  * API 멘토/맨티 프로필 수정
  */

 //멘토 프로필 수정 API
 exports.updateMentorProfile = async function(updateMentorProfileParams, userIdx) {
     const connection = await pool.getConnection(async (conn) => conn);
     const mentorUpdateResult = await profileDao.updateMentorProfile(connection, updateMentorProfileParams, userIdx);

     connection.release();
     return mentorUpdateResult;
 }

 //멘티 프로필 수정 API
 exports.updateMenteeProfile = async function(updateMenteeProfileParams, userIdx) {
     const connection = await pool.getConnection(async (conn) => conn);
     const menteeUpdateResult = await profileDao.updateMenteeProfile(connection, updateMenteeProfileParams, userIdx);

     connection.release();
     return menteeUpdateResult;
 }