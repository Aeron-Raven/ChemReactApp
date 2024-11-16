const AddQuestionsBody = ({ questions, setQuestions, choiceLabels }) => {
    // Update question text
    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].questionText = value;
        setQuestions(updatedQuestions);
    };

    // Update choices
    const handleChoiceChange = (qIndex, choiceIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].choices[choiceIndex] = value;
        setQuestions(updatedQuestions);
    };

    // Update correct answer
    const handleCorrectAnswerChange = (qIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].correctAnswer = value;
        setQuestions(updatedQuestions);
    };

    return (
        <form>
            {questions.map((q, qIndex) => (
                <div key={qIndex} className="field mb-4">
                    <label className="label">Question {qIndex + 1}</label>
                    <div className="control">
                        <input
                            type="text"
                            className="input"
                            placeholder={`Enter question ${qIndex + 1}`}
                            value={q.questionText || ''}
                            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label className="label">Choices</label>
                        <div className="control">
                            {choiceLabels.map((label, choiceIndex) => (
                                <div key={choiceIndex} className="mb-2">
                                    <span className="choice-label">{label}. </span>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder={`Choice ${label}`}
                                        value={q.choices[choiceIndex] || ''}
                                        onChange={(e) => handleChoiceChange(qIndex, choiceIndex, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Correct Answer</label>
                        <div className="control">
                            <div className="select">
                                <select
                                    value={q.correctAnswer || 'A'}
                                    onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                                >
                                    {choiceLabels.map((label, index) => (
                                        <option key={index} value={label}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </form>
    );
};

export default AddQuestionsBody;
