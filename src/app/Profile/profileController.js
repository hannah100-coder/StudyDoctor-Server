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

    //const userIdx = req.verifiedToken.userIdx;
    const userIdx = req.body.userIdx;

    /*if(!userIdx)
            return res.send(errResponse(baseResponse.VERIFIEDTOKEN_USERIDX_EMPTY));*/

    //mentor면 0 mentee면 1
    const mentorOrMentee = req.body.mentorOrMentee;

    const nickname = req.body.nickname;
    const gender = req.body.gender;
    const age = req.body.age;
    const field = req.body.field;
    const school = req.body.school;
    const graduate = req.body.graduate;
    //이미지를 이렇게 받아도 되는것인가?
    const image = req.body.image;
    const schedule = req.body.schedule;


    if (mentorOrMentee == 0){ //멘토인 경우
        const proField = req.body.proField;
        const major = req.body.major;
        const intro = req.body.intro;
        const teaching = req.body.teaching;
        const curriculum = req.body.curriculum;
        const insertMentorProfileParams = [userIdx, nickname, gender, age, field, proField, school, major, graduate, intro, schedule, teaching, curriculum, image];
        const updateUserProfileParams = [0, userIdx];

        logger.info(`App - client IP: ${requestIp.postClientIp(req)}} \n``);
        const mentorInsertResult = await profileService.insertMentorProfile(insertMentorProfileParams);
        const mentorOrMenteeResult = await profileService.updateUserProfile(updateUserProfileParams);
        const totalResult = mentorInsertResult + "\n" + mentorOrMenteeResult

        return res.send(response(baseResponse.SUCCESS, totalResult));
    }else if(mentorOrMentee == 1){ //멘티인 경우
        const cost = req.body.cost;
        const wish = req.body.wish;
        const personality = req.body.personality;
        const insertMenteeProfileParams = [userIdx, nickname, gender, age, field, school, graduate, schedule, cost, wish, personality, image];
        const updateUserProfileParams = [1, userIdx];

        logger.info(`App - client IP: ${requestIp.postClientIp(req)}} \n``);
        const menteeInsertResult = await profileService.insertMenteeProfile(insertMenteeProfileParams);
        const mentorOrMenteeResult = await profileService.updateUserProfile(updateUserProfileParams);
        const totalResult = menteeInsertResult + "\n" + mentorOrMenteeResult

        return res.send(response(baseResponse.SUCCESS, totalResult));
    }
}


/*
 * API 멘토/맨티 프로필 조회
 * [GET] /app/user/profile
 */

exports.getProfile = async function(req, res){

    //const userIdx = req.verifiedToken.userIdx;
    const userIdx = req.getParameter(userIdx);
    const mentorOrMentee = req.getParameter(mentorOrMentee);

    /*f(!userIdx)
            return res.send(errResponse(baseResponse.VERIFIEDTOKEN_USERIDX_EMPTY));*/

    //Token에 Mentor_MenteeIdx 필요, mentor면 0 mentee면 1, 이것도 token에 있는지 검사해야하나?
    //const isMentorOrMentee = req.verifiedToken.Mentor_MenteeIdx;

    if (MentorOrMentee == 0){ //멘토인 경우
        const mentorProfileResult = await profileProvider.retrieveMentorProfile(userIdx);

        logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n``);
        return res.send(response(baseResponse.SUCCESS, mentorProfileResult));
    }else if(MentorOrMentee == 1){ //멘티인 경우
        const menteeProfileResult = await profileProvider.retrieveMenteeProfile(userIdx);

        logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n``);
        return res.send(response(baseResponse.SUCCESS, menteeProfileResult));
    }
}


/*
 * API 멘토/맨티 프로필 수정
 * [PATCH] /app/user/profile/edit
 */

 //맨 처음 넣을 때랑 아닐 때를 판단해야 할 듯(database를 들여다 봐야할 듯) 처음엔 null을 허용 안됨
 //변경된 값에 따라 updateMentor(Mentee)ProfileParams를 배열로 설정해 줘야함
 //변경되지 않은 값은 database에서 가져와서 넣어주자


/*exports.patchProfile = async function(req, res){

    //const userIdx = req.verifiedToken.userIdx;
    const userIdx = req.body.userIdx;

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

