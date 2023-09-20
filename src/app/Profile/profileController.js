const jwtMiddleware = require("../../../config/jwtMiddleware");
const profileProvider = require("../../app/Profile/profileProvider");
const profileService = require("../../app/Profile/profileService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {logger} = require("../../../config/winston");
const requestIp = require('request-ip');

const regexEmail = require("regex-email");



/*
 * API 멘토 자신의 프로필 조회
 * [GET] /app/user_profile
 */

exports.getMentorSelfProfile = async function(req, res){

    const userIdx = req.verifiedToken.userIdx;

    const mentorSelfProfileResult = await profileProvider.retrieveMentorSelfProfile(userIdx);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n``);
    return res.send(response(baseResponse.SUCCESS, mentorSelfProfileResult));
}