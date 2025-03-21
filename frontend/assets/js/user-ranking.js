document.addEventListener("DOMContentLoaded", function () {
    fetchUserRanking();
});

// Funzione per recuperare la classifica utenti
function fetchUserRanking() {
    fetch("http://localhost:8081/api/users/ranking")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("rankingTable").querySelector("tbody");
            tableBody.innerHTML = "";

            const row = document.createElement("tr");
            if(data.length > 0) {
                data.forEach((user, index) => {
                   
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${user.email}</td>
                        <td>${user.surveysCompleted}</td>
                        <td>${user.score}</td>
                    `;
                    tableBody.appendChild(row);
                });

            }else{
                row.innerHTML = `
                <td colspan="4">Nessun dato Disponibile</td>
            `;
            tableBody.appendChild(row);
            }

           
        })
        .catch(error => console.error("Errore nel caricamento della classifica:", error));
}
