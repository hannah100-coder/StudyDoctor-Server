// 모든 멘토 조회 API
async function selectMenteeAll(connection) {
    const selectMenteeAllQuery = `
        SELECT menteeIndex, menteeNickname, menteeGender, menteeAge, menteeField, menteeImg, menteeSchool
        FROM Mentee;
    `
    const [menteeAllRows] = await connection.query(selectMenteeAllQuery);
    return menteeAllRows;
}

// 멘티 상세 조회 API
async function selectMenteeDetail(connection, menteeIndex) {
    const selectMentorDetailQuery = `
        SELECT menteeIndex, menteeSchedule, menteeWish, menteeCost, menteePersonality
        FROM Mentee
        WHERE menteeIndex = ?;
    `

    const menteeDetailRow = await connection.query(selectMentorDetailQuery, menteeIndex);
    return menteeDetailRow[0];
}

// 멘티 닉네임 검색 조회 API - nickname 가진 menteeIndex list 조회
async function selectMenteeListByNickname(connection, nickname) {
    const selectMenteeListByNicknameQuery = `
        SELECT menteeIndex 
        FROM Mentee 
        WHERE menteeNickname like concat('%', ?, '%');
    `

    const [menteeListByNicknameRows] = await connection.query(selectMenteeListByNicknameQuery, nickname);
    return menteeListByNicknameRows;
}

// 멘티 닉네임 검색 조회 API - menteeIndex로 해당 멘티 정보 조회
async function selectMenteeByMenteeIndex(connection, menteeIndex) {
    const selectMenteeByMenteeIndexQuery = `
        SELECT menteeIndex, menteeNickname, menteeGender, menteeAge, menteeField, menteeImg, menteeSchool
        FROM Mentee
        WHERE menteeIndex = ?;
    `

    const [menteeByMenteeIndexRow] = await connection.query(selectMenteeByMenteeIndexQuery, menteeIndex);
    return menteeByMenteeIndexRow[0];
}

module.exports = {
    selectMenteeAll,
    selectMenteeDetail,
    selectMenteeListByNickname,
    selectMenteeByMenteeIndex,
};