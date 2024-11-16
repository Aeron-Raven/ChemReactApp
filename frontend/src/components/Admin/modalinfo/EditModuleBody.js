const EditQuestionsBody = ({ questions, setQuestions, choiceLabels, moduleName, setModuleName, moduleNumber, setModuleNumber }) => {

    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = value;
        setQuestions(updatedQuestions);
    };

    const handleChoiceChange = (qIndex, choiceIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].choices[choiceIndex] = value;
        setQuestions(updatedQuestions);
    };

    return (
        <form>
            <div className="field has-addons">
                <p className="control">
                    <span className="button is-static">Module Title: </span>
                </p>
                <div className="control">
                    <input className={moduleName === '' ? "input is-danger" : "input"} type="text" placeholder="Title"
                        value={moduleName} onChange={(e) => setModuleName(e.target.value)} />
                </div>
            </div>
            <div className="field">
                <label className="label">Module number:</label>
                <div className="control">
                    <input className={moduleNumber > 10 && moduleNumber ? "input is-danger" : "input"} type="number" min="1" max="50" placeholder="Module number (Max: 10)"
                        value={moduleNumber} onChange={(e) => setModuleNumber(e.target.value)} />
                </div>
            </div>
            {questions.map((q, qIndex) => (
                <div key={qIndex} className="field">
                    <label className="label">Question {qIndex + 1}</label>
                    <div className="control">
                        <input
                            type="text"
                            className="input"
                            placeholder={`Enter question ${qIndex + 1}`}
                            value={q.question}
                            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label className="label">Choices</label>
                        <div className="control">
                            {q.choices.map((choice, choiceIndex) => (
                                <div key={choiceIndex} className="mb-2">
                                    <span className="choice-label">{choiceLabels[choiceIndex]}. </span>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder={`Choice ${choiceLabels[choiceIndex]}`}
                                        value={choice}
                                        onChange={(e) => handleChoiceChange(qIndex, choiceIndex, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </form>
    );
};

export default EditQuestionsBody;
