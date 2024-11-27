let n;

const StudentScoreDetailsBody = ({ test, user }) => {
    // Find the module matching the test._id
    const moduleData = user.modules.find((module) => module.moduleID === test._id);

    // Ensure moduleData exists to avoid runtime errors
    if (!moduleData) {
        return <p>No data available for this module.</p>;
    }

    // Check if there are user answers
    if (moduleData.userAnswers.length === 0) {
        return <p>You have not answered this module yet!</p>;
    }
    return (
        <div id='user-score'>
            {moduleData.userAnswers.map((answerObj, i) => (
                <div className="p-3 m-3" key={i}>
                    <p><strong>Question No. {n = i + 1}</strong> {answerObj.questionText}</p>
                    <p><strong>Your Answer:</strong> {answerObj.userAnswer}</p>
                    <p><strong>Correct Answer:</strong> {answerObj.correctAnswer}</p>
                    <p>----------------------------------------------------------------------------------</p>
                </div>
            ))}
        </div>
    );
};

export default StudentScoreDetailsBody;
