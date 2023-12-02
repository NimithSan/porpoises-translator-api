const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const translateButton = document.getElementById("translateButton");

let translationTimeout;

function translateText(text, src_language, target_language) {
    fetch(`/api/translate`, {
        method: "POST",
        body: new URLSearchParams({ text, src_language, target_language }),
    })
        .then(response => response.json())
        .then(data => {
            outputText.value = data.translated_text;
        })
        .catch(error => {
            console.error(error);
        });
}

const fromLanguageSelect = document.getElementById("fromLanguageSelect");
const toLanguageSelect = document.getElementById("toLanguageSelect");

// Event listener for the "Translate" button
translateButton.addEventListener("click", () => {
    const text = inputText.value;
    const target_language = toLanguageSelect.value;
    const src_language = fromLanguageSelect.value;
    translateText(text, src_language, target_language);
});

// Event listener for input text changes
inputText.addEventListener("input", () => {
    const text = inputText.value;
    const target_language = toLanguageSelect.value;
    const src_language = fromLanguageSelect.value;

    // Clear previous timeout to avoid unnecessary requests
    clearTimeout(translationTimeout);

    // Set a new timeout for 2 seconds
    translationTimeout = setTimeout(() => {
        translateText(text, src_language, target_language);
    }, 400);
});

// Event listener for swap button
const swapButton = document.getElementById("swapButton");
swapButton.addEventListener("click", () => {
    // Swap input and output text content
    const tempText = inputText.value;
    inputText.value = outputText.value;
    outputText.value = tempText;

    // Swap selected languages in language dropdowns
    const fromLanguage = fromLanguageSelect.value;
    fromLanguageSelect.value = toLanguageSelect.value;
    toLanguageSelect.value = fromLanguage;

    // Trigger translation after swapping
    handleTranslation();
});