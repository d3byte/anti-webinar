init();

function init() {
    const requestInterceptor = new RequestInterceptor();
    requestInterceptor.init();

    const chatObserver = new Observer();

    chrome.tabs.query({ url: 'https://events.webinar.ru/*' }, tab => {
        console.log(tab);
        chrome.tabs.executeScript(
            tab[0].id,
            {
                code: '',
            },
            result => chatObserver.observe(result)
        )
    });
}

function RequestInterceptor() {
    this.init = () => {
        chrome
            .webRequest
            .onBeforeRequest
            .addListener(
                handleRequest,
                { urls: ['https://events.webinar.ru/api/*'] },
                ['blocking', 'requestBody'],
            );
    }

    function handleRequest(details) {
        const cancelsIsFocusedProp = Object.keys(details.requestBody || {}).includes('isFocused') && !details.requestBody.isFocused;
        const cancelsIsSoundOnProp = Object.keys(details.requestBody || {}).includes('isSoundOn') && !details.requestBody.isSoundOn;
        return { cancel: details.requestBody && (cancelsIsFocusedProp || cancelsIsSoundOnProp) };
    }
}

function Observer(config = {}) {
    const mutationConfig = {
        childList: true,
        subtree: true,
        ...config,
    };

    const observer = new MutationObserver(handleMutation);

    this.observe = element => {
        console.log(element);
        observer.observe(element)
    };

    function handleMutation(mutationsList) {
        console.log(mutationsList);
    }
}
