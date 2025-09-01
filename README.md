# Project 3: Spots

### Overview

- Intro
- Figma
- Images

**Intro**

This project is made so all the elements are displayed correctly on popular screen sizes. We recommend investing more time in completing this project, since it's more difficult than previous ones.

**Figma**

- [Link to the project on Figma](https://www.figma.com/file/BBNm2bC3lj8QQMHlnqRsga/Sprint-3-Project-%E2%80%94-Spots?type=design&node-id=2%3A60&mode=design&t=afgNFybdorZO6cQo-1)

**Images**

The way you'll do this at work is by exporting images directly from Figma — we recommend doing that to practice more. Don't forget to optimize them [here](https://tinypng.com/), so your project loads faster.

Good luck and have fun!

# Spots

A travel guide web project showcasing the best travel spots, hidden gems, top destinations, iconic landmarks, and vacation ideas from around the world. Perfect for travel enthusiasts looking for inspiration and detailed information.

# Personal Profile Page

This is a responsive personal profile web page built with HTML and CSS. It showcases user profile information with an elegant layout, interactive buttons, and mobile-friendly design.

## Live Demo

## Live Demo

[View the deployed site on GitHub Pages](https://Farhatchowdhary.github.io/se_project_spots)

## Technologies Used

- HTML5
- CSS3
- Flexbox
- Media Queries
- Responsive Design Principles

## Features

### Cards Container

- The cards container uses **CSS Grid** to layout cards in multiple columns with a fixed card width of 413px on desktop screens.
- Grid gaps provide consistent horizontal (40px) and vertical (20px) spacing between cards.
- The grid adapts responsively using media queries: on screens 630px or narrower, it switches card width to 288px to fit smaller devices.
- Side margins (20px) are added on mobile for better padding within the viewport.
- This approach ensures cards remain centered and evenly spaced across different screen sizes.
  If you want, I can help you combine this with your previous card section CSS explanation for a full Cards section in your README! Would you like that?

### Page Container (Mobile Styles)

- On screens 630px wide or smaller, the `.page` container’s background color changes to a soft off-white (#fcf5ef).
- Commented out properties (`max-width` and `max-height` set to `fit-content`) indicate potential adjustments for content sizing but are currently inactive.
- This helps create a subtle background shift on mobile devices for better visual separation.

### Profile Section

- Displays a profile image, name, subtitle, and buttons
- Responsive layout: flex on desktop, column layout on mobile
- Hover effect on buttons for interactivity
- Styled with subtle background colors and spacing

### Cards Section

- Grid-based layout showing multiple cards with images and text
- Each card contains an image, heading, and description
- Uses CSS Grid for structure and transitions for hover effects
- Mobile-friendly: cards stack on smaller screens

### Header Section

- The header uses **Flexbox** to center its content horizontally.
- It has a white background color for a clean, minimal look.
- A subtle bottom border is applied for separation (though the exact thickness/color might need clarification).
- Text color is set to white with 80% opacity (this might make text nearly invisible on a white background—consider adjusting for contrast).
- Font size is small (10px), suitable for subtle info like a tagline or small print.
- Vertical padding of 10px adds breathing space on top.
- The margin syntax `margin: 0, auto;` should be fixed to `margin: 0 auto;` to properly center horizontally.

### Main Content Section

- The main content area has a soft background color (#fcf5e5) to create a warm, inviting look.
- On larger screens, it centers its content horizontally (though `display: flex;` is commented out).
- For screens 630px wide and below (mobile), it enables Flexbox layout and centers content horizontally with `justify-content: center`.
- Additionally, it adds a 20px margin on all sides for proper spacing on small devices, preventing content from touching the edges.

### Footer Section

- Simple, clean footer with centered copyright
- Responsive and consistent styling
- Uses Flexbox for centering content horizontally

## Screenshots

## images

![A very long bridge - desktop](./images/a-very-long-bridge.jpg)
![An outdoor cafe -desktop](./images/an-outdoor-cafe.jpg)
![Avatar- desktop](./images/avatar.jpg)
![Footer](./images/Footer.png)
![Group 2- Desktop](./images/Group2.svg)
![Heart - Desktop](./images/heart.png)  
![Logo - Desktop](./images/Logo.svg)  
![Mountain - Desktop](./images/mountain.jpg)
![Plus - Desktop](./images/plus.svg)  
![Restaurant - Desktop](./images/restaurant.jpg)
![Tunnel - Desktop](./images/tunnel.jpg)
![Thorens - Desktop](./images/val-thorens.jpg)

![A very long bridge - mobile](./images/a-very-long-bridge.jpg)
![An outdoor cafe - mobile](./images/an-outdoor-cafe.jpg)
![Avatar - mobile](./images/avatar.jpg)
![Footer - mobile](./images/Footer.png)
![Group 2 -  mobile](./images/Group2.svg)
![Heart - mobile](./images/heart.png)  
![Logo - mobile](./images/Logo.svg)  
![Mountain - mobile](./images/mountain.jpg)
![Plus - mobile](./images/plus.svg)  
![Restaurant - mobile](./images/restaurant.jpg)
![Tunnel- mobile](./images/tunnel.jpg)
![Thorens - mobile](./images/val-thorens.jpg)

## To-Do

- [ ] Add animations on scroll
- [ ] Improve accessibility for screen readers
- [ ] Add dark mode toggle
- [ ] Write tests for responsive behavior

## Author

Created by **Farhat Choudhary**  
[Deployed Link](https://github.com/farhatchowdhary/se_project_spots)
