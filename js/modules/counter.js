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

const parameters = document.querySelectorAll('.form__parameters input');
const ageParameter = parameters[0];
const heightParameter = parameters[1];
const weightParameter = parameters[2];

const submitButton = document.querySelector('.form__submit-button');
const counterResult = document.querySelector('.counter__result');
const genderMale = document.querySelector('#gender-male');
const genderFemale = document.querySelector('#gender-female');
const activitys = document.querySelectorAll('[name="activity"]');
const caloriesNorm = document.querySelector('#calories-norm');
const caloriesMinimal = document.querySelector('#calories-minimal');
const caloriesMaximal = document.querySelector('#calories-maximal');

const countResult = function (mainFormula, caloriesFormula, isCoefficient) {
	if (isCoefficient) {
		return Math.round((mainFormula + caloriesFormula) * isCoefficient);
	}
	
	return Math.round(mainFormula * caloriesFormula);
};

const getDataOutput = function () {	
	const age = CaloriesFormulaFactor.AGE * ageParameter.value;
	const height = CaloriesFormulaFactor.HEIGHT * heightParameter.value;
	const weight = CaloriesFormulaFactor.WEIGHT * weightParameter.value;
	const mainFormula = weight + height - age;

	if (counterResult.classList.contains('counter__result--hidden')) {
		counterResult.classList.remove('counter__result--hidden');
	}

	counterResult.scrollIntoView({block: 'center', behavior: 'smooth'});

	let coefficient;
	for (let i = 0; i < activitys.length; i++) {
		if (activitys[i].checked) {
			coefficient = Coefficient[activitys[i].value.toUpperCase()];
		}
	}
	
	const caloriesNormMale = countResult(mainFormula, CaloriesFormulaConstant.MALE, coefficient);
	const caloriesNormFemale = countResult(mainFormula, CaloriesFormulaConstant.FEMALE, coefficient);
	
	if (genderMale.checked) {
		caloriesNorm.textContent = caloriesNormMale;
		caloriesMinimal.textContent = countResult(caloriesNormMale, CaloriesMinMaxRatio.MIN);
		caloriesMaximal.textContent = countResult(caloriesNormMale, CaloriesMinMaxRatio.MAX);
	} else if (genderFemale.checked) {
		caloriesNorm.textContent = caloriesNormFemale;
		caloriesMinimal.textContent = countResult(caloriesNormFemale, CaloriesMinMaxRatio.MIN);
		caloriesMaximal.textContent = countResult(caloriesNormFemale, CaloriesMinMaxRatio.MAX);
	}
};

submitButton.addEventListener('click', function (evt) {
	evt.preventDefault();

	getDataOutput();
});
