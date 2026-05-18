// Trainers Page Logic

let currentTrainerId = null;

document.addEventListener('DOMContentLoaded', function() {
    loadAllTrainers();
});

async function loadAllTrainers() {
    try {
        const trainers = await getAllTrainers();
        populateTrainersTable(trainers);
    } catch (error) {
        showError('Failed to load trainers: ' + error.message);
        document.getElementById('trainersTableBody').innerHTML =
            `<tr><td colspan="5" class="loading-row">Error loading trainers</td></tr>`;
    }
}

function populateTrainersTable(trainers) {
    const tbody = document.getElementById('trainersTableBody');

    if (trainers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="loading-row">No trainers found</td></tr>';
        return;
    }

    tbody.innerHTML = trainers.map(trainer => `
        <tr>
            <td>${trainer.id}</td>
            <td>${trainer.name}</td>
            <td>${trainer.email}</td>
            <td>${trainer.specialization}</td>
            <td>
                <button onclick="editTrainer(${trainer.id})" class="btn btn-sm" style="padding: 4px 8px; font-size: 11px;">✏️ Edit</button>
                <button onclick="deleteTrainerConfirm(${trainer.id}, '${trainer.name}')" class="btn btn-sm" style="padding: 4px 8px; font-size: 11px; background-color: #93000a; color: #ffb4ab;">🗑️ Delete</button>
            </td>
        </tr>
    `).join('');
}

function openAddTrainerModal() {
    currentTrainerId = null;
    document.getElementById('trainerModalTitle').textContent = 'Add New Trainer';
    document.getElementById('trainerForm').reset();
    document.getElementById('trainerModal').style.display = 'flex';
}

async function editTrainer(id) {
    try {
        const trainer = await getTrainerById(id);
        currentTrainerId = id;

        document.getElementById('trainerModalTitle').textContent = 'Edit Trainer';
        document.getElementById('trainerName').value = trainer.name;
        document.getElementById('trainerEmail').value = trainer.email;
        document.getElementById('trainerSpecialization').value = trainer.specialization;

        document.getElementById('trainerModal').style.display = 'flex';
    } catch (error) {
        showError('Failed to load trainer: ' + error.message);
    }
}

function closeTrainerModal() {
    document.getElementById('trainerModal').style.display = 'none';
    currentTrainerId = null;
}

async function saveTrainer() {
    const trainerData = {
        name: document.getElementById('trainerName').value,
        email: document.getElementById('trainerEmail').value,
        specialization: document.getElementById('trainerSpecialization').value
    };

    try {
        if (currentTrainerId) {
            await updateTrainer(currentTrainerId, trainerData);
            showSuccess('Trainer updated successfully!');
        } else {
            await createTrainer(trainerData);
            showSuccess('Trainer created successfully!');
        }
        closeTrainerModal();
        loadAllTrainers();
    } catch (error) {
        showError('Failed to save trainer: ' + error.message);
    }
}

async function deleteTrainerConfirm(id, name) {
    if (confirm(`Are you sure you want to delete trainer "${name}"?\nThis action cannot be undone.`)) {
        await deleteTrainerAction(id);
    }
}

async function deleteTrainerAction(id) {
    try {
        await deleteTrainer(id);
        showSuccess('Trainer deleted successfully!');
        loadAllTrainers();
    } catch (error) {
        showError('Failed to delete trainer: ' + error.message);
    }
}
