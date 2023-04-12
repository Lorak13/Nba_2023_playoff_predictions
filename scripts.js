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
