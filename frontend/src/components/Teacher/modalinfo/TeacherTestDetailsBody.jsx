let n;

const TestDetailsBody = ({ test }) => (
    <div>
        {Object.values(test.question).map((questionObj, i) => (
            <div className="p-3 m-3" key={i}>
                <p><strong>Question No. {n = i + 1}</strong> {questionObj.questionText}</p>
                <p><strong>Choices:</strong></p>
                <div className="is-flex is-justify-content-space-evenly">
                    {questionObj.choices.map((choice, j) => (
                        <span key={j}>{choice}</span>
                    ))}
                </div>
                <p><strong>Correct Answer:</strong> {questionObj.correctAnswer}</p>
                <p>----------------------------------------------------------------------------------</p>
            </div>
        ))}
    </div>
);

export default TestDetailsBody;
