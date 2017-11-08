# Flowers
Based off of Conway's Game of Life

#### Place seeds and observe the outcome

*You can click on squares in a gridded flower patch to place a seed.
On pressing play, the logic of Conway's GOL dictates the growth and death of your flower patch.*


## MVP

* Game of life logic accurately implemented with basic visualization
  * Flower lifecycle in 3js
  
* User can place starting seeds

## Technologies / Libraries / APIs

* 3JS (react-three-renderer)
  * render the grid and the living / dead cells *(combination of mesh and modules)*
    * render flower lifecycle *(ask a friend to model an animation then use that module as the cell)*
* Vanilla JS
  * Provide interactivity
* React
  * Manage state of grid
  * Make app extensible

## Backend

* Store 3js modules

## Implementation timeline

1. Create basic mesh grid
  * Game of life accurately occurs based off of starting seed
  * grid nodes change color based on whether they are alive or dead
2. User interaction
  * User can pick where the seeds start
  * User can play and pause the game of life
3. 3js enhancement
  * grid nodes have lifecycle animation
  * users interact with the 3js with their mouse movements
  