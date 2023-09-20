const jwtMiddleware = require("../../../config/jwtMiddleware");
const profileProvider = require("../../app/Profile/profileProvider");
const profileService = require("../../app/Profile/profileService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {logger} = require("../../../config/winston");
const requestIp = require('request-ip');

const regexEmail = require("regex-email");

//**********형식적 validation은 나중에************

/*
 * API 멘토/맨티 프로필 입력
 * [POST] /app/user/profile
 */

exports.postProfile = async function(req, res){

    const userIdx = req.verifiedToken.userIdx;

    if(!userIdx)
            return res.send(errResponse(baseResponse.VERIFIEDTOKEN_USERIDX_EMPTY));

    //Token에 Mentor_MenteeIdx 필요, mentor면 1 mentee면 0
    const isMentorOrMentee = req.verifiedToken.Mentor_MenteeIdx;

    const nickname = req.body.nickname;
    const gender = req.body.gender;
    const age = req.body.age;
    const field = req.body.field;
    const school = req.body.school;
    const graduate = req.body.graduate;
    //이미지를 이렇게 받아도 되는것인가?
    const image = req.body.image;
    const schedule = req.body.proField;


    if (isMentorOrMentee == 1){ //멘토인 경우
        const proField = req.body.proField;
        const major = req.body.major;
        const intro = req.body.intro;
        const teaching = req.body.teaching;
        const curriculum = req.body.curriculum;
        const insertMentorParams = [userIdx, nickname, gender, age, field, proField, school, major, graduate, intro, schedule, teaching, curriculum, image];

        logger.info(`App - client IP: ${requestIp.postClientIp(req)}} \n``);
        const mentorInsertResult = await profileService.insertMentorProfile(insertMentorParams);

        return res.send(response(baseResponse.SUCCESS, mentorInsertResult));
    }else if{ //멘티인 경우
        const cost = req.body.cost;
        const wish = req.body.wish;
        const personality = req.body.personality;
        const insertMenteeParams = [userIdx, nickname, gender, age, field, school, graduate, schedule, cost, wish, personality, image];

        logger.info(`App - client IP: ${requestIp.postClientIp(req)}} \n``);
        const menteeInsertResult = await profileService.insertMenteeProfile(insertMenteeParams);

        return res.send(response(baseResponse.SUCCESS, menteeInsertResult));
    }
}


/*
 * API 멘토/맨티 자신의 프로필 조회
 * [GET] /app/user/profile
 */

exports.getSelfProfile = async function(req, res){

    const userIdx = req.verifiedToken.userIdx;

    if(!userIdx)
            return res.send(errResponse(baseResponse.VERIFIEDTOKEN_USERIDX_EMPTY));

    //Token에 Mentor_MenteeIdx 필요, mentor면 1 mentee면 0, 이것도 token에 있는지 검사해야하나?
    const isMentorOrMentee = req.verifiedToken.Mentor_MenteeIdx;

    if (isMentorOrMentee == 1){ //멘토인 경우
        const mentorSelfProfileResult = await profileProvider.retrieveMentorSelfProfile(userIdx);

        logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n``);
        return res.send(response(baseResponse.SUCCESS, mentorSelfProfileResult));
    }else if{ //멘티인 경우
        const menteeSelfProfileResult = await profileProvider.retrieveMenteeSelfProfile(userIdx);

        logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n``);
        return res.send(response(baseResponse.SUCCESS, menteeSelfProfileResult));
    }
}


/*
 * API 멘토/맨티 프로필 수정
 * [PATCH] /app/user/profile/edit
 */

/*exports.patchProfile = async function(req, res){

    const userIdx = req.verifiedToken.userIdx;

    if(!userIdx)
            return res.send(errResponse(baseResponse.VERIFIEDTOKEN_USERIDX_EMPTY));

    //Token에 Mentor_MenteeIdx 필요, mentor면 1 mentee면 0
    const isMentorOrMentee = req.verifiedToken.Mentor_MenteeIdx;

    const nickname = req.body.nickname;
    const gender = req.body.gender;
    const age = req.body.age;
    const field = req.body.field;
    const school = req.body.school;
    const graduate = req.body.graduate;
    //이미지를 이렇게 받아도 되는것인가?
    const image = req.body.image;
    const schedule = req.body.proField;


    if (isMentorOrMentee == 1){ //멘토인 경우
        const proField = req.body.proField;
        const major = req.body.major;
        const intro = req.body.intro;
        const teaching = req.body.teaching;
        const curriculum = req.body.curriculum;
        const insertMentorParams = [userIdx, nickname, gender, age, field, proField, school, major, graduate, intro, schedule, teaching, curriculum, image];

        const mentorInsertResult = await profileService.insertMentorProfile(insertMentorParams);

        logger.info(`App - client IP: ${requestIp.patchClientIp(req)}} \n``);
        return res.send(response(baseResponse.SUCCESS, mentorInsertResult));
    }else if{ //멘티인 경우
        const cost = req.body.cost;
        const wish = req.body.wish;
        const personality = req.body.personality;
        const insertMenteeParams = [userIdx, nickname, gender, age, field, school, graduate, schedule, cost, wish, personality, image];

        const menteeInsertResult = await profileService.insertMenteeProfile(insertMenteeParams);

        logger.info(`App - client IP: ${requestIp.patchClientIp(req)}} \n``);
        return res.send(response(baseResponse.SUCCESS, menteeInsertResult));
    }
}*/

