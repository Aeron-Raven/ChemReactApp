let n;

const TestDetailsBody = ({ test }) => (
    <div id="test-details">
        {Object.values(test.question).map((questionObj, i) => (
            <div className="p-3 m-3" key={i}>
                <h1><strong>Question No. {n = i + 1}</strong> {questionObj.questionText}</h1>
                <p><strong>Choices:</strong></p>
                <div className="is-flex is-justify-content-space-evenly">
                    {questionObj.choices.map((choice, j) => (
                        <span key={j}>
                            <strong>{String.fromCharCode(65 + j)}. </strong>
                            {choice}
                        </span>
                    ))}
                </div>
                <p><strong>Correct Answer:</strong> {questionObj.correctAnswer}</p>
                <p>----------------------------------------------------------------------------------</p>
            </div>
        ))}
    </div>
);

export default TestDetailsBody;
