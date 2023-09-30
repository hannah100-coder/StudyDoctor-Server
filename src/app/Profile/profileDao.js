
/*
 * API 멘토/맨티 프로필 입력
 */

//멘토 프로필 입력 API
async function insertMentorProfile(connection, insertMentorProfileParams) {
    const insertMentorProfileQuery = `
    INSERT INTO Mentor VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, null, null, null);
    `;

    const insertMentorProfileRow = await connection.query(insertMentorProfileQuery, insertMentorProfileParams);
    return insertMentorProfileRow;
}

//멘티 프로필 입력 API
async function insertMenteeProfile(connection, insertMenteeProfileParams) {
    const insertMenteeProfileQuery = `
    INSERT INTO Mentor VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, null, null, null);
    `;

    const insertMenteeProfileRow = await connection.query(insertMenteeProfileQuery, insertMenteeProfileParams);
    return insertMenteeProfileRow;
}


/*
 * API 멘토/맨티 유저 테이블에 입력
 */

async function updateUserProfile(connection, updateUserProfileParams) {
    const updateUserProfileQuery = `
    UPDATE User
    SET mentorOrMentee = ?
    WHERE userIndex = ?;
    `;

    const updateUserProfileRow = await connection.query(updateMentorProfileQuery, updateUserProfileParams);
    return updateUserProfileRow;
}


/*
 * API 멘토/맨티 프로필 조회
 */

//멘토 프로필 조회 API
async function selectMentorProfile(connection, userIndex){
    const selectMentorProfileQuery = `
    //앞에 userIndex랑 뒤에 status, createdAt, updatedAt을 가져와도 되는지?, status가 active인 것만 가져와야하는지?
    SELECT * FROM Mentor Where userIndex = ?;
    `;

    const mentorProfileRow = await connection.query(selectMentorProfileQuery, userIndex);
    return mentorProfileRow;
}

//멘티 프로필 조회 API
async function selectMenteeProfile(connection, userIndex){
    const selectMenteeProfileQuery = `
    //앞에 userIndex랑 뒤에 status, createdAt, updatedAt을 가져와도 되는지?, status가 active인 것만 가져와야하는지?
    SELECT * FROM Mentee Where userIndex = ?;
    `;

    const menteeProfileRow = await connection.query(selectMenteeProfileQuery, userIndex);
    return menteeProfileRow;
}



/*
 * API 멘토/맨티 프로필 수정
 */

//멘토 프로필 수정 API
async function updateMentorProfile(connection, updateMentorProfileParams){
    const updateMentorProfileQuery = `
    UPDATE Mentor
    SET mentorNickname = ?, mentorGender = ?, mentorAge = ?, mentorField = ?, mentorProField = ?, mentorSchool = ?, mentorMajor = ?, mentorGraduate = ?, mentorIntro = ?, mentorSchedule = ?, mentorTeaching = ?, mentorCurriculum = ?, mentorImg = ?
    WHERE mentorIndex = ?;
    `;

    const updateMentorProfileRow = await connection.query(updateMentorProfileQuery, updateMentorProfileParams);
    return updateMentorProfileRow;
}

//멘티 프로필 수정 API
async function updateMenteeProfile(connection, updateMenteeProfileParams){
    const updateMenteeProfileQuery = `
    UPDATE Mentee
    SET menteeNickname = ?, menteeGender = ?, menteeAge = ?, menteeField = ?, menteeSchool = ?, menteeGraduate = ?, menteeSchedule = ?, menteeCost = ?, menteeWish = ?, menteePersonality = ?, menteeImg = ?
    WHERE menteeIndex = ?;
    `;

    const updateMenteeProfileRow = await connection.query(updateMenteeProfileQuery, updateMenteeProfileParams);
    return updateMenteeProfileRow;
}



module.exports = {
    insertMentorProfile,
    insertMenteeProfile,
    selectMentorProfile,
    selectMenteeProfile,
    updateUserProfile

};