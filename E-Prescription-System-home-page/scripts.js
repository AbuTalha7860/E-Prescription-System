document.addEventListener('DOMContentLoaded', () => {
    const patients = [
        { id: 1, patientid: '123', name: 'John Doe', age: 30, medical_history: 'Hypertension', prescriptions: [] },
        { id: 2, patientid: '124', name: 'Jane Smith', age: 25, medical_history: 'Asthma', prescriptions: [] }
    ];

    const patientList = document.getElementById('patient-list');
    if (patientList) {
        patients.forEach(patient => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${patient.patientid}</td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.medical_history}</td>
                <td><a href="patientprofile.html?id=${patient.id}">View</a></td>
            `;
            patientList.appendChild(row);
        });
    }

    const patientProfile = document.getElementById('patient-profile');
    if (patientProfile) {
        const urlParams = new URLSearchParams(window.location.search);
        const patientId = parseInt(urlParams.get('id'));
        const patient = patients.find(p => p.id === patientId);
        if (patient) {
            patientProfile.innerHTML = `
                <h2>${patient.name}</h2>
                <p>Age: ${patient.age}</p>
                <p>Medical History: ${patient.medical_history}</p>
                <h3>Prescriptions</h3>
                <ul>
                    ${patient.prescriptions.length > 0 ? patient.prescriptions.map(p => `<li>${p}</li>`).join('') : '<li>No prescriptions found.</li>'}
                </ul>
            `;
        } else {
            patientProfile.innerHTML = '<p>Patient not found.</p>';
        }
    }

    const form = document.getElementById('prescription-form');
    const drugList = document.getElementById('drug-list');
    const addDrugButton = document.getElementById('add-drug-button');

    addDrugButton.addEventListener('click', () => {
        const drugEntry = document.createElement('div');
        drugEntry.className = 'drug-entry';
        drugEntry.innerHTML = `
            <label for="medication">Medication:</label>
            <input type="text" name="medication" required>
            <br>
            <label for="medication_type">Medication Type:</label>
            <select name="medication_type" required>
                <option value="Tablet">Tablet</option>
                <option value="Capsule">Capsule</option>
                <option value="Syrup">Syrup</option>
                <option value="Injection">Injection</option>
            </select>
            <br>
            <label for="dosage">Dosage:</label>
            <input type="text" name="dosage" required>
            <br>
            <label for="frequency">Frequency:</label>
            <input type="text" name="frequency" required>
            <br>
            <label for="duration">Duration:</label>
            <input type="text" name="duration" required>
            <br>
            <label for="notes">Additional Notes:</label>
            <textarea name="notes"></textarea>
        `;
        drugList.appendChild(drugEntry);
    });

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const patientId = parseInt(formData.get('patient_id'));
            const messageDiv = document.getElementById('form-message');

            const drugs = [];
            const drugEntries = document.querySelectorAll('.drug-entry');
            drugEntries.forEach(entry => {
                const medication = entry.querySelector('input[name="medication"]').value;
                const medicationType = entry.querySelector('select[name="medication_type"]').value;
                const dosage = entry.querySelector('input[name="dosage"]').value;
                const frequency = entry.querySelector('input[name="frequency"]').value;
                const duration = entry.querySelector('input[name="duration"]').value;
                const notes = entry.querySelector('textarea[name="notes"]').value;

                drugs.push({
                    medication,
                    medicationType,
                    dosage,
                    frequency,
                    duration,
                    notes
                });
            });

            const patient = patients.find(p => p.id === patientId);

            if (patient) {
                drugs.forEach(drug => {
                    const prescription = `
                        Medication: ${drug.medication} (${drug.medicationType}) - ${drug.dosage}
                        Frequency: ${drug.frequency}
                        Duration: ${drug.duration}
                        Notes: ${drug.notes}
                    `;
                    patient.prescriptions.push(prescription);
                });
                messageDiv.textContent = 'Prescription created successfully!';
                messageDiv.style.color = 'green';
            } else {
                messageDiv.textContent = 'Failed to create prescription. Patient not found.';
                messageDiv.style.color = 'red';
            }
        });
    }
});
