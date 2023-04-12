// Example data structure for storing users and their guesses
const users = [
  { name: 'User1', guesses: ['A4', 'B3', 'A1', 'B4'] },
  { name: 'User2', guesses: ['B4', 'A3', 'A1', 'B2'] },
  { name: 'User3', guesses: ['A3', 'B3', 'A1', 'A4'] },
];

// Example data structure for storing actual results
const results = ['A2', 'B3', 'A1', 'B4'];

// Function to calculate points based on guess distance
function calculatePoints(guessDistance) {
  switch (guessDistance) {
    case 0:
      return 7;
    case 1:
      return 4;
    case 2:
      return 2;
    case 3:
      return 0;
    case 4:
      return -2;
    case 5:
      return -4;
    case 6:
      return -7;
    default:
      return 0;
  }
}

// Function to convert guess/result to index (1-8)
function guessToIndex(guess) {
  const mapping = { A4: 1, A3: 2, A2: 3, A1: 4, B1: 5, B2: 6, B3: 7, B4: 8 };
  return mapping[guess];
}

// Function to calculate points for each user based on their guesses
function calculateUserPoints(users, results) {
  for (const user of users) {
    let totalPoints = 0;
    for (let i = 0; i < user.guesses.length; i++) {
      const guessDistance = Math.abs(guessToIndex(user.guesses[i]) - guessToIndex(results[i]));
      totalPoints += calculatePoints(guessDistance);
    }
    user.points = totalPoints;
  }

  // Sort users by points in descending order
  users.sort((a, b) => b.points - a.points);

  return users;
}

const leaderboard = calculateUserPoints(users, results);

// Display leaderboard
console.log(leaderboard);

// Function to create a playoff matchup element
function createMatchupElement(matchupId, users, result) {
  const matchup = document.createElement('div');
  matchup.classList.add('matchup');
  matchup.innerHTML = `
    <div class="matchup-title">Matchup ${matchupId + 1}</div>
    <div class="predictions">
      ${users.map(user => `<div class="user-prediction"><span>${user.name}</span><span>${user.guesses[matchupId]}</span></div>`).join('')}
    </div>
    <div class="actual-result">Result: ${result}</div>
  `;
  return matchup;
}

// Function to display playoff matchups
function displayPlayoffMatchups(users, results) {
  const playoffPicture = document.getElementById('playoff-picture');
  for (let i = 0; i < results.length; i++) {
    playoffPicture.appendChild(createMatchupElement(i, users, results[i]));
  }
}

// Function to display leaderboard
function displayLeaderboard(leaderboard) {
  const leaderboardTableBody = document.getElementById('leaderboard-table').querySelector('tbody');
  for (const user of leaderboard) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${user.name}</td><td>${user.points}</td>`;
    leaderboardTableBody.appendChild(row);
  }
}

displayPlayoffMatchups(users, results);
displayLeaderboard(leaderboard);
