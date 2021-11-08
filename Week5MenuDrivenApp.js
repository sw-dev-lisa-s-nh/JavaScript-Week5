//
//  JavaScript Week 5 Menu Driven App
//   Lisa Maatta Smith
//   due:  11/13/21
//

class Instrument { // Like a Player
    constructor(name, section) {
        this.instrumentName = name;
        this.section = section;
    }

    describe() {
        console.log(`${this.instrumentName} is in the ${this.section}`)
    }
}

class Musician { // Like a Team
    constructor(name) {
        this.name = name;
        this.instruments = [];
    }

    addInstrument(instrument) {
        if (instrument instanceof Instrument) {
            this.instruments.push(instrument);
        } else {
            throw new Error(`You can only add an instance of Instrument.  
            This argument is not an instrument: ${instrument}`);
        }
    }

    describe() {
        console.log(`${this.name} plays ${this.instruments.length} instruments.`);
        // POSSIBLY:  write a loop to get all of the instrument)
    }
}

class Menu { // Menu class
    constructor() {
        this.musicians = []; // array of musicians
        this.selectedMusician = null; // manage one musician at a time
    }

    start() { // entry point to application
        let selection = this.showMainMenuOptions(); 
        while (selection != 0) {
            switch(selection) {
                case '1' :
                    this.createMusician();
                    break;

                case '2' :
                    this.viewMusician();
                    break;

                case '3' :
                    this.deleteMusician();
                    break;

                case '4' :
                    this.displayMusicians();
                    break;

                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('End of Musician Program!');
    }

    showMainMenuOptions() {
        return prompt(`       
        Musician Main Menu:
        ------------------------------------
            0) Exit
            1) Create a new Musician
            2) View a Musician
            3) Delete a Musician
            4) Display all Musicians
        ------------------------------------
            `);
    }

    showMusicianMenuOptions(MusicianInfo) {
        return prompt(`
        Individual Musician Menu:
        ------------------------------------
            0) Return to Musician Menu
            1) Add a new Instrument
            2) Delete an Instrument
        ------------------------------------
            \t${MusicianInfo}
        `);
    }

    displayMusicians() {
        let musicianString = '';
        for (let i = 0; i < this.musicians.length; i++) {
            musicianString += i+ ') ' + this.musicians[i].name + '\n';
        }
        alert(musicianString);
    }

    createMusician() {
        let name = prompt('Enter the name for new Musician: ');
        this.musicians.push(new Musician(name));
    }

    viewMusician() {
        let index = prompt("Enter the index of the Musician that you want to view:");
        if (index > -1  && index < this.musicians.length) {
            this.selectedMusician = this.musicians[index];
            let description = "\n Musician Name: " + this.selectedMusician.name + "\n";
            
            for (let i = 0; i < this.selectedMusician.instruments.length; i++) {
                description +=  '\t\t' + i + ') ' + this.selectedMusician.instruments[i].instrumentName 
                    + ' - ' + this.selectedMusician.instruments[i].section + ' Section \n';
            }

            let selection1 = this.showMusicianMenuOptions(description);
            switch (selection1) {
                case '1' : 
                    this.createInstrument();
                    break;
                case '2' :
                    this.deleteInstrument();
            }

        } else {
            throw new Error(`Index: ${index} is an invalid Musician's index!`);
        }  // validate user input
    }

    deleteMusician() {
        let index = prompt('Enter the index of the Musician that you wish to delete: ');
        if (index > -1  && index < this.musicians.length) {
            this.musicians.splice(index,1);
        }  else {
            throw new Error(`Index: ${index} is an invalid Musician's index!`);
        }  // validate user input
    }


    createInstrument() {
        let name = prompt('Enter name for new instrument: ');
        let section = prompt('Enter section for new instrument: ');
        this.selectedMusician.instruments.push(new Instrument(name, section));
    }

    deleteInstrument() {
        let index = prompt('Enter the index of the instrument that you wish to delete: ');
        if (index > -1 && index < this.selectedMusician.instruments.length) {
            this.selectedMusician.instruments.splice(index,1);
        } else {
            throw new Error(`Index: ${index} is an invalid Instrument index!`);
        }
    }

}

let menu = new Menu();
menu.start();
