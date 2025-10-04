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
        const maybeMale = data.maybe.filter(id => getPlayerGender(id) === 'M').length;
        const maybeFemale = data.maybe.filter(id => getPlayerGender(id) === 'F').length;
        
        return `
            <div class="tournament-card">
                <h3>${name}</h3>
                <p class="tournament-date">${data.date}</p>
                <div class="tournament-stats">
                    <span class="confirmed">${data.confirmed.length} confirmed (${confirmedMale}M/${confirmedFemale}F)</span>
                    <span class="maybe">${data.maybe.length} maybe (${maybeMale}M/${maybeFemale}F)</span>
                </div>
                <div class="player-lists">
                    <div class="confirmed-list">
                        <h4>Confirmed:</h4>
                        <ul>${data.confirmed.map(id => `<li><span class="gender-${getPlayerGender(id).toLowerCase()}">${getPlayerGender(id)}</span> ${getPlayerName(id)}</li>`).join('')}</ul>
                    </div>
                    <div class="maybe-list">
                        <h4>Maybe:</h4>
                        <ul>${data.maybe.map(id => `<li><span class="gender-${getPlayerGender(id).toLowerCase()}">${getPlayerGender(id)}</span> ${getPlayerName(id)}</li>`).join('')}</ul>
                    </div>
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
        currentPlayerStats[id] = { confirmed: 0, maybe: 0 };
    });
    
    // Count tournament participation
    Object.values(tournamentData).forEach(tournament => {
        const weight = tournament.weight || 1;
        tournament.confirmed.forEach(id => currentPlayerStats[id].confirmed += weight);
        tournament.maybe.forEach(id => currentPlayerStats[id].maybe += weight);
    });
    
    renderPlayerStats();
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
        if (currentSortBy === 'maybe') return b.maybe - a.maybe;
        return (b.confirmed + b.maybe) - (a.confirmed + a.maybe);
    });
    
    const container = document.getElementById('player-stats');
    container.innerHTML = sortedStats.map(([id, stats]) => `
        <div class="player-stat-card">
            <h4><span class="gender-${getPlayerGender(id).toLowerCase()}">${getPlayerGender(id)}</span> ${getPlayerName(id)}</h4>
            <div class="stat-numbers">
                <span class="confirmed-stat">${stats.confirmed} confirmed</span>
                <span class="maybe-stat">${stats.maybe} maybe</span>
                <span class="total-stat">${stats.confirmed + stats.maybe} total</span>
            </div>
        </div>
    `).join('');
}
