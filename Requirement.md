# Coding Exercise

This exercise is in React and contains a frontend and backend project. The project is compatible with Node v16 and npm v7+.

Set up instructions:
1. Clone the provided repo and create a branch to submit your work
2. Run `npm ci` for both projects
3. Start the projects with `npm start`

**_IMPORTANT: Feel free to add dependencies and change the project structure as you see fit._**
**_If something is not clear, write down an assumption in the code and move on._**

# What we look for
Your submission will be judged on:
- technical completeness
- visual completeness
- general coding practices such as readability and maintainability
- test coverage
    - production-grade test coverage is not expected but please have enough to indicate how you would test the application

# The Task at Hand

Your task is to create a simple online dictionary to make it easy for people to look up new words and save their 
favourites. We will be using Free Dictionary API available at `https://dictionaryapi.dev/` to power our search.

The design can be found at this [Figma link](https://www.figma.com/file/ppPKHTLqvczZj0UVIdNPon/Frontend-Coding-Challenge?node-id=0%3A1). 
Feel free to use any css/component library but please make sure the final result follows the design. 
Any assets, such as icons, can be exported directly from Figma.

_Note: you will have to login with a Figma account to inspect the design._

### Task 1 - Looking up words

There should be an input field for users to type in their word. All definitions along with the word's phonetics should
be shown on the page when the API returns a result. Additionally, when the user searches a new word, the previous 
results should move down the page so that the newest result is always in the top position.

Please also show a meaningful error if the user enters a word that does not exist.

_Note: Sometimes the API returns multiple results for one word. For example "scare". In this scenario take the
first result in the returned array and ignore the rest._

### Task 2 - Favouriting Words

For this task you will have to use the included ExpressJS backend. We have included a list of favourite words that 
you may retrieve from `localhost:3001/favourites`. Please display this list on the left side of the page.

Next, users should be able to add words that they've looked up to their favourites. In the backend app again you should
find an endpoint for saving favourites and another for removing favourites. 

Please implement a mechanism on the UI for users to favourite and unfavourite a word. Assume the API will only ever 
accept one word at a time.

_Note: The backend app only stores favourites in memory._<br>
_Bonus: How would you handle users toggling the same word in rapid succession?_

### Task 3 - Search History

We would like for users to be able to see their search history. Please display this information on the right side of 
the page.

_Bonus: How would you keep search history if the app reloaded?_

### Task 4 - Quick Links

For words in the favourites list and search history, we would like for users to be able to use them as quick links to
the definition.

When the user clicks on a favourite word or a word in the search history, the definition should appear in top 
position again similar to the first task.