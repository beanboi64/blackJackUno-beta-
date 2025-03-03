// Set up the tutorial page tracker
let currentTutorialPage = 0;
const totalTutorialPages = 3;

// When the webpage loads, set up the tutorial
document.addEventListener('DOMContentLoaded', function() {
    // Create the tutorial overlay
    const tutorialOverlay = document.createElement('div');
    tutorialOverlay.className = 'tutorial-overlay';
    tutorialOverlay.id = 'tutorial-overlay';

    // Create the tutorial content container
    const tutorialContent = document.createElement('div');
    tutorialContent.className = 'tutorial-content';

    // Page 1: Introduction to the game
    const page1 = document.createElement('div');
    page1.className = 'tutorial-page active';
    page1.innerHTML = `
        <h2>Welcome to BlackJack Uno!</h2>
        <p>BlackJack Uno is a simple card game where you try to get close to 21 without going over.</p>
        <p>Cards are numbered from 1 to 11.</p>
        <p>Each game costs <span class="highlight">150 VC (Valley Coins)</span>, and you start with 1050 VC.</p>
        <ul>
            <li>Win double your bet (300 VC) if you hit Blackjack (exactly 21)!</li>
            <li>Lose your bet if you bust (go over 21).</li>
            <li>Credits replenish at a rate of 50 VC every 5 seconds when you're out.</li>
        </ul>
    `;

    // Page 2: How to control the game
    const page2 = document.createElement('div');
    page2.className = 'tutorial-page';
    page2.innerHTML = `
        <h2>Game Controls</h2>
        <p>Here's how to play BlackJack Uno:</p>
        <ul>
            <li><span class="highlight2">New Game:</span> Start a new game (costs 150 VC)</li>
            <li><span class="highlight2">Hit:</span> Draw another card</li>
            <li><span class="highlight2">Stand:</span> End your turn and finalize your score</li>
        </ul>
        <p>The dealer shows a random card value for their hand.</p>
        <p>Try to get close to 21 without going over and beat the dealer's hand.</p>
    `;

    // Page 3: Tips and statistics
    const page3 = document.createElement('div');
    page3.className = 'tutorial-page';
    page3.innerHTML = `
        <h2>Tips and Statistics</h2>
        <p>Track your performance with the stats panel (click the info icon in the top right).</p>
        <ul>
            <li>Your win/loss record is saved automatically</li>
            <li>Check your Blackjack rate and how often you bust</li>
            <li>Track your total VC wins and losses</li>
        </ul>
        <p><span class="highlight">Note: This game is still in BETA.</span> New features like multiplayer mode are coming soon!</p>
        <p>Enjoy playing BlackJack Uno and good luck!</p>
    `;

    // Create the close button for the tutorial
    const closeButton = document.createElement('button');
    closeButton.className = 'close-tutorial';
    closeButton.innerHTML = '&times;';

    // Create navigation buttons for the tutorial
    const tutorialNav = document.createElement('div');
    tutorialNav.className = 'tutorial-nav';

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.id = 'prev-tutorial';

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.id = 'next-tutorial';

    tutorialNav.appendChild(prevButton);
    tutorialNav.appendChild(nextButton);

    // Put together the tutorial elements
    tutorialContent.appendChild(closeButton);
    tutorialContent.appendChild(page1);
    tutorialContent.appendChild(page2);
    tutorialContent.appendChild(page3);
    tutorialContent.appendChild(tutorialNav);
    tutorialOverlay.appendChild(tutorialContent);

    // Add the tutorial to the webpage
    document.body.appendChild(tutorialOverlay);

    // Set up event listeners for tutorial controls
    document.getElementById('help-button').addEventListener('click', showTutorial);
    document.querySelector('.close-tutorial').addEventListener('click', hideTutorial);
    document.getElementById('prev-tutorial').addEventListener('click', showPreviousTutorialPage);
    document.getElementById('next-tutorial').addEventListener('click', showNextTutorialPage);

    // Close the tutorial when clicking outside the content
    document.getElementById('tutorial-overlay').addEventListener('click', function(event) {
        if (event.target === this) {
            hideTutorial();
        }
    });

    // Update the tutorial navigation buttons
    updateTutorialNavigation();
});

// Show the tutorial overlay
function showTutorial() {
    document.getElementById('tutorial-overlay').style.display = 'flex';
    currentTutorialPage = 0;
    updateTutorialPage();
}

// Hide the tutorial overlay
function hideTutorial() {
    document.getElementById('tutorial-overlay').style.display = 'none';
}

// Go to the next tutorial page
function showNextTutorialPage() {
    if (currentTutorialPage < totalTutorialPages - 1) {
        currentTutorialPage++;
        updateTutorialPage();
    }
}

// Go to the previous tutorial page
function showPreviousTutorialPage() {
    if (currentTutorialPage > 0) {
        currentTutorialPage--;
        updateTutorialPage();
    }
}

// Update which tutorial page is shown
function updateTutorialPage() {
    const pages = document.querySelectorAll('.tutorial-page');
    pages.forEach((page, index) => {
        if (index === currentTutorialPage) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });

    updateTutorialNavigation();
}

// Update the tutorial navigation buttons
function updateTutorialNavigation() {
    const prevButton = document.getElementById('prev-tutorial');
    const nextButton = document.getElementById('next-tutorial');

    prevButton.disabled = currentTutorialPage === 0;
    prevButton.style.opacity = currentTutorialPage === 0 ? 0.5 : 1;

    nextButton.disabled = currentTutorialPage === totalTutorialPages - 1;
    nextButton.style.opacity = currentTutorialPage === totalTutorialPages - 1 ? 0.5 : 1;
}

// Toggle the stats popup when the icon is clicked
document.getElementById('stats-icon').addEventListener('click', () => {
    const statsPopup = document.getElementById('stats-popup');
    if (statsPopup.style.display === 'block') {
        statsPopup.style.display = 'none';
    } else {
        statsPopup.style.display = 'block';
    }
});

// Close the stats popup when clicking outside
document.addEventListener('click', (event) => {
    const statsPopup = document.getElementById('stats-popup');
    if (event.target !== statsPopup && !event.target.classList.contains('stats-icon')) {
        statsPopup.style.display = 'none';
    }
});
