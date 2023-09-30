const jwtMiddleware = require("../../../config/jwtMiddleware");
const profileProvider = require("../../app/Profile/profileProvider");
const profileService = require("../../app/Profile/profileService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {logger} = require("../../../config/winston");
const requestIp = require('request-ip');

const regexEmail = require("regex-email");


/*
 * API 멘토/맨티 프로필 입력
 * [POST] /app/user/profile
 */

exports.postProfile = async function(req, res){

    const userIdx = req.params.userIdx;

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
        console.log(insertMentorProfileParams);

        logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);
        const mentorInsertResult = await profileService.insertMentorProfile(insertMentorProfileParams);
        const mentorOrMenteeResult = await profileService.updateUserProfile(updateUserProfileParams);
        const totalResult = [mentorInsertResult, mentorOrMenteeResult]

        return res.send(response(baseResponse.SUCCESS, totalResult));
    }else if(mentorOrMentee == 1){ //멘티인 경우
        const cost = req.body.cost;
        const wish = req.body.wish;
        const personality = req.body.personality;
        const insertMenteeProfileParams = [userIdx, nickname, gender, age, field, school, graduate, schedule, cost, wish, personality, image];
        const updateUserProfileParams = [1, userIdx];

        logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);
        const menteeInsertResult = await profileService.insertMenteeProfile(insertMenteeProfileParams);
        const mentorOrMenteeResult = await profileService.updateUserProfile(updateUserProfileParams);
        const totalResult = [menteeInsertResult, mentorOrMenteeResult];

        return res.send(response(baseResponse.SUCCESS, totalResult));
    }
}


/*
 * API 멘토/맨티 프로필 조회
 * [GET] /app/user/profile
 */

exports.getProfile = async function(req, res){

    //const userIdx = req.verifiedToken.userIdx;
    const userIdx = req.params.userIdx;
    const mentorOrMentee = await profileProvider.retrieveMentorOrMentee(userIdx);

    if (mentorOrMentee == 0){ //멘토인 경우
        const mentorProfileResult = await profileProvider.retrieveMentorProfile(userIdx);

        logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);
        return res.send(response(baseResponse.SUCCESS, mentorProfileResult));
    }else if(mentorOrMentee == 1){ //멘티인 경우
        const menteeProfileResult = await profileProvider.retrieveMenteeProfile(userIdx);

        logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);
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
 //************body로 아무값이 안 왔을 경우도 체크하자************************

exports.patchProfile = async function(req, res){

    //const userIdx = req.verifiedToken.userIdx;
    const userIdx = req.params.userIdx;

    //mentor면 0 mentee면 1
    const mentorOrMentee = await profileProvider.retrieveMentorOrMentee(userIdx);
    const { fieldToUpdate, newValue } = req.body;
    console.log(req.body.keys());


    if (mentorOrMentee == 0){ //멘토인 경우
        const updateMentorParams = [newValue, userIdx];
        console.log(updateMentorParams);
        const mentorUpdateResult = await profileService.updateMentorProfile(fieldToUpdate, updateMentorParams);


        logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);
        return res.send(response(baseResponse.SUCCESS, mentorUpdateResult));
    }else if(mentorOrMentee == 1){ //멘티인 경우
        const updateMenteeParams = [newValue, userIdx];
        const menteeUpdateResult = await profileService.updateMenteeProfile(fieldToUpdate, updateMenteeParams);

        logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);
        return res.send(response(baseResponse.SUCCESS, menteeUpdateResult));
    }
}