Testing and Bug Fixing

During the testing phase, several issues were identified and resolved to improve gameplay and user experience.
1. Enemy Pathfinding Issue
   
Problem: The angler fish enemy frequently became stuck inside maze walls after the game started, preventing it from effectively chasing the player.
Solution: The enemy movement system was revised by improving the pathfinding logic. The enemy now continuously recalculates its route towards the player, allowing it to navigate around walls and obstacles correctly without becoming trapped.

3. Maze Navigation and Exit Visibility

Problem: The maze paths were unclear, making navigation difficult. In addition, the final exit was not easily distinguishable from the rest of the maze.
Solution: The maze layout and visual design were improved by widening paths and enhancing the appearance of the exit door. Labels and visual indicators were added to help players understand their objective and navigate more effectively.

4. Cybersecurity Questions Not Appearing

Problem: The cybersecurity challenge questions did not appear when the player reached a locked door, preventing progression through the game.
Solution: Collision and proximity detection for doors were updated. Questions now automatically appear when the player reaches or stands adjacent to a locked door, ensuring that educational content is triggered correctly.

5. Missing Login and Registration System

Problem: The game originally lacked a login and registration system, making it impossible to store player information or track progress.
Solution: A login and registration interface was developed using HTML, CSS and JavaScript. User details are stored locally, allowing players to register, log in, and access the game through a structured entry system.

6. Door 4 Question Glitch

Problem: When attempting the cybersecurity question at Door 4, the game occasionally froze, causing the player to lose progress.
Solution: The question handling system was debugged and event conflicts were removed. The modal window now opens and closes correctly, allowing the player to answer questions and continue gameplay without interruption.

7. Time Limit Issues

Problem: The game timer was not functioning consistently during early testing, resulting in inaccurate gameplay timing.
Solution: A fixed timer system was implemented and synchronized with the game loop. The timer now updates correctly and provides a consistent challenge throughout the game.
Result
After implementing these fixes, the game became more stable, user-friendly, and educational. Players can now navigate the maze, answer cybersecurity questions, avoid the enemy, and complete the game as intended.

8. Player Movement Occasionally Clipped into Walls

Problem: When multiple movement keys were pressed simultaneously, the player could partially overlap with wall tiles.
Solution: Improved collision detection by checking all corner points of the player's hitbox before allowing movement.

9. Modal Windows Could Be Opened Multiple Times

Problem: Standing near a door sometimes triggered the question popup repeatedly.
Solution: Added a question state check to ensure only one question window can be active at a time.

10. Player Could Reach Exit Before Completing All Doors

Problem: During testing, players could reach the final exit without answering every cybersecurity question.
Solution: Added a validation check requiring all seven doors to be unlocked before the exit becomes accessible.
