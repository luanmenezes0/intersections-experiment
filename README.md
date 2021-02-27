# intersections-experiment

Implements a micro blog that displays the count of unread posts while the user scrolls. Experiments with the Intersection Observer API and the Mutation Observer API

- serve index.html
- see the unread posts count decrease as the page scrolls
- mark all as read pressing the count button
- press the add post button and see the unread posts count increase
- go to http://{localhost}index.html?unread={number} to see given number of "unread" posts


## How it's done

- the MutationObserver API watches changes like the insertion of new elements in the element observed
- the IntersectionObserver API executes a callback when the element observed is intersecting the browser viewport