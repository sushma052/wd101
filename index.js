document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  const dobInput = document.getElementById('dob');
  const dobError = document.getElementById('dob-error');
  const entriesTableBody = document.querySelector('#entries-table tbody');

  // Load saved entries from localStorage
  const loadEntries = () => {
    const entries = JSON.parse(localStorage.getItem('userEntries')) || [];
    entriesTableBody.innerHTML = '';
    entries.forEach(entry => addEntryToTable(entry));
  };

  // Add a single entry to the table
  const addEntryToTable = (entry) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.acceptedTerms}</td>
    `;
    entriesTableBody.appendChild(row);
  };

  // Validate age between 18 and 55
  const isAgeValid = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age >= 18 && age <= 55;
  };

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const dob = form.dob.value;
    const acceptedTerms = form.acceptTerms.checked;

    // Validate DOB
    if (!isAgeValid(dob)) {
      dobError.textContent = 'Age must be between 18 and 55 years.';
      return;
    } else {
      dobError.textContent = '';
    }

    const entry = {
      name,
      email,
      password,
      dob,
      acceptedTerms
    };

    // Save to localStorage
    const entries = JSON.parse(localStorage.getItem('userEntries')) || [];
    entries.push(entry);
    localStorage.setItem('userEntries', JSON.stringify(entries));

    // Add entry to table
    addEntryToTable(entry);

    // Reset form
    form.reset();
  });

  // Initial load
  loadEntries();
});
