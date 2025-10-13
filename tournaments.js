let tournamentData = {};
let playersData = {};
let hideBackup = false;

function toggleBackup() {
    hideBackup = !hideBackup;
    const btn = document.getElementById('hide-backup-btn');
    btn.textContent = hideBackup ? 'Show Backup' : 'Hide Backup';
    displayTournaments();
}

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

function sortPlayersByGenderAndName(players) {
    return players.sort((a, b) => {
        // Sort by status first (main before backup)
        if (a.status !== b.status) {
            return a.status === 'main' ? -1 : 1;
        }
        
        const genderA = getPlayerGender(a.id);
        const genderB = getPlayerGender(b.id);
        const nameA = getPlayerName(a.id);
        const nameB = getPlayerName(b.id);
        
        // Then sort by gender (M before F)
        if (genderA !== genderB) {
            return genderA === 'M' ? -1 : 1;
        }
        
        // Finally sort by name
        return nameA.localeCompare(nameB);
    });
}

function displayTournaments() {
    const container = document.getElementById('tournament-list');
    container.innerHTML = Object.entries(tournamentData).map(([name, data]) => {
        const mainPlayers = data.players.filter(p => p.status === 'main');
        const backupPlayers = data.players.filter(p => p.status === 'backup');
        
        const mainMale = mainPlayers.filter(p => getPlayerGender(p.id) === 'M').length;
        const mainFemale = mainPlayers.filter(p => getPlayerGender(p.id) === 'F').length;
        const backupMale = backupPlayers.filter(p => getPlayerGender(p.id) === 'M').length;
        const backupFemale = backupPlayers.filter(p => getPlayerGender(p.id) === 'F').length;
        
        const playersToShow = hideBackup ? mainPlayers : data.players;
        const sortedPlayers = sortPlayersByGenderAndName(playersToShow);
        
        // Get available players (not in this tournament)
        const usedPlayerIds = data.players.map(p => p.id);
        const availablePlayers = Object.keys(playersData).filter(id => !usedPlayerIds.includes(parseInt(id)));
        
        return `
            <div class="tournament-card">
                <h3>${name}</h3>
                <p class="tournament-date">${data.date}</p>
                <div class="tournament-description-readonly">${data.description || ''}</div>
                <div class="tournament-stats">
                    <span class="confirmed">${mainPlayers.length} main (${mainMale}M/${mainFemale}F)</span>
                    ${hideBackup ? '' : `<span class="backup">${backupPlayers.length} backup (${backupMale}M/${backupFemale}F)</span>`}
                </div>
                <div class="player-list">
                    <h4>Players:</h4>
                    <ul class="single-player-list">
                        ${sortedPlayers.map(player => `
                            <li class="player-item">
                                <span class="gender-${getPlayerGender(player.id).toLowerCase()}">${getPlayerGender(player.id)}</span>
                                ${getPlayerName(player.id)}
                                <span class="status-tag status-${player.status}">${player.status}</span>
                                <span class="decision-tag decision-${player.decision || 'thinking'}">${player.decision || 'thinking'}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
    }).join('');
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
        tournament.players.forEach(player => {
            if (player.status === 'main') {
                currentPlayerStats[player.id].confirmed += weight;
            } else if (player.status === 'backup') {
                currentPlayerStats[player.id].backup += weight;
            }
        });
    });
    
    renderPlayerStats();
}

function removePlayer(playerId, tournament) {
    tournamentData[tournament].players = tournamentData[tournament].players.filter(p => p.id !== playerId);
    
    displayTournaments();
    displayPlayerStats();
}

function togglePlayerDecision(playerId, tournament) {
    const player = tournamentData[tournament].players.find(p => p.id === playerId);
    if (player) {
        const decisions = ['thinking', 'confirmed', 'declined'];
        const currentIndex = decisions.indexOf(player.decision || 'thinking');
        const nextIndex = (currentIndex + 1) % decisions.length;
        player.decision = decisions[nextIndex];
        displayTournaments();
        displayPlayerStats();
    }
}

function togglePlayerStatus(playerId, tournament) {
    const player = tournamentData[tournament].players.find(p => p.id === playerId);
    if (player) {
        player.status = player.status === 'main' ? 'backup' : 'main';
        displayTournaments();
        displayPlayerStats();
    }
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
            <div class="stat-numbers" onclick="showPlayerTournaments(${id}, '${getPlayerName(id)}')">
                <span class="confirmed-stat">${stats.confirmed} confirmed</span>
                <span class="backup-stat">${stats.backup} backup</span>
                <span class="total-stat">${stats.confirmed + stats.backup} total</span>
            </div>
        </div>
    `).join('');
}

function showPlayerTournaments(playerId, playerName) {
    const tournaments = getPlayerTournamentsList(playerId);
    const modal = document.createElement('div');
    modal.className = 'tournament-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${playerName} - Tournaments</h3>
            <div class="tournaments-list">${tournaments}</div>
            <button onclick="this.parentElement.parentElement.remove()" class="close-btn">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function updateTournamentDescription(tournament, description) {
    tournamentData[tournament].description = description;
}

function getPlayerTournamentsList(playerId) {
    const playerTournaments = [];
    Object.entries(tournamentData).forEach(([name, data]) => {
        const player = data.players.find(p => p.id == playerId);
        if (player) {
            let statusClass = '';
            if (player.status === 'backup') statusClass = 'backup-tournament';
            else if (player.status === 'thinking') statusClass = 'thinking-tournament';
            else if (player.status === 'decline') statusClass = 'decline-tournament';
            else if (player.status === 'confirmed') statusClass = 'confirmed-tournament';
            
            playerTournaments.push(`<div class="tournament-item ${statusClass}">${name} (${player.status})</div>`);
        }
    });
    return playerTournaments.length > 0 ? playerTournaments.join('') : '<div class="tournament-item">No tournaments</div>';
}
