function sendMail(event) {
  event.preventDefault(); // Prevent the default form submission
  
  // Validate form fields
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  
  if (!name || !email || !subject || !message) {
    alert('Please fill in all fields');
    return;
  }
  
  // Show loading message
  const loading = document.querySelector('.loading');
  const errorMessage = document.querySelector('.error-message');
  const sentMessage = document.querySelector('.sent-message');
  
  loading.style.display = 'block';
  errorMessage.style.display = 'none';
  sentMessage.style.display = 'none';
  
  let params = {
    name: name,
    email: email,
    subject: subject,
    message: message,
    // Also try alternative variable names that might be expected
    user_name: name,
    user_email: email,
    user_subject: subject,
    user_message: message,
    from_name: name,
    from_email: email,
    reply_to: email
  }

  console.log('Sending email with params:', params);
  console.log('EmailJS service ID:', 'service_gt53xzu');
  console.log('EmailJS template ID:', 'template_r5ddasc');

  emailjs.send('service_gt53xzu', 'template_r5ddasc', params)
    .then(function(response) {
      console.log('Email sent successfully:', response);
      // Hide loading, show success message
      loading.style.display = 'none';
      sentMessage.style.display = 'block';
      
      // Reset the form
      document.getElementById('contact-form').reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        sentMessage.style.display = 'none';
      }, 5000);
    })
    .catch(function(error) {
      console.error('EmailJS error:', error);
      // Hide loading, show error message
      loading.style.display = 'none';
      errorMessage.style.display = 'block';
      errorMessage.textContent = 'There was an error sending your message. Please try again. Error: ' + error.text;
      
      // Hide error message after 5 seconds
      setTimeout(() => {
        errorMessage.style.display = 'none';
      }, 5000);
    });
}

// Debug button text and icon toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const debugButton = document.querySelector('.btn-debug');
  const collapsibleSection = document.getElementById('collapsable-aboutme');
  
  if (debugButton && collapsibleSection) {
    // Listen for Bootstrap collapse events
    collapsibleSection.addEventListener('shown.bs.collapse', function() {
      const icon = debugButton.querySelector('i');
      const text = debugButton.childNodes[debugButton.childNodes.length - 1];
      
      // Change icon to up arrow
      icon.className = 'bi bi-arrow-up-circle-fill me-2';
      
      // Change text to "Hide Bugs 🙈"
      text.textContent = ' Hide Bugs';
    });
    
    collapsibleSection.addEventListener('hidden.bs.collapse', function() {
      const icon = debugButton.querySelector('i');
      const text = debugButton.childNodes[debugButton.childNodes.length - 1];
      
      // Change icon back to down arrow
      icon.className = 'bi bi-arrow-down-circle-fill me-2';
      
      // Change text back to "Debug Me"
      text.textContent = ' Debug Me';
    });
  }
});