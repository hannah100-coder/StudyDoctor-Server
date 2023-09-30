
// 모든 멘토 조회 API
async function selectMentorAll(connection) {
    const selectMentorAllQuery = `
        SELECT m.mentorIndex, m.mentorNickname, m.mentorGender, m.mentorAge, m.mentorField, m.mentorImg, COUNT(c.menteeIndex) AS menteeCnt, AVG(r.stars) AS starAvg
        FROM Mentor AS m
                LEFT JOIN Matching AS c ON m.mentorIndex = c.mentorIndex
                LEFT JOIN Review As r ON m.mentorIndex = r.mentorIndex
        GROUP BY m.mentorIndex;
    `
    const [mentorAllRows] = await connection.query(selectMentorAllQuery);
    return mentorAllRows;
}

// 멘토 디테일 조회 API
async function selectMentorDetail(connection, mentorIndex) {
    const selectMentorDetailQuery = `
        SELECT mentorIndex, mentorIntro, mentorSchedule, mentorTeaching, mentorCurriculum, mentorProfField
        FROM Mentor
        WHERE mentorIndex = ?;
    `

    const mentorDetailRow = await connection.query(selectMentorDetailQuery, mentorIndex);
    return mentorDetailRow[0];
}

// 멘토 필터 조회 API
async function selectMentorFilter(connection, mentorFilterParams) {
    const selectMentorFilterQuery = `
    SELECT 
    `
}


module.exports = {
    selectMentorAll,
    selectMentorDetail,
    selectMentorFilter
};