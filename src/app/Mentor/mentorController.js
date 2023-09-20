const jwtMiddleware = require("../../../config/jwtMiddleware");
const mentorProvider = require("../../app/Mentor/mentorProvider");
const mentorService = require("../../app/Mentor/mentorService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {logger} = require("../../../config/winston");
const requestIp = require('request-ip');

const regexEmail = require("regex-email");



/**
 * API 모든 멘토 조회
 * [GET] /app/mentor/all
 */

exports.getMentorAll = async function (req, res) {

    const mentorAllResult = await mentorProvider.retrieveMentorAll();

    logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n`);
    return res.send(response(baseResponse.SUCCESS, mentorAllResult));
}