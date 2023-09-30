const jwtMiddleware = require("../../../config/jwtMiddleware");
const mentorProvider = require("../../app/Mentor/mentorProvider");
const mentorService = require("../../app/Mentor/mentorService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {logger} = require("../../../config/winston");
const requestIp = require('request-ip');

const regexEmail = require("regex-email");
const userProvider = require("../../app/User/userProvider");


/**
 * API 모든 멘토 조회
 * [GET] /app/mentor/all
 */

exports.getMentorAll = async function (req, res) {

    const mentorAllResult = await mentorProvider.retrieveMentorAll();

    logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n`);
    return res.send(response(baseResponse.SUCCESS, mentorAllResult));
}

/**
 * API 멘토 디테일 조회
 * [GET] /app/mentor/:userIndex
 * Path Variable: userIndex
 */

exports.getMentorDetail = async function(req, res) {

    const userIndex = req.params.userIndex;
    let mentorIndex;
    // if(!userIndex)

    const mentorOrMentee = await userProvider.retrieveMentorOrMentee(userIndex);

    if(mentorOrMentee[0] == 0){
        mentorIndex = mentorOrMentee[1];
    } else {
        // 에러
    }

    console.log('mentorIndex in mentorController: ', mentorIndex);

    const mentorEachResult = await mentorProvider.retrieveMentorDetail(mentorIndex);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n`);
    return res.send(response(baseResponse.SUCCESS, mentorEachResult));
}

/**
 * API 멘토 필터 조회
 * [GET] /app/mentor/filter
 * Body:
 */
exports.getMentorFilter = async function(req, res) {

    const filterCategory = req.body.category;   // 0수능, 1편입, 2공무원, 3어학, 4유학, 5자격증, 6대학전공, 7기타
    const filterAge = req.body.age;         // 2모두, 0만 24세 미만, 1만 24세 이상
    const filterGender = req.body.gender;   // 2모두, 남성 0, 여성 1

    // const {randomResultContent, randomResultType} = req.body; <- 이렇게 쓰는 게 더 나을듯.

    const mentorFilterResult = await mentorProvider.retrieveMentorFilter(filterCategory, filterAge, filterGender);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n`);
    return res.send(response(baseResponse.SUCCESS, mentorFilterResult));

}


/**
 * API 멘토 닉네임 검색 조회
 * [GET] /app/mentor
 * Body:
 */
exports.getMentorByNickname = async function(req, res) {
    const nickname = req.query.nickname;    // Query String

}



/**
 * API 멘토 리뷰 조회
 * [GET] /app/mentor/reviews/:mentorIndex
 */