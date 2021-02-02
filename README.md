# Ahead
This is a “typeahead” widget - also sometimes called an
“autocomplete” input.

### Inspiration
https://www.airbnb.com/ (the “where” input)
https://sesamecare.com/ (either search input)

### Description

Upon typing, the widget fuzzy-matches case-insensitively against
the list at the end of this document and presents list items that
contain the matched characters as suggestions

* Clicking an autocomplete suggestion fills in the input with the full text.

* Using the up and down arrow keys allow the user to highlight a desired suggestion and Enter selects it. 

* Selecting in both cases is filling in the input

* The input is a valid HTML text input element to be used in a standard HTML form setup

* The is able to proceed without choosing one of the suggestions (non-exclusive)

* Hovering over the suggestions pre-preemptively fills in the input box. Note that it does not commit the change permanently until a suggestion is clicked or pressed enter-upon.

### Styling

The widget match suggestions appears below the text input as a floating container.
The floating suggestion area becomes scrollable when there are many suggestions.
The matched portion of the suggestion is highlighted in some way

—


Here is the default list of terms that the typeahead matches against:
```
Açaí, Apple, Akee, Apricot, Avocado, Banana, Bilberry, Blackberry,
Blackcurrant, Black sapote, Blueberry, Boysenberry, Buddha's hand, Crab
apples, Currant, Cherry, Cherimoya, Chico fruit, Cloudberry, Coconut,
Cranberry, Cucumber, Damson, Date, Dragonfruit, Pitaya, Durian,
Elderberry, Feijoa, Fig, Goji berry, Gooseberry, Grape, Raisin, Grapefruit,
Guava, Honeyberry, Huckleberry, Jabuticaba, Jackfruit, Jambul,
Japanese plum, Jostaberry, Jujube, Juniper berry, Kiwano, Kiwifruit,
Kumquat, Lemon, Lime, Loquat, Longan, Lychee, Mango, Mangosteen,
Marionberry, Melon, Cantaloupe, Honeydew, Watermelon, Miracle fruit,
Mulberry, Nectarine, Nance, Olive, Orange, Blood orange, Clementine,
Mandarine, Tangerine, Papaya, Passionfruit, Peach, Pear, Persimmon,
Plantain, Plum, Prune, Pineapple, Pineberry, Plumcot, Pomegranate,
Pomelo, Purple mangosteen, Quince, Raspberry, Salmonberry, Rambutan,
Redcurrant, Salal, Salak, Satsuma, Soursop, Star apple, Star fruit,
Strawberry, Surinam cherry, Tamarillo, Tamarind, Ugli fruit, White currant,
White sapote, Yuzu, Avocado, Bell pepper, Chili pepper, Corn kernel,
Cucumber, Eggplant, Olive, Pea, Pumpkin, Squash, Tomato, Zucchini
```

### To run the app

1. Clone the project 
2. Install the dependencies 
```
yarn
```
3. Run storybook
```
yarn start
```
4. Open your browser at http://localhost:6006


### To run the tests 

after you installed the dependencies as we explain above, run
```
yarn test
```
