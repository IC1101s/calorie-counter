const form = document.querySelector('.counter__form');
const parameters = document.querySelectorAll('.form__parameters input');
const submitButton = document.querySelector('.form__submit-button');
const resetButton = document.querySelector('.form__reset-button');

const ageParameter = parameters[0];
const heightParameter = parameters[1];
const weightParameter = parameters[2];

for (let i = 0; i < parameters.length; i++) {
	parameters[i].addEventListener('input', function () {
		if (ageParameter.value !== '' && heightParameter.value !== '' && weightParameter.value !== '') {
			submitButton.disabled = false;
		} else {
			submitButton.disabled = true;
		}

		if (ageParameter.value !== '' || heightParameter.value !== '' || weightParameter.value !== '') {
			resetButton.disabled = false;
		} else {
			resetButton.disabled = true;
		}
	});
}


const Coefficient = {
	MIN: 1.2,
	LOW: 1.375,
	MEDIUM: 1.55,
	HIGH: 1.725,
	MAX: 1.9,
};

const CaloriesFormulaFactor = {
  AGE: 5,
  WEIGHT: 10,
  HEIGHT: 6.25,
};

const CaloriesFormulaConstant = {
	MALE: 5,
	FEMALE: 161,
};

const CaloriesMinMaxRatio = {
  MIN: 0.85,
  MAX: 1.15
};

const counterResult = document.querySelector('.counter__result');
const genderMale = document.querySelector('#gender-male');
const genderFemale = document.querySelector('#gender-female');
const activitys = document.querySelectorAll('[name="activity"]');
const caloriesNorm = document.querySelector('#calories-norm');
const caloriesMinimal = document.querySelector('#calories-minimal');
const caloriesMaximal = document.querySelector('#calories-maximal');

submitButton.addEventListener('click', function (evt) {
	evt.preventDefault();

	if (counterResult.classList.contains('counter__result--hidden')) {
		counterResult.classList.remove('counter__result--hidden');
	}

	counterResult.scrollIntoView({block: 'center', behavior: 'smooth'});

	const age = CaloriesFormulaFactor.AGE * ageParameter.value;
	const height = CaloriesFormulaFactor.HEIGHT * heightParameter.value;
	const weight = CaloriesFormulaFactor.WEIGHT * weightParameter.value;

	const mainFormula = weight + height - age;
	let coefficient;

	for (let i = 0; i < activitys.length; i++) {
		if (activitys[i].checked) {
			coefficient = Coefficient[activitys[i].value.toUpperCase()];
		}
	}
	
	const caloriesNormMale = Math.round((mainFormula + CaloriesFormulaConstant.MALE) * coefficient);
	const caloriesMinimalMale = Math.round(caloriesNormMale * CaloriesMinMaxRatio.MIN);
	const caloriesMaximalMale = Math.round(caloriesNormMale * CaloriesMinMaxRatio.MAX);

	const caloriesNormFemale = Math.round((mainFormula - CaloriesFormulaConstant.FEMALE) * coefficient);
	const caloriesMinimalFemale = Math.round(caloriesNormFemale * CaloriesMinMaxRatio.MIN);
	const caloriesMaximalFemale = Math.round(caloriesNormFemale * CaloriesMinMaxRatio.MAX);
	
	if (genderMale.checked) {
		caloriesNorm.textContent = caloriesNormMale;
		caloriesMinimal.textContent = caloriesMinimalMale;
		caloriesMaximal.textContent = caloriesMaximalMale;
	} else if (genderFemale.checked) {
		caloriesNorm.textContent = caloriesNormFemale;
		caloriesMinimal.textContent = caloriesMinimalFemale;
		caloriesMaximal.textContent = caloriesMaximalFemale;
	}
});

resetButton.addEventListener('click', function () {
	if (!counterResult.classList.contains('counter__result--hidden')) {
		counterResult.classList.add('counter__result--hidden');
	}

	form.reset();

	resetButton.disabled = true;
	submitButton.disabled = true;

	form.scrollIntoView({block: 'start', behavior: 'smooth'});
});








