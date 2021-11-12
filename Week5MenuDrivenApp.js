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
        return `${this.instrumentName} in the ${this.section} Section`;
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
        if (this.instruments.length == 1) {
            return `${this.name} plays ${this.instruments.length} instrument.`;
        }  else {
            return `${this.name} plays ${this.instruments.length} instruments.`;
        }
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
            0) Return to Musician Main Menu
            1) Add a new Instrument
            2) Delete an Instrument
        ------------------------------------
            \t${MusicianInfo}
        `);
    }

    displayMusicians() {
        let musicianString = '';
        for (let i = 0; i < this.musicians.length; i++) {
            musicianString += i+ ') ' + this.musicians[i].describe() + '\n';
        }
        alert("All Musicians:\n"+ musicianString);
    }

    createMusician() {
        let name = prompt('Enter the name for new Musician: ');
        this.musicians.push(new Musician(name));
        console.log("Musician has been created!")
    }

    viewMusician() {
        let index = prompt("Enter the index of the Musician that you want to view:");
        if (index > -1  && index < this.musicians.length) {
            this.selectedMusician = this.musicians[index];
            console.log(`Chosen musician: ${this.selectedMusician.describe()}`);
            var newSelect1 = 0;
            do {
                let description = "\n Musician Name: " + this.selectedMusician.name + "\n";
                if (this.selectedMusician.instruments.length >0) {
                    description += "\tInstruments:\n";
                }
                for (let i = 0; i < this.selectedMusician.instruments.length; i++) {
                    console.log(this.selectedMusician.describe());
                   description +=  `\t\t  ${i})  ${this.selectedMusician.instruments[i].describe()} \n`; 
                }
            
           
                var selection1 = this.showMusicianMenuOptions(description);
                if (selection1 >= 0 && selection1 <=2 ) {
                    switch (selection1) {
                        case '1' : 
                            this.createInstrument();
                            break;
                        case '2' :
                            this.deleteInstrument();
                    }
                } else {
                    console.log("Invalid Selection!");
                }    
                newSelect1 = selection1;
            } while (newSelect1 != 0); // end of while   

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
        console.log("Musician has been deleted!")
    }


    createInstrument() {
        let name = prompt('Enter name for new instrument: ');
        let section = prompt('Enter section for new instrument: ');
        this.selectedMusician.instruments.push(new Instrument(name, section));
        console.log(this.selectedMusician.describe() + "\n\tInstrument has been created!")

    }

    deleteInstrument() {
        let index = prompt('Enter the index of the instrument that you wish to delete: ');
        if (index > -1 && index < this.selectedMusician.instruments.length) {
            this.selectedMusician.instruments.splice(index,1);
        } else {
            throw new Error(`Index: ${index} is an invalid Instrument index!`);
        }
        console.log(this.selectedMusician.describe() + "\n\tInstrument has been deleted!")
    }

}

let menu = new Menu();
menu.start();
