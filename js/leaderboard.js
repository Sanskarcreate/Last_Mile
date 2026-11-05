const leaderboardBody = document.getElementById("leaderboardBody"); // this here is just to find the leaderboard body in html form the leaderboard html.

let scores = JSON.parse(localStorage.getItem("lastMilescores") || "[]"); // this here is to retrieve the scores that are saved.

scores.sort((a, b) => b.score - a.score); // thisline here sorts the score from highest to lowest meaning that highest s ore will be displayed at the top to let the users know who the highest score belongs to.

scores = scores.slice(0, 10); // this will only keep 10 scores meaning the top 10 will only be displayed the rest will not be visible so if there a low score and there is already 10 on there you will not be able to see it.

if(scores.length > 0){ // this here is to check whether there are any saved scores already or not.
    leaderboardBody.innerHTML = ""; // this line here makes sure that there wont be any information on the leaderboard that show up twice. if it does find one it will empty it

    scores.forEach((player, index) =>{ // this goes through the scores as wellas players saved to then display it onto the leaderboard.

        const row = document.createElement("tr"); // creates a new table rwo whenever a score is being added.

        const rank = document.createElement("td");
        rank.textContent = index + 1; // this is going to display the players username.

        const name = document.createElement("td"); // this is going to display the players rank on the leaderboard.
        name.textContent = player.name;

        const score = document.createElement("td"); //. this is going to display the players score of how much they got in the game.
        score.textContent = player.score;


        // these will add the rank, name and score to the leaderboard for the players ot see the players that have played as well as their score.
        row.appendChild(rank);
        row.appendChild(name);
        row.appendChild(score);

        leaderboardBody.appendChild(row); //. add the full leaderboard to the page.
    })
}




