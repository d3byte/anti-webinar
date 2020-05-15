init();

function init() {
    const requestInterceptor = new RequestInterceptor();
    requestInterceptor.init();

    const chatObserver = new Observer();

    // chrome.tabs.query({ url: 'https://events.webinar.ru/*' }, tab => {
    //     console.log(tab);
    //     chrome.tabs.executeScript(
    //         tab[0].id,
    //         {
    //             code: '',
    //         },
    //         result => chatObserver.observe(result)
    //     )
    // });
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
        const requestBody = ((details.requestBody || {}).formData || {});
        const cancelsIsFocusedProp = Object.keys(requestBody).includes('isFocused') && requestBody.isFocused[0] === 'false';
        const cancelsIsSoundOnProp = Object.keys(requestBody).includes('isSoundEnabled') && requestBody.isSoundEnabled[0] === 'false';
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
