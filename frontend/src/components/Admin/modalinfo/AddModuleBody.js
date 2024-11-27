const AddModuleBody = ({ error, setError, moduleName, setModuleName, moduleOver, setModuleOver, moduleNumber, setModuleNumber }) => (
    <form>
        <div className="field has-addons">
            <p className="control">
                <span className="button is-static">Lesson Title: </span>
            </p>
            <div className="control">
                <input className={moduleName === '' ? "input is-danger" : "input"} type="text" placeholder="Title"
                    value={moduleName} onChange={(e) => setModuleName(e.target.value)} />
            </div>
        </div>
        <div className="field">
            <label className="label">Lesson number:</label>
            <div className="control">
                <input className={moduleNumber > 10 && moduleNumber? "input is-danger" : "input"} type="number" min="1" max="50" placeholder="(Max: 10)"
                    value={moduleNumber} onChange={(e) => setModuleNumber(e.target.value)} />
            </div>
        </div>
        <div className="field">
            <label className="label">Number of Questions</label>
            <div className="control">
                <input className={moduleOver > 50 && moduleOver? "input is-danger" : "input"} type="number" min="1" max="50" placeholder="(Max: 50)"
                    value={moduleOver} onChange={(e) => setModuleOver(e.target.value)} />
            </div>
        </div>
        {error && <div className="error">{error}</div>}

    </form>
);

export default AddModuleBody;
