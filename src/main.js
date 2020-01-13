import { Store } from 'svelte/store'

// Base templates
import App from './templates/App.svelte'
import Wall from './templates/Wall.svelte'

// data for all the cards
import cards from './cards.js'

// Define store that will comprise the card data and state of the app
class AppStore extends Store {

	// Method to load a random card (callable from any component)
	loadRandomCard(currentCardId, a) {
        //document.getElementById(card.id).title = "test test test";
        document.getElementById("frontface").style.display = "block";

        //card.testest();
		// Remove current card so we don't randomly select it
		const cards = this.get('cards').filter(card => card.id !== currentCardId)
        const card = cards[Math.floor(Math.random() * cards.length)]
        this.set({
			currentCard: card.id,
		})
        
        
	}
    // Method to load a StaticActivity (callable from any component) PhilD
	loadStaticActivity(e) {
    
     var myClick = document.getElementById('filterText'); 
     myClick.value = e;
     myClick.addEventListener('change',function(){ 
     this.store.set({ filter: e })
     });  
     myClick.dispatchEvent(new Event('change'));
   
     }
    // Method to stop video ac
     stopVideo() {

       var myVideoac = document.getElementById("embedVideo-ac");
       var myVideo = document.getElementById("embedVideo");
         
       if(myVideoac) {  
       $(myVideoac).attr("src", $(myVideoac).attr("src"));
       } 
       if(myVideo) {  
       $(myVideo).attr("src", $(myVideo).attr("src"));       
       }
         
       }

    
}

// Expand each of the 'activities' for each card to include the full information for that activity
cards.forEach(card => {
	const activities = [
		{ name: "create", description: "Build learning resources, from scratch or remixing existing materials." },
		{ name: "captivate", description: "Create interactive learning opportunities that engage." },
		{ name: "check", description: "Gauge students understanding." },
		{ name: "connect", description: "Communicate with students in real time or asynchronously." },
		{ name: "collaborate", description: "A platform for collaboration and co-creation." },
		{ name: "curate", description: "Collect, organise and share content." },
		{ name: "capture", description: "Record an event, activity or artefact." },
        { name: "theory", description: "Engage with Learning theory." },
        { name: "ctel", description: "Centre for Technology Enhanced Learning" },
	]
	card.activities = card.activities.map(name => activities.find(activity => activity.name === name))
})


// add functioanlity of cardid in query string to view a unique card on reload and in first instance. PhilD
const searchParams2 = new URL(document.location).searchParams
const uniquecardid = searchParams2.get('cardid') ? searchParams2.get('cardid') : cards[Math.floor(Math.random() * cards.length)].id

// Create the store with initial state
const store = new AppStore({
	cards,
	currentCard: uniquecardid,
	currentPage: 'card',
})

const searchParams = new URL(document.location).searchParams
const display = searchParams.get('display')

const BaseTemplate = display === 'wall' ? Wall : App

// Create the app using App as the default template and pass it the store
const app = new BaseTemplate({
	target: document.body,
	store,
})

export default app;