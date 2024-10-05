// Fetch profile data from localStorage
const profileData = JSON.parse(localStorage.getItem("profileData"));
console.log(profileData);

document.getElementById("profile-avatar").src =
  profileData.data.userPublicProfile.matchedUser.profile.userAvatar;
document.getElementById("profile-username").textContent =
  profileData.data.userPublicProfile.matchedUser.username;
document.getElementById("profile-fullname").textContent =
  profileData.data.userPublicProfile.matchedUser.profile.realName;
document.getElementById("profile-country").textContent =
  profileData.data.userPublicProfile.matchedUser.profile.countryName;
document.getElementById("profile-ranking-value").textContent =
  profileData.data.userPublicProfile.matchedUser.profile.ranking;
document.getElementById("github-link").href =
  profileData.data.userPublicProfile.matchedUser.githubUrl;
document.getElementById("linkedin-link").href =
  profileData.data.userPublicProfile.matchedUser.linkedinUrl;

// Display skills
const skillsList = document.getElementById("skills-list");
profileData.data.userPublicProfile.matchedUser.profile.skillTags.forEach(
  (skill) => {
    const skillDiv = document.createElement("div");
    skillDiv.classList.add("skill-item");
    skillDiv.textContent = skill;
    skillsList.appendChild(skillDiv);
  }
);

// Display problem-solving statistics (Solved & Total)
const solvedStats =
  profileData.data.userProblemsSolved.matchedUser.submitStatsGlobal
    .acSubmissionNum;
const totalStats = profileData.data.userProblemsSolved.allQuestionsCount;

function createPieChart(ctx, solved, total, label) {
  return new Chart(ctx, {
    type: "pie",
    data: {
      labels: [`${label} Solved`, `Not Solved`],
      datasets: [
        {
          data: [solved, total - solved],
          backgroundColor: ["#36A2EB", "#FFCE56"],
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}

// Find the total and solved counts for Easy, Medium, and Hard
const easySolved = solvedStats.find((d) => d.difficulty === "Easy").count;
const mediumSolved = solvedStats.find((d) => d.difficulty === "Medium").count;
const hardSolved = solvedStats.find((d) => d.difficulty === "Hard").count;

const easyTotal = totalStats.find((d) => d.difficulty === "Easy").count;
const mediumTotal = totalStats.find((d) => d.difficulty === "Medium").count;
const hardTotal = totalStats.find((d) => d.difficulty === "Hard").count;

createPieChart(
  document.getElementById("easy-pie-chart").getContext("2d"),
  easySolved,
  easyTotal,
  "Easy"
);
createPieChart(
  document.getElementById("medium-pie-chart").getContext("2d"),
  mediumSolved,
  mediumTotal,
  "Medium"
);
createPieChart(
  document.getElementById("hard-pie-chart").getContext("2d"),
  hardSolved,
  hardTotal,
  "Hard"
);

// Display language usage (Pie Chart)
const languageData =
  profileData.data.languageStats.matchedUser.languageProblemCount.map(
    (item) => item.problemsSolved
  );
const languageLabels =
  profileData.data.languageStats.matchedUser.languageProblemCount.map(
    (item) => item.languageName
  );

new Chart(document.getElementById("language-pie-chart").getContext("2d"), {
  type: "pie",
  data: {
    labels: languageLabels,
    datasets: [
      {
        data: languageData,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  },
  options: {
    responsive: true,
  },
});

// Display user badges in a single row
const badgesContainer = document.getElementById("badges-container");
const badges = profileData.data.userBadges.matchedUser.badges;

badges.forEach((badge) => {
  if (badge.icon && badge.icon.startsWith("http")) {
    // Check if badge icon exists
    const badgeImg = document.createElement("img");
    badgeImg.src = badge.icon;
    badgeImg.alt = badge.name;
    badgeImg.title = badge.name;
    badgesContainer.appendChild(badgeImg);
  }
});

// Display recently solved questions
const recentSolvedList = document.getElementById("recent-solved-list");
profileData.data.recentAcSubmissions.recentAcSubmissionList.forEach(
  (submission) => {
    const listItem = document.createElement("li");
    const questionLink = document.createElement("a");
    questionLink.href =
      "https://leetcode.com/problems/${submission.titleSlug}/";
    questionLink.textContent = submission.title;
    questionLink.target = "_blank";
    listItem.appendChild(questionLink);
    recentSolvedList.appendChild(listItem);
  }
);