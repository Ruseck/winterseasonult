let tournamentData = {};
let playersData = {};

async function loadTournamentData() {
    try {
        const [tournamentsResponse, playersResponse] = await Promise.all([
            fetch('tournaments.json'),
            fetch('players.json')
        ]);
        tournamentData = await tournamentsResponse.json();
        playersData = await playersResponse.json();
        displayTournaments();
        displayPlayerStats();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function getPlayerName(id) {
    return playersData[id]?.name || `Player ${id}`;
}

function getPlayerGender(id) {
    return playersData[id]?.gender || 'U';
}

function displayTournaments() {
    const container = document.getElementById('tournament-list');
    container.innerHTML = Object.entries(tournamentData).map(([name, data]) => {
        const confirmedMale = data.confirmed.filter(id => getPlayerGender(id) === 'M').length;
        const confirmedFemale = data.confirmed.filter(id => getPlayerGender(id) === 'F').length;
        const backupMale = data.backup.filter(id => getPlayerGender(id) === 'M').length;
        const backupFemale = data.backup.filter(id => getPlayerGender(id) === 'F').length;
        
        return `
            <div class="tournament-card">
                <h3>${name}</h3>
                <p class="tournament-date">${data.date}</p>
                <div class="tournament-stats">
                    <span class="confirmed">${data.confirmed.length} confirmed (${confirmedMale}M/${confirmedFemale}F)</span>
                    <span class="backup">${data.backup.length} backup (${backupMale}M/${backupFemale}F)</span>
                </div>
                <div class="player-lists">
                    <div class="confirmed-list">
                        <h4>Confirmed:</h4>
                        <ul class="drop-zone" data-tournament="${name}" data-status="confirmed">${data.confirmed.map(id => `<li draggable="true" data-player-id="${id}" class="draggable-player"><span class="gender-${getPlayerGender(id).toLowerCase()}">${getPlayerGender(id)}</span> ${getPlayerName(id)}</li>`).join('')}</ul>
                    </div>
                    <div class="backup-list">
                        <h4>Backup:</h4>
                        <ul class="drop-zone" data-tournament="${name}" data-status="backup">${data.backup.map(id => `<li draggable="true" data-player-id="${id}" class="draggable-player"><span class="gender-${getPlayerGender(id).toLowerCase()}">${getPlayerGender(id)}</span> ${getPlayerName(id)}</li>`).join('')}</ul>
                    </div>
                </div>
                <button onclick="saveTournamentData()" class="save-btn">Save Changes</button>
            </div>
        `;
    }).join('');
    
    setupDragAndDrop();
}

let currentPlayerStats = {};
let currentSortBy = 'total';

function displayPlayerStats() {
    currentPlayerStats = {};
    
    // Initialize stats for all players
    Object.keys(playersData).forEach(id => {
        currentPlayerStats[id] = { confirmed: 0, backup: 0 };
    });
    
    // Count tournament participation
    Object.values(tournamentData).forEach(tournament => {
        const weight = tournament.weight || 1;
        tournament.confirmed.forEach(id => currentPlayerStats[id].confirmed += weight);
        tournament.backup.forEach(id => currentPlayerStats[id].backup += weight);
    });
    
    renderPlayerStats();
}

function setupDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable-player');
    const dropZones = document.querySelectorAll('.drop-zone');
    
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', e.target.dataset.playerId);
            e.target.classList.add('dragging');
        });
        
        draggable.addEventListener('dragend', e => {
            e.target.classList.remove('dragging');
        });
    });
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', e => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });
        
        zone.addEventListener('dragleave', e => {
            zone.classList.remove('drag-over');
        });
        
        zone.addEventListener('drop', e => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            
            const playerId = parseInt(e.dataTransfer.getData('text/plain'));
            const tournament = zone.dataset.tournament;
            const newStatus = zone.dataset.status;
            
            movePlayer(playerId, tournament, newStatus);
        });
    });
}

function movePlayer(playerId, tournament, newStatus) {
    // Remove player from all lists in this tournament
    tournamentData[tournament].confirmed = tournamentData[tournament].confirmed.filter(id => id !== playerId);
    tournamentData[tournament].backup = tournamentData[tournament].backup.filter(id => id !== playerId);
    
    // Add to new list
    tournamentData[tournament][newStatus].push(playerId);
    
    // Refresh display
    displayTournaments();
    displayPlayerStats();
}

function saveTournamentData() {
    const dataStr = JSON.stringify(tournamentData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tournaments.json';
    link.click();
    
    URL.revokeObjectURL(url);
    alert('Tournament data downloaded! Replace the tournaments.json file with the downloaded version.');
}

function sortPlayerStats(sortBy) {
    currentSortBy = sortBy;
    
    // Update button states
    document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    renderPlayerStats();
}

function renderPlayerStats() {
    const sortedStats = Object.entries(currentPlayerStats).sort(([,a], [,b]) => {
        if (currentSortBy === 'confirmed') return b.confirmed - a.confirmed;
        if (currentSortBy === 'backup') return b.backup - a.backup;
        return (b.confirmed + b.backup) - (a.confirmed + a.backup);
    });
    
    const container = document.getElementById('player-stats');
    container.innerHTML = sortedStats.map(([id, stats]) => `
        <div class="player-stat-card">
            <h4><span class="gender-${getPlayerGender(id).toLowerCase()}">${getPlayerGender(id)}</span> ${getPlayerName(id)}</h4>
            <div class="stat-numbers">
                <span class="confirmed-stat">${stats.confirmed} confirmed</span>
                <span class="backup-stat">${stats.backup} backup</span>
                <span class="total-stat">${stats.confirmed + stats.backup} total</span>
            </div>
        </div>
    `).join('');
}
