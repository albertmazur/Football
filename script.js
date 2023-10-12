function search(){
    let playersView = document.querySelector(".players")

    let namePlayer = document.querySelector("input[type=text]").value
    
    namePlayer = namePlayer.replace('ą', 'a')
    namePlayer = namePlayer.replace('ć', 'c')
    namePlayer = namePlayer.replace('ę', 'e')
    namePlayer = namePlayer.replace('ł','l')
    namePlayer = namePlayer.replace('ń','n')
    namePlayer = namePlayer.replace('ó','o')
    namePlayer = namePlayer.replace('ś','s')
    namePlayer = namePlayer.replace('ź','z')
    namePlayer = namePlayer.replace('ż','z')

    while(playersView.firstChild) playersView.removeChild(playersView.firstChild)

    fetch("https://api-football-v1.p.rapidapi.com/v3/players?league=1&search="+namePlayer, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": "8cf9b45d79mshc3d2f26bd7014cbp1a1ec1jsn58973423f248"
        }
    })
    .then(response => response.json().then(data =>{
        
        let players = data['response']
        if(players.length>0){
            for(let elem of players){
                let player = elem['player']
                let div = document.createElement("div")
                div.classList.add("player")

                let img = document.createElement("img")
                img.src = player["photo"]
                let name = player['firstname']+" "+player['lastname']
                img.alt = name
                div.append(img)
                
                let nameView = createP(name)
                nameView.classList.add("name")
                div.append(nameView)
                div.append(createP("Narodowość: "+player['nationality']))
                div.append(createP("Dane urodzenia: "+player['birth']['place']+" "+player['birth']['date']+" "+player['birth']['country']))
                div.append(createP("Wiek: "+player['age']+" lat"))
                div.append(createP("Wzrost: "+player['height']))
                div.append(createP("Waga: "+player['weight']))
    
                playersView.append(div)
            }
        }
        else{
            let h2 = document.createElement("h2")
            h2.textContent = "Brak takiego zawodnika"
            playersView.append(h2)
        }
        
    }))
    .catch(err => {
        let h2 = document.createElement("h2")
        h2.textContent = "Brak połączenia z bazą"
        playersView.append(h2)
    });
    
}

document.querySelector('input[type=button]').addEventListener("click", search)

function createP(text){
    let p = document.createElement("p")
    p.textContent=text
    return p
}