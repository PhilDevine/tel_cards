# :iphone: The Solutions App

The Solutions app is an open education resource (OER) that has been built to capture, showcase and develop digital practice amongst educators and students.

**:warning: N.B. This documentation is under development and will be completed in early 2019.**

At [Keele University](https://www.keele.ac.uk), Solutions is being used to demonstrate how digital tools are helping tutors to create engaging learning experiences. Inspired by microlearning resources such as [#1minuteCPD](https://1minutecpd.wordpress.com/) (Manchester Metropolitan University), and incorporating the [3e Framework](https://staff.napier.ac.uk/services/vice-principal-academic/academic/TEL/TechBenchmark/Pages/Introduction.aspx) (Edinburgh Napier University), the Solutions app addresses the overwhelming availability of technologies with potential for learning and teaching, and curates them in collaboration with educators who have succesfully adopted such tools. The app categorises each technology, providing users with suggestions (or just-in-time solutions) along pedagogic themes. 

Solutions comes in 2 formats; a single card view and a card wall. Both have been designed responsively, so work across most screen sizes and devices (Google Chrome and Mozilla Firefox browsers recommended).  

### Single card view

The single card view displays 1 digital tool at a time and has been designed for smaller online spaces, for example, a shared section of a virtual learning environment (VLE).

![Screenshot of Solutions single card view](https://github.com/humsstel/tel_cards/blob/master/screenshots/solutions_card_view.png)

### Card wall

The card wall presents all available tools in a grid-like layout and can exist as a webpage in its own right, or as part of a larger online space (e.g. a VLE tab).  

![Screenshot of Solutions card wall](https://github.com/humsstel/tel_cards/blob/master/screenshots/solutions_app_wall.jpg)

## :wrench: Setting up your own Solutions app

The steps below demonstrate how to set up and maintain your own instance of the Solutions app, ready to populate with content.

### Fork and clone the repository

First, fork the tel_cards repository using your own GitHub account. A fork is a copy of a repository that will allow you to experiment without affecting the original project. 

You'll then need to create a local clone to begin working with the files on your computer. If you're not familiar with GitHub, guidance on how to set up Git, fork and clone can be found at https://help.github.com/articles/fork-a-repo/.

### Run the application with hot-reloading (launches dev server)
Use `yarn start` or if you don't have yarn, `npm run start`.

A local development server will now be running at http://localhost:1234. To see the wall display view, navigate to http://localhost:1234?display=wall.

### Compile production app to dist
Use `yarn build` or if you don't have yarn, `npm run build`.

### Deploy the built bundle and assets to GitHub Pages
Use `yarn deploy` or if you don't have yarn, `npm run deploy`.

### Embed the Solutions app using GitHub Pages
Both the single card view and card wall can be embedded directly, however, if you intend to embed the Solutions app within the Blackboard VLE, you may need to reference the included iframe pages for it to appear. For example:

* To embed the single card view using an iframe within Blackboard, you should reference the `iframe_index.html` file.

* To embed the card wall using an iframe, you should reference the `iframe_wall.html` file .

This application uses the [Svelte](https://svelte.technology/) framework to compile templates to vanilla JS. 

## :pencil: Create and Edit Cards

Creating new cards and editing existing information can be done from the `cards.js` file and is in JSON format. The screenshot below shows what a typical card looks like. 

![Screenshot of card JSON structure](https://github.com/humsstel/tel_cards/blob/master/screenshots/card_json.png)

### Categorising Apps - The Seven C's Framework

The Solutions app includes a filter that helps to find apps based on learning and teaching themes. For example, a user seeking a tool to help make teaching more interactive might apply the ‘Captivate’ filter, automatically highlighting tools with audience participation features (e.g. polling, quizzes etc). There are 7 filters in total. For the single card view, the filter can be found within the Catalogue tab. In the card wall, it appears at the top of the page. 

The JSON property that applies these themes is `activities`. The 7 values are `"create"`, `"connect"`, `"collaborate"`, `"curate"`, `"capture"`, `"captivate"` and `"check"`. If you are repurposing Solutions and wish to change these values, the `main.js` file and svelte template files will need to be amended.

![Seven C's for Classifying Learning and Teaching Apps](https://github.com/humsstel/tel_cards/blob/master/screenshots/seven_c_framework.png)

## :information_source: Further Information

For more information about the development of this project, please see our presentation from the OER18 conference at https://goo.gl/1W1GgE. 

## :arrows_counterclockwise: License

All code and content is released under a Creative Commons licence and openly published via GitHub to encourage reuse, adoption and collaboration.
