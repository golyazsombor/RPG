let barmi=document.getElementById("felfe");

let stats = {
    "life": 100,
    "strength": 10,
    "endurance": 10,
    "deffense": 10,
    "experience": 0 
}

let available_points = 0;

let lvl = 0;

let lvl_description = [
    ["Egy asztronauta vagy!", "profile_lvl0.png"],
    ["Egy király asztronauta vagy!","profile_lvl1.jpg"],
    ["Egy überkirály asztronauta vagy!","profile_lvl2.jpg"],
    ["A szúperszóónikus asztronauta vagy!", "profile_lvl3.png"]
];

let profile_stats = {
    "pics": document.getElementById("profile_pics"),
    "description": document.getElementById("description"),
    "life": document.getElementById("profile_life"),
    "strength": document.getElementById("profile_strength"),
    "endurance": document.getElementById("profile_endurance"),
    "deffense": document.getElementById("profile_deffense"),
    "experience": document.getElementById("profile_experience"),
    "next_level": document.getElementById("next_lvl")
}

function refreshProfileStats(){
    profile_stats.pics.src = "pics/"+lvl_description[lvl][1]
    profile_stats.life.innerHTML = stats.life;
    profile_stats.strength.innerHTML = stats.strength;
    profile_stats.endurance.innerHTML = stats.endurance;
    profile_stats.deffense.innerHTML = stats.deffense;
    profile_stats.experience.innerHTML = stats.experience;
    profile_stats.description.innerHTML = lvl_description[lvl][0];
    profile_stats.next_level.innerHTML = 10;
    display_addBtns();
}

refreshProfileStats();

function update_strength(){
    if(available_points > 0){
        available_points--;
        stats.strength += 5;
        refreshProfileStats();
    }
}
function update_endurance(){
    if(available_points > 0){
        available_points--;
        stats.endurance += 5;
        refreshProfileStats();
    }
}
function update_deffense(){
    if(available_points > 0){
        available_points--;
        stats.deffense += 5;
        refreshProfileStats();
    }
}

function display_addBtns(){
    let btns = document.getElementsByClassName("addButtons");
    if(available_points > 0){
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="inline";
        }
    } else{
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="none";
        }
    }
}

function lvl_up() {
    if (stats.experience >= profile_stats.next_level) {
        stats.experience = stats.experience - profile_stats.next_level;
        available_points+=5;
        refreshProfileStats();
        profile_stats.next_level = Math.round(profile_stats.next_level * 1.2);
    }
}


/* ADVENTURE */

let story =  document.getElementById("story");

function rnd_szazalek(){
    return Math.floor(Math.random()*100);
}

function felfedezes(){
    let szazalek = 100;
    if(szazalek <= 20 && szazalek >= 5){


        harc("Űrmedve", 100, 8);

        refreshProfileStats();
    }
    else if(szazalek == 100){

        harc("Űrpingvin", 10000000, 1000000);

        refreshProfileStats();
        
        barmi.style.display="none";
    }
    
    else{
        story.innerHTML += "Sikeresen felfedeztél egy bolygót! (+1 tapasztalat)<br>";
        stats.experience += 1;
        refreshProfileStats();
    }
}

function harc(e_name, e_life, e_damage){
    story.innerHTML = "Egy " + e_name + " megtámadott téged!<br>";
    let counter = 0;
    let ellenfel_tamad = true;
    do {
        counter++;
        story.innerHTML += "<br>__"+counter+". kör__<br>";
        let szazalek = rnd_szazalek();
        if(ellenfel_tamad){

            let elkerules = 50 + stats.deffense;
            if(elkerules >= 100) elkerules = 95; 

            if(szazalek > elkerules){
                story.innerHTML += "Elkerülöd "+e_name+" félelmetes csapását!<br>";
            }else{
                story.innerHTML += "Az " +e_name+" eltalál és megsebez! (-"+e_damage+" élet)<br><p id='halal'>Meghaltál, mert a pingvinek gyengék!!</p><br><img src='pingvingif.gif'>";
                stats.life -= e_damage;
            }
        }else{
            let elkerules = 50;
            if(szazalek > elkerules){
                story.innerHTML += "Az "+e_name+" elkerüli a csapásodat!<br>";
            }else{
                story.innerHTML += "Eltalálod az " +e_name+"-t! (-"+stats.strength+" élet)<br>";
                
                e_life -= stats.strength;

                story.innerHTML += e_name +"-nak/-nek "+e_life+" élete maradt!<br>";
            }

        }

        ellenfel_tamad = !ellenfel_tamad;

        
    } while (stats.life > 0 && e_life > 0 && counter <= 10);
}
function friss(){
    location.reload();
}