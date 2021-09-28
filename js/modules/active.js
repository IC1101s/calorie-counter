const form = document.querySelector('.counter__form');
const submitButton = document.querySelector('.form__submit-button');
const resetButton = document.querySelector('.form__reset-button');
const counterResult = document.querySelector('.counter__result');

const parameters = document.querySelectorAll('.form__parameters input');
const ageParameter = parameters[0];
const heightParameter = parameters[1];
const weightParameter = parameters[2];

const isDisabled = function () {
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
};

for (let i = 0; i < parameters.length; i++) {
	parameters[i].addEventListener('input', function () {
		isDisabled();
	});
}

const clearData = function () {
	if (!counterResult.classList.contains('counter__result--hidden')) {
		counterResult.classList.add('counter__result--hidden');
	}

	form.reset();

	resetButton.disabled = true;
	submitButton.disabled = true;

	form.scrollIntoView({block: 'start', behavior: 'smooth'});
};

resetButton.addEventListener('click', function () {
	clearData();
});