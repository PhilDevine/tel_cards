<div class="manual-flip-av {{flipped ? 'hover' : ''}}">
    <style type="text/css">
        .{{ card.id }} .cardflipper, .nextcard:hover {
            background-color: {{ card.colour }};
        }
        .{{ card.id }} .titlebarfront-av {
            background: linear-gradient(
                rgba(52, 58, 64, 0.9) 0%, 
                rgba(52, 58, 64, 0.9) 95%
            );
            {{ card.assets.cover.styles }}
        }
        .{{ card.id }} .smalllogo {
            background-image: url({{ card.assets.logo.image }});
            {{ card.assets.logo.styles }}
        }
    </style>
    
    <div class="card-container">
        <div class="app-card-av card noborder {{ card.id }}">
      
        
            <div id="frontface" class="front face">

<!--<div class="cardflipper" role="button" on:click="rotateCardFrontav(card.videoURL,card.ids)">-->

<div class="cardflipper" role="button"  title="select to access back for card" on:click="rotateCardFrontav(card.videoURL,card.id)">

<div>
<i class="fas fa-redo-alt" aria-hidden="false"></i>
<button class="sub-button" title="select to access information on back of card">Flip card</button>
</div>

</div>
                <div class="titlebarfront-av">
                    <div class="apptitle-av">
                    <h1>{{ card.name }}</h1>
                    <h2>{{ card.tagline }}</h2>
                    </div>
                </div>
                <div class="card-body">

                    <p class="card-text-ac">{{ card.description }}</p>
                    <a class="tool-link" href="{{ card.url }}" target="_blank">{{ card.urltext }}</a>
                    <button id="copybtnac" class="copy-url" on:click="copycardurlac(this.name)" style="float:right;" data-toggle="" name="{{ card.id }}" title="Click to copy this cards unique URL to your clipboard" aria-hidden="false">copy url</button>
                    <input class="" aria-hidden="true" type="text" style="position: absolute;left: -2000px;" value="https://www.lancaster.ac.uk/staff/devinep/ctel/?cardid={{ card.id }}" id="copyurlac_{{ card.id }}">
                </div>
                <div class="details">
                    <div class="pills-main" title="tags area: activities or subjects domains this card support">

<h3>
                        
{{#each card.activities as activity, i}}
                            
<!-- Phild change -->
<span id="mytag" style="display:none;">{{card.activities[i].name}}</span>
    
<span id="{{ card.id }}_{{ card.activities[i].name }}" value="{{ card.activities[i].description }}" on:click="getTagCat(event)" class="badge activity {{ activity.name }}" data-toggle="" data-placement="top" name="{{ activity.name }}" title="{{ activity.description }}" aria-hidden="true">
<button class="sub-button" title="tag name is {{ activity.name }} select to move to card Catalogue">{{ activity.name }}</button>
</span>&nbsp;
                            {{/each}}
<i class="far fa-question-circle" data-toggle="" data-placement="top" title="activities or subjects domains this card support" aria-hidden="true"></i>

</h3>

                    </div>
                    <div class="pills-sub">
                    <H4>
                        {{#each card.uses as use}}
                        <span class="badge sub">{{ use }} </span>&nbsp;
                        {{/each}} 
                        <i class="far fa-question-circle" data-toggle="" data-placement="top" title="Examples of how this app can be used" aria-hidden="true"></i>
                    </H4>
                    </div>
                    
                    <div class="submitter-ac">
                        <div class="submitterimg">
                            <i class="far fa-user" aria-hidden="true"></i>
                        </div>
                        
                        <div class="submitterinfo">
<p class="small"><b>Submitted by</b><br>{{ card.submitter.name }}<span class="submitterschool-ac">&nbsp;| {{ card.submitter.title }}</span></p>
                        </div>
                    </div>
                </div>
                <div class="nextcard" role="button" on:click="store.loadRandomCard(card.id, card.activities)">
                    <div><i class="fas fa-magic" aria-hidden="true"></i>
                    &nbsp;&nbsp;<button class="sub-button" title="Random selection, select to Try another card">Try another card</button>
                    </div>
                </div>
            </div>
            
            <!-- End front panel -->

            <div id="backface" class="back face hide">
                <div class="cardflipper" role="button" on:click="rotateCardBackav()">
                    <div><i class="fas fa-redo-alt" aria-hidden="false"></i> 
<button class="sub-button" title="select to access information on front of card">Flip card</button>
                    </div>
                </div>
                
                
                <div class="mediabackground">
                    <div class="videocontainer">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe id="embedVideo-ac" class="embed-responsive-item youtube" src="{{ card.videoURL }}" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                </div> 
                
                
 <!--               
                <div class="mediabackground">
                    <div class="videocontainer">
                        <div class="embed-responsive embed-responsive-16by9">
                        
<video id="id-{{ card.id }}" class="embed-responsive-item" controls>
<source id="srcCardVideo" src="{{ card.videoURL }}" type="video/mp4">
</video>
                </div>
                </div>
                </div>
                
 -->               
                
                <div class="frameworkheading">
                    <p class="frameworktext1">{{card.frameworkheaders.one}}</p>
                    <p class="frameworktext2">{{card.frameworkheaders.two}}</p>
                </div>
                <div class='card-body framework'>
                    <div class="thermometer thermometer1">
                        <h2><i class="fas {{ card.frameworkicons.one }} usesimage" aria-hidden="true"></i></h2>
                        <p><strong>{{card.frameworktitles.one}}</strong></p>
                    </div>
                    <div class="usestext usestext1">
                        <p>{{ card.framework.commentary_a }}</p>
                    </div>
                    <div class="thermometer thermometer2">
                        <h2><i class="fas {{ card.frameworkicons.two }}" aria-hidden="true"></i></h2>
                        <p><strong>{{card.frameworktitles.two}}</strong></p>
                    </div>
                    <div class="usestext usestext2">
                        <p>{{ card.framework.commentary_b }}</p>
                    </div>
                    <div class="thermometer thermometer3">
                        <h2><i class="fas {{ card.frameworkicons.three }} usesimage" aria-hidden="true"></i></h2>
                        <p><strong>{{card.frameworktitles.three}}</strong></p>
                    </div>
                    <div class="usestext usestext3">
                        <p>{{ card.framework.commentary_c }}</p>
                    </div>
                </div>
                <div class="nextcard" role="button" on:click="store.loadRandomCard(card.id)">
                    <div><i class="fas fa-magic" aria-hidden=""></i>&nbsp;&nbsp;<button class="sub-button" title="Random selection, select to Try another card">Try another card</button></div>
                </div>
            </div> <!-- End back panel -->
        </div> <!-- End of card -->
    </div> <!-- End of column -->
</div> <!-- End of child card container -->

<script>

    export default {
        oncreate() {
        
            // What the currentCard variable for changes
            this.store.observe('currentCard', res => {
                // Child is positioned absolutely, so this forces container to fill height of child on re-render
                setTimeout(() => {
                    $(function () {
                    //$('[data-toggle="tooltip"]').tooltip()
                    //$('[data-toggle="tooltip"]').tooltip({container: '.wall-cards'})
                    });
                }, 20)

                // When the current card changes make sure the card is in the unflipped state
                this.set({ flipped: false })
            })
            
        },
        data() {
     
            return {
                // Set the card to unflipped state by default
                flipped: false,
            }
        },

        methods: {
            rotateCardFrontav(e,i) {

                document.getElementById("frontface").style.display = "none";
                document.getElementById("backface").style.display = "block";
                this.set({ flipped: !this.get('flipped') });
                document.getElementById("srcCardVideo").src = e;
                document.getElementById("id-"+i).load();
                //this.set({ flipped: true });
                
            },
            rotateCardBackav() {

var myVideoac = document.getElementById("embedVideo-ac");
var myVideo = document.getElementById("embedVideo");
if(myVideoac) {
$(myVideoac).attr("src", $(myVideoac).attr("src"));
}
if(myVideo) {
$(myVideo).attr("src", $(myVideo).attr("src"));
}

                document.getElementById("backface").style.display = "none";
               document.getElementById("frontface").style.display = "block";
               this.set({ flipped: !this.get('flipped') });
            },
            copycardurlac(n) {
            var copyTextac = document.getElementById("copyurlac_"+n);
            copyTextac.select();
            document.execCommand("copy");
            },
            getTagCat(e) {
            // new phild condition to stop wall filter
            var myEle = document.getElementById("wall");
            if(myEle){
            } else {
            this.store.set({currentPage: 'catalogue',})
            var element = e.target.innerHTML;
            this.store.loadStaticActivity(element);
            }
            },
            settooltip(e) {
            var myID = "#"+e;
            var title = $("#"+e).attr("value");
            //$(myID).tooltip('hide').attr('data-original-title', title).tooltip('show');
            },

            
        }

    }

</script>