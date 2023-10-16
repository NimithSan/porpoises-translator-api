const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const langToggle = document.getElementById("langToggle");
const translateButton = document.getElementById("translateButton")

function translate(text,target_language) {
    fetch(`/api/translate`, {
        method: "POST",
        body: new URLSearchParams({ text,target_language}),
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

    translate(text,target_language)
});
