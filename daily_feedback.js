document.addEventListener('DOMContentLoaded', () => {
    // Optional: Load existing feedback if needed
    loadPreviousFeedback();
});

document.getElementById('feedbackForm').addEventListener('submit', function (event) {
    event.preventDefault();
    submitFeedback();
});

function loadPreviousFeedback() {
    // Replace with the URL of your API endpoint for loading previous feedback
    const apiUrl = 'https://api.example.com/user/feedback'; 

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken') // Example: using token for authentication
        }
    })
    .then(response => response.json())
    .then(data => {
        // Populate the form with previously submitted data if available
        if (data) {
            document.getElementById('food').value = data.food || '';
            document.getElementById('exercise').value = data.exercise || '';
        }
    })
    .catch(error => {
        console.error('Error loading previous feedback:', error);
        // Optionally show an error message to the user
    });
}

function submitFeedback() {
    const feedbackData = {
        food: document.getElementById('food').value,
        exercise: document.getElementById('exercise').value
    };

    // Replace with the URL of your API endpoint for submitting feedback
    const apiUrl = 'https://api.example.com/user/feedback'; 

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken') // Example: using token for authentication
        },
        body: JSON.stringify(feedbackData)
    })
    .then(response => response.json())
    .then(data => {
        // Handle successful submission, e.g., show a success message
        alert('Feedback submitted successfully!');
        // Optionally reset the form
        document.getElementById('feedbackForm').reset();
    })
    .catch(error => {
        console.error('Error submitting feedback:', error);
        // Optionally show an error message to the user
        alert('Failed to submit feedback. Please try again.');
    });
}
