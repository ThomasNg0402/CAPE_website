function closeFeedbackBar() {
    document.querySelector('.feedback-bar').style.display = 'none';
}

function submitFeedback() {
    // Add your logic to handle the submitted feedback here
    alert("Feedback submitted!");
    closeFeedbackBar();
}