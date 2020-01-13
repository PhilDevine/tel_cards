<div class="card mainCard">
	<div class="card-header" role="navigation">
		<ul class="nav nav-tabs card-header-tabs justify-content-center">
        
        
             <!-- accessbility view tab start -->
            <li class="nav-item" on:click="store.stopVideo()">
				<a tabindex="1" class="nav-link stop-video {{ $currentPage === 'accessibility' ? 'active show' : ''}}" id="accessibility-tab" href="#accessibility" on:click="store.set({ currentPage: 'accessibility' })"><span class="moveme">accessibility view</span><i class="fas fa-universal-access fa-lg" aria-hidden="true" title="accessibility view"></i></a>
			</li>
            
            <!-- accessbility view tab end -->
            
            
			<li class="nav-item" on:click="store.stopVideo()">
				<a tabindex="2" class="nav-link {{ $currentPage === 'card' ? 'active' : ''}}" id="app-tab" href="#appgenerator" on:click="store.set({ currentPage: 'card' })"><span class="moveme">Card View</span><i class="fas fa-magic" aria-hidden="true"></i></a>
			</li>
			<li class="nav-item" on:click="store.stopVideo()">
				<a tabindex="3" class="nav-link {{ $currentPage === 'catalogue' ? 'active show' : ''}}" id="catalogue-tab" href="#catalogue" on:click="store.set({ currentPage: 'catalogue' })"><span class="moveme">catalogue</span><i class="far fa-bookmark" aria-hidden="true"></i></a>
			</li>
			<li class="nav-item" on:click="store.stopVideo()">
				<a tabindex="4" class="nav-link {{ $currentPage === 'contribute' ? 'active show' : ''}}" id="contribute-tab" href="#contribute" on:click="store.set({ currentPage: 'contribute' })"><span class="moveme">contribute</span><i class="far fa-plus-square" aria-hidden="true"></i></a>
			</li>
			<li class="nav-item" on:click="store.stopVideo()">
				<a tabindex="5" class="nav-link {{ $currentPage === 'about' ? 'active show' : ''}}" id="about-tab" href="#about" on:click="store.set({ currentPage: 'about' })"><span class="moveme">about</span><i class="fas fa-info" aria-hidden="true"></i></a>
			</li>
            

            
		</ul>
	</div>
	<div class="tab-content" id="myTabContent">
		<div class="tab-pane {{ $currentPage === 'card' ? 'active show' : ''}}" id="appgenerator" role="tabpanel" aria-labelledby="app-tab">
			<div class="container card-holder">
				<Card :card />
			</div>
		</div>
		<div class="tab-pane {{ $currentPage === 'catalogue' ? 'active show' : ''}}" id="catalogue" role="tabpanel" aria-labelledby="catalogue-tab">
			<Catalogue />
		</div>
		<div class="tab-pane {{ $currentPage === 'contribute' ? 'active show' : ''}}" id="contribute" role="tabpanel" aria-labelledby="contribute-tab">
			<Contribute />
		</div>
		<div class="tab-pane {{ $currentPage === 'about' ? 'active show' : ''}}" id="about" role="tabpanel" aria-labelledby="about-tab">
			<About />
		</div>
        <!-- accessbility page tab start -->
        <div class="tab-pane {{ $currentPage === 'accessibility' ? 'active show' : ''}}" id="accessibility" role="tabpanel" aria-labelledby="accessibility-tab">
       
        <div class="container card-holder">
				<!--<Card :card />-->
                <Accessibility :card />
			</div>
			<!--<Accessibility />-->
       
		</div>
        <!-- accessbility page tab start -->
	</div>
</div>

<script>
	// All the sub-templates
	import Card from './Card.svelte'
	import Catalogue from './Catalogue.svelte'
	import Contribute from './Contribute.svelte'
	import About from './About.svelte'
    import Accessibility from './Accessibility.svelte'

	export default {
        oncreate() {
			// Child is positioned absolutely, so this forces container to fill height of child
			const childHeight = document.querySelector('.card').scrollHeight
			document.querySelector('#appgenerator').style.height = `${childHeight-150}px`
		},

		// Expose the templates as components that can be referened in this template
		components: {
			Card,
			Catalogue,
			Contribute,
			About,
            Accessibility,
		},

		// Compute the card object by indexing the currentCard in the cards array
		computed: {
			card: ($cards, $currentCard) => $cards.find(card => card.id === $currentCard)
		}
	}
</script>