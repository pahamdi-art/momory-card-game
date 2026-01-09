# dl_ai_project
we are esi students and this is a vibe coding project of a site that contain a memory card game
participant:
hamdi ahmed islem
boumezioud mohamed riadh

Prompt 1:
Create an HTML-based game menu system with the following requirements:
- Two-page navigation structure
- Main page with a button that opens three options:
  * Settings page
  * Difficulty selection page
  * Themes page
- All functionality must be contained in a single HTML file
- Include CSS styling and JavaScript for interactivity

Prompt 2:
Transform the existing menu system with these enhancements:
- Apply pixel art aesthetic with retro gaming style
- Integrate a fully functional memory card matching game
- Maintain the two-page structure while adding a game page
- Use pixelated fonts, blocky borders, and hard shadows for styling
- Implement card flip mechanics and match detection logic
- Display game statistics (moves counter and timer)
- Include win condition when all pairs are matched

Prompt 3:
Refactor the navigation structure with these changes:
- Merge the "Themes" page into the "Settings" page as a subsection
- Replace the standalone "Themes" button with an "Exit" button on the main menu
- Maintain all theme-switching functionality within the settings page
- Add exit confirmation dialog when the exit button is clicked
- Preserve the pixel art styling throughout all changes

Prompt 4:
Implement advanced gameplay features with the following specifications:

1. Preview System:
   - Show all cards face-up at game start
   - Preview duration scales inversely with difficulty:
     * Easy: 5 seconds
     * Medium: 4 seconds
     * Hard: 3 seconds
     * Extreme: 2 seconds
   - Display countdown timer during preview phase
   - Disable card interaction during preview

2. Move Limitation System:
   - Set maximum moves per difficulty level
   - Implement visual warning system:
     * At 60% of limit: Change stat color to orange (warning state)
     * At 80% of limit: Change stat color to red with pulse animation (danger state)
   - Trigger game over screen when move limit is exceeded

3. Time Limitation System:
   - Set maximum time per difficulty level
   - Apply the same visual warning thresholds as move system
   - Trigger game over screen when time expires

4. Game Over State:
   - Create a "Game Over" screen with pixel art styling
   - Display the failure reason (out of moves or time expired)
   - Provide options to retry the game or return to main menu

5. Difficulty Parameters:
   - Easy: 6 pairs, 20 moves maximum, 120 seconds time limit
   - Medium: 8 pairs, 25 moves maximum, 90 seconds time limit
   - Hard: 12 pairs, 30 moves maximum, 120 seconds time limit
   - Extreme: 15 pairs, 35 moves maximum, 150 seconds time limit

Maintain all existing pixel art styling and ensure smooth transitions between game states.

