# CAPE Covid-19 Website
The project is created by Anson Ang and Thomas Ng. It aims to create a website that centers around the Covid-19 virus and pandemic in general. The website's purposes is for the users from anywhere to be able to utilize the website by obtaining data from respective countries. Users can also learn and understand what is it, why does it happen, how to prevent/combat and more, basically to equip users with knowledge to face pandemics. 

#
 
## Design Process
This website focuses on the general people,whether young or old, professional or casual to be able to access this website. Users are able to access real time information about Covid-19 presemted in a simple and relatively easy way to understand. Information about Covid-19 is displayed in a way that is easy to understand. Lots os convienient features for users' comfort when browsing.

Wireframe link:
https://pixso.net/app/editor/j8jiKUibePBX1AMz0eL8ig?icon_type=1&page-id=0%3A1

## Features

 It has an introduction page to introduce users to the website and direct them to the website's main features.
 It also has a heatmap section where users can see the concentration of covid 19 cases of each country.
 It has a statistics page that have three options, which are local, location and global. For local and location, they use chart.js to get a graph of new cases by day, where location prompts the user with a windows prompt for the country.
 1. Global allows users to see statistics from different countries.
 2. Local defaults to Singapore and shows SIngapore's COVID-19 new cases data.
 3. Location prompts the user to input a country name and will search up the country using API, before making the data into a chart.
 It has an information page to provide detailed information about various topics, like Symptoms, medical data and diagnosis.
 It also includes 2 games, a bubble clicking game and a card memory game, to teach mroe information about COVID-19.
 The bubble game uses a restDB databases to get the data and puts it in the bubbles, while the card game is purely javascript.
Last but not least, it has a feature for user to change their browser window from light mode to dark mode and vice versa.

### Features Left to Implement
- Getting different country headlines (Complications include: getting news sources that are reliable, formatting it for each country, etc)
- Functioning search bar would require a lot of time to load due to the amount of covid data thre is.
## Technologies Used
- [BootStrap](https://bootstrap.com)
    - The project uses **Bootstrap** for website template.

- [Lottie](https://lottie.com)
    - The project uses **Lottie** for animation.

- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.


## Testing

Bugs across all pages:

1. Mouse trailer:
    - On page load, if mouse is not moved the trailer will not move to mouse
    - Mix-blend mode incompatible with IE

2. Dark mode light mode:
    - Open page across multiple tabs
    - Change mode
    - Page style will not update the css to fit the mode until refresh
    - Local storage does reflect the change but the styling change will not be called

3. Navbar in mobile:
    - Use screen width of less than around 150~px based on the page
    - Open up the navbar menu
    - The words will clip past with some divs overlapping
    - Can't really be fixed
Page related bugs:
Some pages's container would affect other layout

1. Home Page:
    -

2. Local Stats
    - Hovering over the chart will cause slight lag
    - This is due to there being many points in the data, causing every small movement to try and tooltip multiple
    - This lag is also caused when spamming the visibility for the chart
    - Probably hard to fix as decimation does not seem to work

3. Activities > Games > Virus Game
    Bug 1:
    - With small screen view on bubbles with lots of text, the text will exceed the bubble.
    Bug 2:
    - Load the game window.
    - Minimise the tab / Alt+Tab into another window / Change windows
    - Return to the page
    - The bubbles will spawn all at once based on how long you have been away from the tab, based on the speed you last left.
    Bug 3:
    - The scoring system is broken
    - On switching to a new database due to old one reaching requests limit, it somehow broke this part
    - Score is set to 0 before virus game starts but becomes NaN after a bubble spawns

4. Activities > Games > Memory game
    Bug 1:
    - On mobile view on navbar dropdown
    - The spacebar to exit text overlaps with the game
## [Changes](PatchNotes.md) 
Changes are usually documented [here](PatchNotes.md).
## Credits

### Content
- Information about Covid-19
- Heatmap
- Lottie animation
- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)
- Images for the memory game:
    - [Mask icons created by mangsaabguru - Flaticon](https://www.flaticon.com/free-icons/mask)
    - [Social distancing icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/social-distancing)
    - [Disinfection icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/disinfection)
    - [Wash your hands icons created by monkik - Flaticon](https://www.flaticon.com/free-icons/wash-your-hands)
    - [Shower icon created by Freepik - Flaticon](https://www.flaticon.com/free-icons/furniture-and-household)
    - [Cough icons created by berkahicon - Flaticon](https://www.flaticon.com/free-icons/cough)
    - [Patient icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/patient)
    - [Pets icons created by photo3idea_studio - Flaticon](https://www.flaticon.com/free-icons/pets)
### Acknowledgements

- I received inspiration for this project from WHO, and MOH Singapore.

