// Example profile data (from your LeetCode scraper)
const profileData = {
  userPublicProfile: {
    matchedUser: {
      username: "ganeshpawar09",
      profile: {
        userAvatar:
          "https://assets.leetcode.com/users/avatars/avatar_1703571021.png",
        realName: "Ganesh",
        countryName: "India",
      },
      githubUrl: "https://github.com/ganeshpawar09",
      linkedinUrl: "https://linkedin.com/in/ganesh-pawar-171950245",
    },
  },
  userProblemsSolved: {
    allQuestionsCount: [
      { difficulty: "Easy", count: 826 },
      { difficulty: "Medium", count: 1723 },
      { difficulty: "Hard", count: 745 },
    ],
  },
  userBadges: {
    matchedUser: {
      badges: [
        {
          name: "100 Days Badge 2024",
          icon: "https://assets.leetcode.com/static_assets/marketing/2024-100-lg.png",
        },
        {
          name: "50 Days Badge 2024",
          icon: "https://assets.leetcode.com/static_assets/marketing/2024-50-lg.png",
        },
      ],
    },
  },
  languageStats: {
    matchedUser: {
      languageProblemCount: [
        { languageName: "C++", problemsSolved: 294 },
        { languageName: "Java", problemsSolved: 43 },
        { languageName: "MySQL", problemsSolved: 32 },
        { languageName: "Python3", problemsSolved: 1 },
      ],
    },
  },
  userProfileCalendar: {
    matchedUser: {
      userCalendar: {
        submissionCalendar: {
          1704067200: 1,
          1704153600: 4,
          1707004800: 11,
          1717718400: 24,
          1717804800: 13,
        },
      },
    },
  },
};

// Display profile information
document.getElementById("profile-avatar").src =
  profileData.userPublicProfile.matchedUser.profile.userAvatar;
document.getElementById("profile-name").textContent =
  profileData.userPublicProfile.matchedUser.profile.realName;
document.getElementById("profile-country").textContent =
  profileData.userPublicProfile.matchedUser.profile.countryName;
document.getElementById("github-link").href =
  profileData.userPublicProfile.matchedUser.githubUrl;
document.getElementById("linkedin-link").href =
  profileData.userPublicProfile.matchedUser.linkedinUrl;

// Display badges
const badges = profileData.userBadges.matchedUser.badges;
const badgesContainer = document.getElementById("badges-container");
badges.forEach((badge) => {
  const img = document.createElement("img");
  img.src = badge.icon;
  img.alt = badge.name;
  badgesContainer.appendChild(img);
});

// Display problem-solving statistics (Solved vs Unsolved Pie Chart)
const solvedChartCtx = document
  .getElementById("solved-pie-chart")
  .getContext("2d");
const totalProblems = 4000; // Example total problems
const easySolved = profileData.userProblemsSolved.allQuestionsCount.find(
  (d) => d.difficulty === "Easy"
).count;
const mediumSolved = profileData.userProblemsSolved.allQuestionsCount.find(
  (d) => d.difficulty === "Medium"
).count;
const hardSolved = profileData.userProblemsSolved.allQuestionsCount.find(
  (d) => d.difficulty === "Hard"
).count;

const solvedData = {
  labels: ["Easy Solved", "Medium Solved", "Hard Solved", "Unsolved"],
  datasets: [
    {
      data: [
        easySolved,
        mediumSolved,
        hardSolved,
        totalProblems - (easySolved + mediumSolved + hardSolved),
      ],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#ddd"],
    },
  ],
};

new Chart(solvedChartCtx, {
  type: "pie",
  data: solvedData,
  options: {
    responsive: true,
  },
});

// Display language usage (Pie Chart)
const languageChartCtx = document
  .getElementById("language-pie-chart")
  .getContext("2d");
const languageData =
  profileData.languageStats.matchedUser.languageProblemCount.map(
    (item) => item.problemsSolved
  );
const languageLabels =
  profileData.languageStats.matchedUser.languageProblemCount.map(
    (item) => item.languageName
  );

new Chart(languageChartCtx, {
  type: "pie",
  data: {
    labels: languageLabels,
    datasets: [
      {
        data: languageData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  },
  options: {
    responsive: true,
  },
});

// Display heatmap (submission history over the last 12 months)
const heatmapDiv = document.getElementById("submission-heatmap");
const submissionCalendar =
  profileData.userProfileCalendar.matchedUser.userCalendar.submissionCalendar;

const now = new Date();
const oneYearAgo = new Date(
  now.getFullYear() - 1,
  now.getMonth(),
  now.getDate()
);
const currentTimestamp = Math.floor(now.getTime() / 1000); // current date in seconds
const oneYearAgoTimestamp = Math.floor(oneYearAgo.getTime() / 1000); // 1 year ago in seconds

for (
  let timestamp = oneYearAgoTimestamp;
  timestamp <= currentTimestamp;
  timestamp += 86400
) {
  // increment day by day
  const dayDiv = document.createElement("div");
  dayDiv.classList.add("day");

  const submissionCount = submissionCalendar[timestamp] || 0;
  dayDiv.setAttribute("data-submissions", submissionCount);

  heatmapDiv.appendChild(dayDiv);
}