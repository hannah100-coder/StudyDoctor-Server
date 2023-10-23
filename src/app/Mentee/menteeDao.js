// 모든 멘토 조회 API
async function selectMenteeAll(connection) {
    const selectMenteeAllQuery = `
        SELECT menteeIndex, menteeNickname, menteeGender, menteeAge, menteeField, menteeImg, menteeSchool
        FROM Mentee;
    `
    const [menteeAllRows] = await connection.query(selectMenteeAllQuery);
    return menteeAllRows;
}

module.exports = {
    selectMenteeAll,
};