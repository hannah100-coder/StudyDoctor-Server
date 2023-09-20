const jwtMiddleware = require("../../../config/jwtMiddleware");
const profileProvider = require("../../app/Profile/profileProvider");
const profileService = require("../../app/Profile/profileService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {logger} = require("../../../config/winston");
const requestIp = require('request-ip');

const regexEmail = require("regex-email");



/*
 * API 멘토/맨티 자신의 프로필 조회
 * [GET] /app/user_profile
 */

exports.getSelfProfile = async function(req, res){

    const userIdx = req.verifiedToken.userIdx;
    //Token에 Mentor_MenteeIdx 필요, mentor면 1 mentee면 0
    const isMentorOrMentee = req.verifiedToken.Mentor_MenteeIdx;

    if (isMentorOrMentee == 1){ //멘티인 경우
        const mentorSelfProfileResult = await profileProvider.retrieveMentorSelfProfile(userIdx);

        logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n``);
        return res.send(response(baseResponse.SUCCESS, mentorSelfProfileResult));
    }else if{ //멘티인 경우
        const menteeSelfProfileResult = await profileProvider.retrieveMenteeSelfProfile(userIdx);

        logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n``);
        return res.send(response(baseResponse.SUCCESS, menteeSelfProfileResult));
    }
}