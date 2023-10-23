const jwtMiddleware = require("../../../config/jwtMiddleware");
const menteeProvider = require("../../app/Mentee/menteeProvider");
const menteeService = require("../../app/Mentee/menteeService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {logger} = require("../../../config/winston");
const requestIp = require('request-ip');

const regexEmail = require("regex-email");
const mentorProvider = require("../Mentor/mentorProvider");


/**
 * API 모든 멘토 조회
 * [GET] /app/mentee/all
 */

exports.getMenteeAll = async function (req, res) {

    const menteeAllResult = await menteeProvider.retrieveMenteeAll();

    logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n`);
    return res.send(response(baseResponse.SUCCESS, menteeAllResult));
}