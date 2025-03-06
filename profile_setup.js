document.addEventListener('DOMContentLoaded', function() {
    let currentForm = 0;
    const forms = document.querySelectorAll('.form-container');
    const nextButtons = document.querySelectorAll('.next-btn');
    
    // Initially, only show the first form
    showForm(currentForm);
    
    // Add click event listener for all 'Next' buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateForm(forms[currentForm])) {
                currentForm++;
                if (currentForm < forms.length) {
                    showForm(currentForm);
                }
            }
        });
    });

    // Show the current form and hide others
    function showForm(index) {
        forms.forEach((form, i) => {
            form.classList.add('hidden'); // Hide all forms
            if (i === index) {
                form.classList.remove('hidden'); // Show the current form
            }
        });
    }
    
    
    // Age Calculation
    const dobInput = document.getElementById('dob');
    const ageDisplay = document.querySelector('.age-display');
    
    dobInput.addEventListener('change', function() {
        const dob = new Date(this.value);
        const age = calculateAge(dob);
        ageDisplay.textContent = `Age: ${age} years`;
    });

    function calculateAge(dob) {
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    }
    
    // Form validation (basic example)
    function validateForm(form) {
        const inputs = form.querySelectorAll('input, select');
        let valid = true;
        inputs.forEach(input => {
            if (input.value === '') {
                valid = false;
                alert('Please fill in all fields');
            }
        });
        return valid;
    }
});
