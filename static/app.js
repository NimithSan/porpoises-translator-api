const translateToKhmerBtn = document.getElementById("translateToKhmer");
const translateToEnglishBtn = document.getElementById("translateToEnglish");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const langToggle = document.getElementById("langToggle");

// function request to backend
function translateText(text, targetLang) {
    fetch(`/api/${targetLang}`, {
        method: "POST",
        body: new URLSearchParams({ text }),
    })
        .then(response => response.json())
        .then(data => {
            outputText.value = data.translated;
        })
        .catch(error => {
            console.error(error);
        });
}

translateToKhmerBtn.addEventListener("click", () => {
    const textToTranslate = inputText.value;
    translateText(textToTranslate, "en-kh");
});

translateToEnglishBtn.addEventListener("click", () => {
    const textToTranslate = inputText.value;
    translateText(textToTranslate, "kh-en");
});

// Event listener for language toggle switch
langToggle.addEventListener("change", () => {
    if (langToggle.checked) {
        // English to Khmer translation
        translateToKhmerBtn.disabled = true;
        translateToEnglishBtn.disabled = false;
    } else {
        // Khmer to English translation
        translateToKhmerBtn.disabled = false;
        translateToEnglishBtn.disabled = true;
    }
});