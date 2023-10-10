# Country Capital Game

A challenge exercised I sourced from [Web Dev Cody](https://www.youtube.com/watch?v=XTgB4esy1is&ab_channel=WebDevCody).
The project is built in React and Typescript, scaffolded with Vite.

## The challenge is as follows: 
1. A React Component CountryCapitalGame must take in data as a prop - an object containing key-value pairs of countries
and its corresponding capital city.
2. A button should be displayed for each country and capital, in a randomised order.
3. Clicking a button should set its background color to blue.
4. Clicking another button should:
   - remove both buttons if its a correct match.
   - set the background color of both buttons to red if its an incorrect match.

5. Assuming the previously selected pair was wrong, clicking another button should restore the buttons to its initial
   background color, and the new selected button to blue.

6. When there are no buttons left, display a message: 'Congratulations'

### How to run locally
1. Clone the repo, cd into it, and run `yarn`
2. Then, run `yarn run dev` to start the server locally.

If you aren't into all that jazz, a live version exists [here](https://country-to-capital.netlify.app/).

Happy matching!

## Challenges I faced and further reading

### Dynamic Data
Before working on the logic I wanted the challenge to have dynamic data so that the same quiz didn't appear each time.
I found a simple free API called [Rest Countries](https://restcountries.com/). There's lots of endpoints you can hit
there to get various information about countries such as their language, common and native names, and much more. All I needed was a list of countries 
and their capital city (in some cases countries had multiple capitals, returned in the form of an array, so I just took the first one).

Since you obviously don't want a quiz having to match all 196 countries, I needed a way to generate a random set of countries from
the provided list. I defined a number `PAIRS_TO_SHOW` which, as it says, defines the number of Country to Capital pairs to show for the game. 

The logic in lines 21-22 of `src/App.tsx` grabs that number of pairs we've defined by:
1. Finding a random number in between PAIRS_TO_SHOW - 196 to act as our upper limit for slicing the array. 
   For example, if we want 10 pairs, we find a random number in between 10 and 196 (this ensures we don't go below the 0th index of the array)
2. Slicing the returned array (of all 196 countries), by that random number minus 10 to get a random set of countries. For example, if the randomly generated 
   number is 25. We do `countries.slice(25 - 10, 25)` to get 10 countries at indexes 15 through 25 exclusive. 

   ```
   const upper = Math.floor(Math.random() * (randomisedCountries.length - PAIRS_TO_SHOW + 1)) + PAIRS_TO_SHOW
   countries.slice(upper - PAIRS_TO_SHOW, upper)
   ```


### Actual Logic of the Challenge
The logic of the challenge is not too complicated. There are many ways to go about it. I would say my solution is slightly verbose
since you can see my thinking explicitly in the logic. I try to think about the lifecyle of the challenge:
1. What is the default state at the start?
2. What happens when we click one button? 
3. What happens when we click the second button? What side effects are there and what needs to be handled?
4. What is the end state of the game?

There are a few things I thought about during this:
1. How do we determine what background color a button is? You must keep track of the buttons that have been clicked, because
   if just one has been clicked, we are waiting for a second click. Then if the next button is clicked and its wrong, they remain
   there with a red color. But if its correct, then we remove them from the game completely.
2. How do we actually keep track of the buttons that have been clicked, and how are they represented?
3. How do we know if a match is correct? What if we click on two capital cities or two countries?
4. What happens if we click on the same button twice?

As mentioned before, it helps to just think of the lifecycle of the game before writing any code.

It was a fun challenge, quite basic but good to keep my problem solving logic and code writing skills in check.


