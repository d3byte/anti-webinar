const INTERVAL = 1000;
const CLEAR_INPUT_INTERVAL = 300;


window.addEventListener('DOMContentLoaded', updateInvolvementStatus);

function updateInvolvementStatus(dom) {
    setTimeout(() => {
        initVideo();
        initInterval(dom);
        initBlurHandler();
    }, 5000);
}

function initBlurHandler() {
    // fetch()
}

function initInterval() {
    const input = new EditableInput(dom);
    console.log(input);
    setInterval(() => handleInterval(input), INTERVAL);
}

function initVideo() {
    const playBtn = document.querySelector('.autoplay-video-allow-btn');
    if (playBtn) {
        playBtn.click();
    }
}

function handleInterval(input) {
    input.setValue('Ay, that`s a pretty interesting hypothesis');
    setTimeout(() => {
        input.submitValue();
        input.setValue('');
    }, CLEAR_INPUT_INTERVAL);
}

/**
 * @return {
 * contentEditable: true
 * dangerouslySetInnerHTML: {__html: undefined}
 * data-placeholder: "string"
 * onBlur: ƒ ()
 * onClick: ƒ (e)
 * onInput: ƒ ()
 * onKeyDown: ƒ (e)
 * onKeyUp: ƒ (e)
 * onPaste: ƒ (e)
 * style: {}
 * }
 */
function getReactEventListeners(element) {
    const key = Object.keys(element).find(key => key.indexOf('____reactEventHandlers') !== -1);
    return element[key];
}

function EditableInput(dom) {
    this.input = dom.querySelector('.editable-input > div');
    this.setValue = value => {
        // getReactEventListeners(value).onInput();
        requestAnimationFrame(() => this.input.textContent = value);
    };
    // this.focusScreen = () => window.focus();
    this.submitValue = () => {
        const event = new KeyboardEvent(
            "keydown",
            { bubbles : true, cancelable : true, key : "Enter", char : "Enter", shiftKey : true }
        );
        this.input.dispatchEvent(event);
    }
}
