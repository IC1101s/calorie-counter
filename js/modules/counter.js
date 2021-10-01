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

const genderMale = document.querySelector('#gender-male');
const genderFemale = document.querySelector('#gender-female');
const activitys = document.querySelectorAll('[name="activity"]');
const submitButton = document.querySelector('.form__submit-button');
const counterResult = document.querySelector('.counter__result');
const resultItems = counterResult.querySelectorAll('.counter__result-item span')

const getDataOutput = function () {	
	const age = CaloriesFormulaFactor.AGE * ageParameter.value;
	const height = CaloriesFormulaFactor.HEIGHT * heightParameter.value;
	const weight = CaloriesFormulaFactor.WEIGHT * weightParameter.value;

	const mainFormula = weight + height - age;

	const getCountResult = function (index, caloriesNormResult) {
		if (index === 1) {
			return Math.round(caloriesNormResult * CaloriesMinMaxRatio.MIN);
		} else if (index === 2) {
			return Math.round(caloriesNormResult * CaloriesMinMaxRatio.MAX);
		}

		return caloriesNormResult;
	};

	const getResultContent = function (element, result) { 
		return element.textContent = result;
	};

	let coefficient;
	for (let i = 0; i < activitys.length; i++) {
		if (activitys[i].checked) {
			coefficient = Coefficient[activitys[i].value.toUpperCase()];
		}
	}

	for (let i = 0; i < resultItems.length; i++) {
		if (genderMale.checked) {	
			getResultContent(
				resultItems[i], 
				getCountResult(i, Math.round((mainFormula + CaloriesFormulaConstant.MALE) * coefficient))
			);
		} else {
			getResultContent(
				resultItems[i], 
				getCountResult(i, Math.round((mainFormula + CaloriesFormulaConstant.FEMALE) * coefficient))
			);
		}	
	}

	if (counterResult.classList.contains('counter__result--hidden')) {
		counterResult.classList.remove('counter__result--hidden');
	}

	counterResult.scrollIntoView({block: 'center', behavior: 'smooth'});
};

submitButton.addEventListener('click', function (evt) {
	evt.preventDefault();

	getDataOutput();
});
