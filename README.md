# scored

__`scored`__ is a web app for tracking cumulative scores in 
multi-player board and card games. It's written in pure JavaScript
using web components (lit-html) and Redux for state management.

## Components

### `player`

The `player` component holds the score from each turn and the total
(cumulative) score for that player. It also records the start and end
time off each turn. It can also provide the accumulated total play
time for that player.

By default the `player` component is in read only mode until it's
that player's turn.

### `game`

The `game` component holds all of the player components (in the order
of play) plus the name of the game, the start time, the total play
time, and the rank of all the players.

The `game` component ensures that only one `player` component is
active at a time and that each `player` component is activated in the
correct order.

At the end of each round the `game` component *tells* each `player`
component its rank for that round and the game over all.


## Background reading

* [Making a fullstack CRUD app with LitHTML, Redux, Express, and Webpack.](https://medium.com/@pascalschilp/making-a-fullstack-crud-app-with-lithtml-redux-express-and-webpack-fe7e5cf8b3ef)
* [Using Redux in a LitElement app](https://vaadin.com/learn/tutorials/lit-element/state-management-with-redux)
* [create-lit-app](https://github.com/thepassle/create-lit-app)
* [lit-html + redux? #185](https://github.com/Polymer/lit-html/issues/185)

## Issues with create-react-app and TypeScript import resolution

Background: (2020-02-18) I'm not able to get TypeScript to compile 
            becuase I'm having issues with import path resolution.

* [Typescript Typings - The Complete Guide To Type Definitions: @types, Compiler Opt-In Types: When To Use Each and Why?](https://blog.angular-university.io/typescript-2-type-system-how-do-type-definitions-work-in-npm-when-to-use-types-and-why-what-are-compiler-opt-in-types/)
* [TypeScript: Adding Custom Type Definitions for Existing Libraries](https://www.credera.com/blog/technology-solutions/typescript-adding-custom-type-definitions-for-existing-libraries/)
* [TypeScript: Publishing](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)
* [TypeScript: tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
