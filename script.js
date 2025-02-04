const form = document.getElementById('wine-form');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fixedAcidity = parseFloat(document.getElementById('fixed_acidity').value);
    const volatileAcidity = parseFloat(document.getElementById('volatile_acidity').value);
    const citricAcid = parseFloat(document.getElementById('citric_acid').value);
    const residualSugar = parseFloat(document.getElementById('residual_sugar').value);
    const chlorides = parseFloat(document.getElementById('chlorides').value);
    const freeSulfurDioxide = parseFloat(document.getElementById('free_sulfur_dioxide').value);
    const totalSulfurDioxide = parseFloat(document.getElementById('total_sulf ur_dioxide').value);
    const density = parseFloat(document.getElementById('density').value);
    const pH = parseFloat(document.getElementById('pH').value);
    const sulphates = parseFloat(document.getElementById('sulphates').value);
    const alcohol = parseFloat(document.getElementById('alcohol').value);

    const inputData = {
        fixed_acidity: fixedAcidity,
        volatile_acidity: volatileAcidity,
        citric_acid: citricAcid,
        residual_sugar: residualSugar,
        chlorides: chlorides,
        free_sulfur_dioxide: freeSulfurDioxide,
        total_sulfur_dioxide: totalSulfurDioxide,
        density: density,
        pH: pH,
        sulphates: sulphates,
        alcohol: alcohol
    };

    fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
    })
    .then(response => response.json())
    .then(data => {
        resultDiv.classList.add('animate');
        resultDiv.innerText = data.prediction === 1 ? 'The predicted quality is good' : 'The predicted quality is bad';
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerText = 'An error occurred while predicting the quality.';
    });
});