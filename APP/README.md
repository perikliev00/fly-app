# SkyJet Flight Booking Website

This is a static web page for a fictional airline booking service called "SkyJet". The design is inspired by modern flight booking interfaces but has been customized with different branding, layout, and styling.

## Features

- Modern, responsive design
- Flight, hotel, and car rental booking options
- Interactive elements (tab switching, form validation)
- Promotional banner highlighting "Mountain Lakes" destination
- Customized branding and color scheme

## Project Structure

```
APP/
├── css/
│   └── styles.css
├── images/
│   ├── favicon.ico
│   ├── hero-background.jpg
│   ├── logo.png
│   └── mountains-background.jpg
├── js/
│   └── scripts.js
├── index.html
└── README.md
```

## How to Use

1. Open the `index.html` file in any modern web browser
2. Interact with the flight search form (note: this is a static demo, so actual booking functionality is not implemented)
3. Click on the tabs to switch between Flights, Hotels, and Car Rentals
4. Try clicking on the date fields and passenger selection to see the alert messages

## Technology Stack

- HTML5
- CSS3
- JavaScript (vanilla)
- SVG for graphics and backgrounds

## Customization

The website uses a blue and orange color scheme, which can be modified by changing the CSS variables at the top of the `styles.css` file:

```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #ff6600;
    --dark-color: #003366;
    --light-color: #f0f8ff;
    --gradient-start: #0066cc;
    --gradient-end: #00335e;
}
```
