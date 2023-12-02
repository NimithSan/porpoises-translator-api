const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

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

// Event listener for input text changes and language selection changes
function handleTranslation() {
    const text = inputText.value.trim(); // Trim leading and trailing whitespaces
    const target_language = toLanguageSelect.value;
    const src_language = fromLanguageSelect.value;

    // Set the output text to empty if the input text is empty
    outputText.value = text === "" ? "" : outputText.value;

    // Clear previous timeout to avoid unnecessary requests
    clearTimeout(translationTimeout);

    // Set a new timeout for 300 milliseconds (adjust as needed)
    translationTimeout = setTimeout(() => {
        if(inputText.value != "") {
            translateText(text, src_language, target_language);
        }
    }, 300);
}

// Event listeners for input text changes
inputText.addEventListener("input", handleTranslation);

// Event listeners for language selection changes
fromLanguageSelect.addEventListener("change", handleTranslation);
toLanguageSelect.addEventListener("change", handleTranslation);

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

