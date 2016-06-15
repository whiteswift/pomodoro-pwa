
# Intro - What is Pomodoro?
- this talk will be a mix of a technology showcase and productivity tool.
- I've been working on a small PWA project called Pomodoro
- Pomodoro means tomato in the language of our evil paymasters
- Pomododro came in handy outside of work at uni when work time was unstructured
  - Work in small bursts - Guard against distractions, keep concentrated for an overall longer period of time. Useful for hack day

# Technologies used
- I'm using:
  - PWA features
  - Service worker gets by without https on localhost
  - Caches this page and other things like images and javascript
  - Show that it works offline
  - Debugging in Chrome canary
  - Add to homescreen with manifest file - adds a splash screen and


- vmin vmax
- unicode emojis everywhere - in the title too
- Open dev tools and press CMD + shift + P

# Problems
- Tried web push but didn't work, used desktop notifications instead (not essential in this case)
- Service worker needs a page secured with SSL otherwise it won't work. It will work locally on localhost or 127.0.0.1 without encryption. A static page on Github only gets you so far until you want to use a manifest file.
- Authentication error - setting ignore authorisation flags in chrome://flags
- Can't use Python server with SSL for SW
- Talk about London technology week
- Streams

Event listeners removed from image - including the countdown
set invisible div to have sound events attached
event listeners on button - DONT want.
- Quick uppercasing
