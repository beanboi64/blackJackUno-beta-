// Set up the stats object to keep track of game statistics
let stats = {
    blackjacksWon: 0,
    timesBusted: 0,
    totalVCWon: 0,
    totalVCLost: 0,
};

// Load the saved stats from the browser's storage
function loadStats() {
    const savedStats = localStorage.getItem('gameStats');
    if (savedStats) {
        stats = JSON.parse(savedStats);
    }
}

// Save the current stats to the browser's storage
function saveStats() {
    localStorage.setItem('gameStats', JSON.stringify(stats));
}

// Show the stats on the screen
function updateStatsDisplay() {
    document.getElementById('blackjacks-won').textContent = stats.blackjacksWon;
    document.getElementById('times-busted').textContent = stats.timesBusted;

    // Calculate how often the player wins or loses
    const totalGames = stats.blackjacksWon + stats.timesBusted;
    const winRate = totalGames > 0 ? ((stats.blackjacksWon / totalGames) * 100).toFixed(2) : 0;
    const loseRate = totalGames > 0 ? ((stats.timesBusted / totalGames) * 100).toFixed(2) : 0;

    document.getElementById('win-rate').textContent = `${winRate}%`;
    document.getElementById('lose-rate').textContent = `${loseRate}%`;

    // Shorten big numbers for VC
    function abbreviateNumber(value) {
        if (value >= 1e12) return (value / 1e12).toFixed(1) + 'T';
        if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B';
        if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
        if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
        return value;
    }

    document.getElementById('total-vc-won').textContent = abbreviateNumber(stats.totalVCWon);
    document.getElementById('total-vc-lost').textContent = abbreviateNumber(stats.totalVCLost);
}

// Update the game statistics
function incrementStat(statKey, value = 1) {
    stats[statKey] += value;
    saveStats();
    updateStatsDisplay();
}

// Load the stats when the page is opened
loadStats();
updateStatsDisplay();

// Make the incrementStat function available to use in other scripts
window.incrementStat = incrementStat;
