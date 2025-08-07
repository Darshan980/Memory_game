# 🧠 Memory Game

A modern, feature-rich memory card matching game built with vanilla HTML, CSS, and JavaScript. Test your memory skills by matching pairs of cards in the shortest time with the fewest moves!

![Memory Game Screenshot](https://img.shields.io/badge/Status-Complete-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🎮 Live Demo

[click here]()

## ✨ Features

### 🎯 Core Gameplay
- **Card Matching**: Click to flip cards and find matching pairs
- **Smart Game Logic**: Cards stay flipped when matched, flip back when wrong
- **Move Counter**: Tracks the number of card pairs flipped
- **Timer**: Starts counting from your first move
- **Win Detection**: Automatically detects when all pairs are matched

### 🎁 Advanced Features
- **🏆 Leaderboard**: Top 5 scores saved locally with localStorage
- **🌙 Dark/Light Theme**: Toggle between themes with persistent storage
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🎨 Smooth Animations**: 3D card flips, shake effects, and hover animations
- **🔄 Multiple Difficulties**: Choose between 4x4 (8 pairs) or 6x6 (18 pairs) grids
- **⌨️ Keyboard Shortcuts**: Press 'R' to restart, 'T' to toggle theme
- **💾 Auto-Save**: Scores are automatically saved when you complete a game
- **🎵 Sound Effects**: Web Audio API generated sounds for interactions

### 🎨 Visual Design
- **Modern UI**: Clean, professional interface with shadows and gradients
- **Emoji Cards**: Cute animal emojis (🐶🐱🐼🐵🦊🐸🐯🐨 and more)
- **Animated Feedback**: Visual feedback for matches, mismatches, and wins
- **Theme Support**: Complete dark/light mode with CSS custom properties

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/memory-game.git
   cd memory-game
   ```

2. **Open the game**
   ```bash
   # Simply open index.html in your browser
   open index.html
   # or
   double-click index.html
   ```

3. **Start playing!**
   - Click any card to start the timer
   - Click a second card to make a pair
   - Match all pairs to win!

## 🎯 How to Play

1. **Start**: Click any card to begin and start the timer
2. **Match**: Click two cards to see if they match
3. **Win**: Match all pairs to complete the game
4. **Save**: Enter your name to save your score to the leaderboard
5. **Compete**: Try to beat your best time and moves!

### 🏆 Scoring System
- **Primary**: Fastest completion time wins
- **Secondary**: Fewest moves as tiebreaker
- **Leaderboard**: Top 5 scores displayed with medals 🥇🥈🥉

## 🛠️ Technical Details

### 📁 Project Structure
```
memory-game/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── script.js           # Game logic and functionality
└── README.md          # This file
```

### 🔧 Technologies Used
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript ES6+**: Object-oriented programming with classes
- **localStorage**: Persistent data storage for scores and themes
- **Web Audio API**: Dynamic sound effect generation

### 🎨 CSS Features
- **CSS Custom Properties**: Theme system with CSS variables
- **CSS Grid**: Responsive card layouts
- **CSS Transforms**: 3D card flip animations
- **CSS Animations**: Smooth transitions and effects
- **Media Queries**: Mobile-first responsive design

### 💻 JavaScript Architecture
- **Class-based**: Clean OOP structure with MemoryGame class
- **Event-driven**: Efficient event handling and delegation
- **State management**: Proper game state tracking
- **Error handling**: Robust error handling for edge cases

## 🎮 Game Controls

### 🖱️ Mouse Controls
- **Click cards**: Flip and match cards
- **Click buttons**: Restart, save score, change difficulty
- **Click theme toggle**: Switch between light/dark modes

### ⌨️ Keyboard Shortcuts
- **R**: Restart the current game
- **T**: Toggle between light and dark themes
- **Enter**: Save score when modal is open
- **Escape**: Close modal (browser default)

## 🎨 Customization

### 🔧 Easy Modifications

**Change Card Symbols:**
```javascript
// In script.js, modify the symbols object
this.symbols = {
    4: ['🐶', '🐱', '🐼', '🐵', '🦊', '🐸', '🐯', '🐨'],
    6: ['🐶', '🐱', '🐼', '🐵', '🦊', '🐸', '🐯', '🐨', '🐷', '🐮', '🐻', '🐰', '🦁', '🐺', '🐹', '🐭', '🦝', '🦔']
};
```

**Modify Colors:**
```css
/* In style.css, change CSS custom properties */
:root {
    --primary-color: #4a90e2;  /* Change primary color */
    --success-color: #28a745;  /* Change success color */
    --bg-color: #f0f2f5;       /* Change background */
}
```

**Add New Difficulty:**
```javascript
// Add new grid size in initializeGame()
if (this.difficulty === 8) {
    this.totalPairs = 32; // 8x8 grid
}
```

## 📱 Browser Compatibility

- ✅ **Chrome** 60+
- ✅ **Firefox** 55+
- ✅ **Safari** 12+
- ✅ **Edge** 79+
- ✅ **Mobile browsers** (iOS Safari, Chrome Mobile)

## 🔧 Development

### 🚀 Local Development
```bash
# No build process required!
# Just open index.html in your browser

# For live reloading during development:
npx live-server
```

### 🧪 Testing
- Test on different screen sizes
- Verify localStorage functionality
- Check theme switching
- Test keyboard shortcuts
- Validate responsive design



### 💡 Ideas for Contributions
- Add more card themes (numbers, letters, colors)
- Implement difficulty levels with different grid sizes
- Add multiplayer functionality
- Create card flip sound effects
- Add achievements system
- Implement card shuffle animations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

t

## 🐛 Known Issues

- None currently! 🎉

