// Members Page Logic

let currentMemberId = null;
let allMembers = [];

document.addEventListener('DOMContentLoaded', function() {
    filterMembers('ALL');
});

async function filterMembers(type) {
    try {
        if (type === 'ALL') {
            allMembers = await getAllMembers();
        } else {
            allMembers = await getMembersByType(type);
        }
        populateMembersTable(allMembers);
    } catch (error) {
        showError('Failed to load members: ' + error.message);
    }
}

function populateMembersTable(members) {
    const tbody = document.getElementById('membersTableBody');

    if (members.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="loading-row">No members found</td></tr>';
        return;
    }

    tbody.innerHTML = members.map(member => `
        <tr>
            <td>${member.id}</td>
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.phone}</td>
            <td><span class="badge ${getMemberTypeBadgeClass(member.memberType)}">${member.memberType}</span></td>
            <td>${formatDate(member.joinDate)}</td>
            <td>
                <button onclick="editMember(${member.id})" class="btn btn-sm" style="padding: 4px 8px; font-size: 11px;">✏️ Edit</button>
                <button onclick="deleteMemberConfirm(${member.id}, '${member.name}')" class="btn btn-sm" style="padding: 4px 8px; font-size: 11px; background-color: #93000a; color: #ffb4ab;">🗑️ Delete</button>
            </td>
        </tr>
    `).join('');
}

function openAddMemberModal() {
    currentMemberId = null;
    document.getElementById('modalTitle').textContent = 'Add New Member';
    document.getElementById('memberForm').reset();
    document.getElementById('joinDate').valueAsDate = new Date();
    document.getElementById('memberModal').style.display = 'flex';
}

async function editMember(id) {
    try {
        const member = await getMemberById(id);
        currentMemberId = id;

        document.getElementById('modalTitle').textContent = 'Edit Member';
        document.getElementById('memberName').value = member.name;
        document.getElementById('memberEmail').value = member.email;
        document.getElementById('memberPhone').value = member.phone;
        document.getElementById('memberType').value = member.memberType;
        document.getElementById('joinDate').value = member.joinDate;

        document.getElementById('memberModal').style.display = 'flex';
    } catch (error) {
        showError('Failed to load member: ' + error.message);
    }
}

function closeMemberModal() {
    document.getElementById('memberModal').style.display = 'none';
    currentMemberId = null;
}

async function saveMember() {
    const memberData = {
        name: document.getElementById('memberName').value,
        email: document.getElementById('memberEmail').value,
        phone: document.getElementById('memberPhone').value,
        memberType: document.getElementById('memberType').value,
        joinDate: document.getElementById('joinDate').value
    };

    try {
        if (currentMemberId) {
            await updateMember(currentMemberId, memberData);
            showSuccess('Member updated successfully!');
        } else {
            await createMember(memberData);
            showSuccess('Member created successfully!');
        }
        closeMemberModal();
        filterMembers('ALL');
    } catch (error) {
        showError('Failed to save member: ' + error.message);
    }
}

async function deleteMemberConfirm(id, name) {
    if (confirm(`Are you sure you want to delete member "${name}"?\nThis action cannot be undone.`)) {
        await deleteMemberAction(id);
    }
}

async function deleteMemberAction(id) {
    try {
        await deleteMember(id);
        showSuccess('Member deleted successfully!');
        filterMembers('ALL');
    } catch (error) {
        showError('Failed to delete member: ' + error.message);
    }
}
