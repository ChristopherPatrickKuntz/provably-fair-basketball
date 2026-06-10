export const SEASON_PHASES = [
  {
    id: 'phase1',
    name: 'Phase 1: Foundations',
    weeks: [
      {
        id: 'tryouts',
        name: 'Tryouts',
        focus: 'Evaluate players. Set rosters. No teaching.',
        language: 'Observe and assess',
        skills: ['Use Tryout Evaluation Tool', 'Rate 6 domains', 'Document observations'],
        practicePlans: []
      },
      {
        id: 'week1',
        name: 'Week 1: Movement & Footwork',
        focus: 'Learn how to move with purpose',
        language: 'Move with purpose',
        skills: ['Listening & structure', 'Dribbling eyes up', 'Basic passing', 'Layup footwork', 'Spacing', 'Defensive stance', 'Pivots'],
        practicePlans: [
          {
            day: 1,
            blocks: [
              { time: '0:00', type: 'Warm-Up', activity: 'Shooting Flow', details: 'Players shoot form shots as they arrive. Close range, no pressure.', drillId: 'form-shooting' },
              { time: '0:10', type: 'Huddle', activity: 'Intro: How We Practice', details: 'Explain structure. "When I talk, balls stop." Set expectations.' },
              { time: '0:15', type: 'Skill', activity: 'Pivot Foundations', details: 'No ball first → add ball → catch/freeze/pivot', drillId: 'pivot-basics' },
              { time: '0:30', type: 'Game', activity: 'Pivot Tag', details: 'All have balls. 2-3 taggers. Pivot to escape. No dribbling.', drillId: 'pivot-tag' },
              { time: '0:40', type: 'Skill', activity: 'Layup Lines (Right)', details: 'Two lines. Pass, layup, rebound, switch lines. Right side only today.', drillId: 'basic-layup-lines' },
              { time: '0:50', type: 'Skill', activity: 'Partner Passing', details: 'Chest pass, bounce pass. 10 each. Focus on targets & stepping into pass.', drillId: 'partner-passing' },
              { time: '1:00', type: 'Game', activity: '3v3 Half Court', details: 'No dribble rule. Must pass to move.', drillId: '2v2-no-dribble' },
              { time: '1:15', type: 'Scrimmage', activity: '5v5', details: 'Stop for teaching moments. Praise effort and listening.' },
              { time: '1:25', type: 'Huddle', activity: 'Close', details: '"What did we learn?" Reinforce: move with purpose.' }
            ]
          },
          {
            day: 2,
            blocks: [
              { time: '0:00', type: 'Warm-Up', activity: 'Shooting Flow', details: 'Form shots, layup lines start naturally', drillId: 'form-shooting' },
              { time: '0:10', type: 'Huddle', activity: 'Review: Pivots', details: 'Quick demo. "Show me a front pivot. Show me reverse."' },
              { time: '0:15', type: 'Skill', activity: 'Dribble Control', details: 'Stationary: right hand, left hand, crossover. Eyes up.', drillId: 'stationary-dribble' },
              { time: '0:25', type: 'Skill', activity: 'Dribble Weave', details: 'Cones in zig-zag. Right hand down, left hand back. Switch halfway.', drillId: 'cone-weave' },
              { time: '0:35', type: 'Game', activity: 'Dribble Knockout', details: 'Half court. Everyone dribbling. Knock others\' balls out. Last one standing wins.', drillId: 'dribble-knockout' },
              { time: '0:45', type: 'Skill', activity: 'Defensive Stance', details: 'Teach stance: butt down, hands active, feet wide. Hold 10 sec.', drillId: 'defensive-stance' },
              { time: '0:50', type: 'Skill', activity: 'Defensive Slides', details: 'Baseline to baseline. Slide, don\'t cross feet.', drillId: 'defensive-slides' },
              { time: '1:00', type: 'Game', activity: '1v1 Defensive', details: 'Offensive player walks. Defender stays in front. No ball yet.', drillId: '1v1-closeout' },
              { time: '1:10', type: 'Scrimmage', activity: '5v5', details: 'Emphasize defensive stance when ball is elsewhere.' },
              { time: '1:25', type: 'Huddle', activity: 'Close', details: 'Highlight one player who showed great effort.' }
            ]
          }
        ]
      },
      {
        id: 'week2',
        name: 'Week 2: Pass & Move',
        focus: 'Pass and move to space',
        language: 'Pass and move to space',
        skills: ['Pass → cut', 'Pass → space', 'Jump stops', 'Both-side layups', 'Triple threat', 'One-dribble drive', 'Help defense'],
        practicePlans: [
          {
            day: 1,
            blocks: [
              { time: '0:00', type: 'Warm-Up', activity: 'Shooting Flow', details: 'Form shots, partner passing while waiting', drillId: 'form-shooting' },
              { time: '0:10', type: 'Huddle', activity: 'Intro: Pass Then Move', details: 'Demo: pass and stand = bad. Pass and cut/space = good.' },
              { time: '0:15', type: 'Skill', activity: 'Pass & Cut Lines', details: 'Three lines. Middle passes to wing, cuts to basket, receives pass, layup.', drillId: 'pass-cut-lines' },
              { time: '0:30', type: 'Skill', activity: 'Pass & Space', details: 'Same setup. After passing, fill an empty spot instead of cutting.' },
              { time: '0:40', type: 'Game', activity: '3v3 Pass & Move', details: 'Must move after every pass. Stand still = turnover.', drillId: '3v3-one-dribble' },
              { time: '0:55', type: 'Skill', activity: 'Layup Lines (Left Side)', details: 'Add left-side layups. Left foot, left hand.', drillId: 'basic-layup-lines' },
              { time: '1:05', type: 'Skill', activity: 'Jump Stop Practice', details: 'Dribble → two-foot stop → pivot → pass.' },
              { time: '1:15', type: 'Scrimmage', activity: '5v5', details: 'Call out "move!" when players stand after passing.' },
              { time: '1:25', type: 'Huddle', activity: 'Close', details: '"Pass and move to space."' }
            ]
          },
          {
            day: 2,
            blocks: [
              { time: '0:00', type: 'Warm-Up', activity: 'Shooting Flow', details: '', drillId: 'form-shooting' },
              { time: '0:10', type: 'Huddle', activity: 'Review', details: 'Quick pass & cut demo. Quick pass & space demo.' },
              { time: '0:15', type: 'Skill', activity: 'Triple Threat', details: 'Catch → pivot → triple threat position. Shot, pass, or drive options.' },
              { time: '0:25', type: 'Skill', activity: 'One-Dribble Drive', details: 'From triple threat: one hard dribble → layup. Right side, then left.' },
              { time: '0:40', type: 'Game', activity: '2v2 One-Dribble', details: 'Max one dribble per catch. Forces passing and cutting.', drillId: '3v3-one-dribble' },
              { time: '0:55', type: 'Skill', activity: 'Help Defense Intro', details: 'Show help position. "See ball, see man."' },
              { time: '1:05', type: 'Game', activity: 'Shell Drill (4v4)', details: 'Pass around perimeter. Defense moves on every pass. No shots yet.', drillId: 'shell-drill' },
              { time: '1:15', type: 'Scrimmage', activity: '5v5', details: 'Praise players who move after passing.' },
              { time: '1:25', type: 'Huddle', activity: 'Close', details: 'Last practice before break. "Remember: pass and move."' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'break',
    name: 'Mid-Season Break',
    breakWeeks: 2,
    isBreak: true
  },
  {
    id: 'phase2',
    name: 'Phase 2: Half-Court Team',
    weeks: [
      {
        id: 'week3',
        name: 'Week 3: Reset & Rebuild',
        focus: 'Get our habits back',
        language: 'Get our habits back',
        skills: ['Reinstall spacing', 'Rebuild timing', 'Cutting habits', 'Transition lanes', 'Shot selection'],
        practicePlans: [
          {
            day: 1,
            blocks: [
              { time: '0:00', type: 'Warm-Up', activity: 'Shooting Flow', details: 'Rust-buster. Extra form shots.', drillId: 'form-shooting' },
              { time: '0:10', type: 'Huddle', activity: 'Welcome Back', details: '"We\'re going to rebuild our habits. Be patient with yourself."' },
              { time: '0:15', type: 'Skill', activity: 'Pivot Review', details: 'Front pivot, reverse pivot. Quick reps.', drillId: 'pivot-basics' },
              { time: '0:20', type: 'Skill', activity: 'Pass & Cut Review', details: 'Three-line drill. Pass, cut, layup.', drillId: 'pass-cut-lines' },
              { time: '0:30', type: 'Skill', activity: 'Spacing Walk-Through', details: '5 players. Walk through offensive positions. "Don\'t crowd."' },
              { time: '0:40', type: 'Game', activity: '3v3 Spacing Focus', details: 'If two offensive players are within arm\'s length, whistle. Reset.', drillId: '3v3-one-dribble' },
              { time: '0:55', type: 'Skill', activity: 'Transition Lanes', details: '5 lanes. Run wide, run early. Walk through first.', drillId: '5v0-transition' },
              { time: '1:05', type: 'Game', activity: '5v0 Transition', details: 'Rebound → outlet → fill lanes → layup. No defense.', drillId: '5v0-transition' },
              { time: '1:15', type: 'Scrimmage', activity: '5v5', details: 'Stop to fix spacing when needed.' },
              { time: '1:25', type: 'Huddle', activity: 'Close', details: '"Habits come back with reps."' }
            ]
          },
          {
            day: 2,
            blocks: [
              { time: '0:00', type: 'Warm-Up', activity: 'Shooting Flow', details: '', drillId: 'form-shooting' },
              { time: '0:10', type: 'Huddle', activity: 'Focus: Shot Selection', details: '"Good shots vs. bad shots. What\'s a good shot for us?"' },
              { time: '0:15', type: 'Skill', activity: 'Layups (Both Sides)', details: 'Alternate right and left.', drillId: 'basic-layup-lines' },
              { time: '0:25', type: 'Skill', activity: 'Spot Shooting', details: 'Pairs. 5 shots from elbow, 5 from block, 5 from wing.', drillId: 'spot-shooting' },
              { time: '0:40', type: 'Game', activity: 'Shot Selection Game', details: '3v3. Layups = 2 pts. Mid-range = 1 pt. Three-pointers = 0 pts.' },
              { time: '0:55', type: 'Skill', activity: 'Transition (5v0)', details: 'Add speed. Outlet, fill, finish.', drillId: '5v0-transition' },
              { time: '1:05', type: 'Game', activity: '5v5 Transition', details: 'Start from made basket. Outlet and go.' },
              { time: '1:15', type: 'Scrimmage', activity: '5v5 Full', details: 'Praise good shot selection and spacing.' },
              { time: '1:25', type: 'Huddle', activity: 'Close', details: '"We take good shots. We trust each other."' }
            ]
          }
        ]
      },
      {
        id: 'week4',
        name: 'Week 4: Transition & Man Defense',
        focus: 'Run with purpose, defend with discipline',
        language: 'Run with purpose, defend with discipline',
        skills: ['Outlet structure', 'Run wide, run early', 'Help & recover', 'Staying in front', 'Inbound spacing'],
        practicePlans: [
          {
            day: 1,
            blocks: [
              { time: '0:00', type: 'Warm-Up', activity: 'Shooting Flow', details: '', drillId: 'form-shooting' },
              { time: '0:10', type: 'Huddle', activity: 'Focus: Transition', details: '"When we get the ball, we GO."' },
              { time: '0:15', type: 'Skill', activity: 'Outlet Pass Drill', details: 'Rebounder outlets to guard. Guard catches on the move.' },
              { time: '0:25', type: 'Skill', activity: '3-Man Weave', details: 'Classic drill. Pass and go behind. Finish with layup.', drillId: '3-man-weave' },
              { time: '0:35', type: 'Skill', activity: '5-Lane Break', details: 'Walk through lanes. Who fills where.', drillId: '5v0-transition' },
              { time: '0:45', type: 'Game', activity: '5v0 → 5v2', details: 'Start 5v0 transition. Add 2 defenders waiting at other end.', drillId: '5v0-transition' },
              { time: '1:00', type: 'Skill', activity: 'Man Defense: Stay in Front', details: '1v1. Offense walks, then jogs. Defense mirrors.', drillId: 'zigzag-slides' },
              { time: '1:10', type: 'Game', activity: '1v1 Live', details: 'Check ball at top. 2 dribbles max. Offense scores or defense gets stop.', drillId: '1v1-closeout' },
              { time: '1:20', type: 'Scrimmage', activity: '5v5', details: '' },
              { time: '1:25', type: 'Huddle', activity: 'Close', details: '"Run with purpose."' }
            ]
          },
          {
            day: 2,
            blocks: [
              { time: '0:00', type: 'Warm-Up', activity: 'Shooting Flow', details: '', drillId: 'form-shooting' },
              { time: '0:10', type: 'Huddle', activity: 'Focus: Help Defense', details: '"We help each other. Then we recover."' },
              { time: '0:15', type: 'Skill', activity: 'Shell Drill (Help)', details: '4v4. Ball moves. Help shifts. "Show help, recover."', drillId: 'shell-drill' },
              { time: '0:30', type: 'Skill', activity: 'Closeout Drill', details: 'Defender starts in paint. Coach passes to wing. Defender closes out.', drillId: '1v1-closeout' },
              { time: '0:40', type: 'Game', activity: '2v2 Help & Recover', details: 'One ball. When drive happens, help must show.', drillId: '2v2-no-dribble' },
              { time: '0:55', type: 'Skill', activity: 'Inbound Spacing', details: 'Baseline out of bounds. Walk through positions.' },
              { time: '1:05', type: 'Game', activity: 'Inbound vs. Defense', details: '5v5. Practice inbounding against pressure.' },
              { time: '1:15', type: 'Scrimmage', activity: '5v5', details: '' },
              { time: '1:25', type: 'Huddle', activity: 'Close', details: '"Defend with discipline."' }
            ]
          }
        ]
      },
      {
        id: 'week5',
        name: 'Week 5: Game IQ & Advantage',
        focus: 'Find the easy play first',
        language: 'Find the easy play first',
        skills: ['When to drive vs. pass', 'Passing under pressure', 'Cutting with purpose', 'Rebounding assignments', 'Off-ball movement'],
        practicePlans: [
          {
            day: 1,
            blocks: [
              { time: '0:00', type: 'Warm-Up', activity: 'Shooting Flow', details: '', drillId: 'form-shooting' },
              { time: '0:10', type: 'Huddle', activity: 'Focus: Reading the Defense', details: '"If they give you the lane, drive. If they help, pass."' },
              { time: '0:15', type: 'Skill', activity: 'Drive & Kick', details: '2v1. Driver attacks, kicks to open shooter if help comes.' },
              { time: '0:30', type: 'Skill', activity: 'Pass Fake Drill', details: 'Catch, shot fake, pass fake, then make the right play.', drillId: 'partner-passing' },
              { time: '0:40', type: 'Game', activity: '3v3 Read & React', details: 'No set plays. Read the defense. Make the easy play.', drillId: '3v3-one-dribble' },
              { time: '0:55', type: 'Skill', activity: 'Rebounding Position', details: 'Box out fundamentals. Contact, wide base, find the ball.' },
              { time: '1:05', type: 'Game', activity: 'Rebounding Wars', details: '3v3. Coach shoots. 1 point for offensive rebound, 1 for defensive.' },
              { time: '1:15', type: 'Scrimmage', activity: '5v5', details: 'Pause to ask "what did you see?" after good/bad decisions.' },
              { time: '1:25', type: 'Huddle', activity: 'Close', details: '"Find the easy play first."' }
            ]
          }
        ]
      },
      {
        id: 'week6',
        name: 'Week 6: Clean-Up & Press Break',
        focus: 'Stay calm when it gets fast',
        language: 'Stay calm when it gets fast',
        skills: ['Rhythm of movement', 'Footwork under pressure', 'Passing decisions at speed', 'Press break spacing'],
        practicePlans: [
          {
            day: 1,
            blocks: [
              { time: '0:00', type: 'Warm-Up', activity: 'Shooting Flow', details: '', drillId: 'form-shooting' },
              { time: '0:10', type: 'Huddle', activity: 'Focus: Handling Pressure', details: '"They\'ll speed you up. We stay calm."' },
              { time: '0:15', type: 'Skill', activity: 'Pivot Under Pressure', details: 'Partner applies light pressure. Pivot away, find outlet.', drillId: 'pivot-basics' },
              { time: '0:30', type: 'Skill', activity: 'Press Break Positions', details: 'Walk through 1-2-2 press break. Inbounder, outlets, middle, deep.', drillId: 'press-break' },
              { time: '0:45', type: 'Skill', activity: 'Press Break (5v0)', details: 'Walk through vs. no defense. Then jog through.', drillId: 'press-break' },
              { time: '1:00', type: 'Game', activity: 'Press Break (5v3)', details: '3 defenders apply pressure. Offense breaks to half court.', drillId: 'press-break' },
              { time: '1:15', type: 'Scrimmage', activity: '5v5', details: 'Other team presses. Practice staying calm.' },
              { time: '1:25', type: 'Huddle', activity: 'Close', details: '"Stay calm when it gets fast."' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phase3',
    name: 'Phase 3: Defensive Expansion',
    ruleChange: 'League rules now allow zone defense and full-court press.',
    weeks: [
      {
        id: 'week7',
        name: 'Week 7: Full-Court Press',
        focus: 'Pressure without panicking',
        language: 'Pressure without panicking',
        skills: ['Press positions', 'Controlled traps', 'Rotation timing', 'No-foul principles', 'Applying vs. breaking press'],
        practicePlans: [
          {
            day: 1,
            blocks: [
              { time: '0:00', type: 'Warm-Up', activity: 'Shooting Flow', details: '' },
              { time: '0:10', type: 'Huddle', activity: 'Intro: Our Press', details: '"We\'re adding pressure. Not chaos. Controlled traps."' },
              { time: '0:15', type: 'Skill', activity: 'Press Positions', details: 'Walk through 1-2-1-1. Who goes where.' },
              { time: '0:30', type: 'Skill', activity: 'Trap Drill', details: '2v1 in corner. Trap, mirror, no foul.' },
              { time: '0:40', type: 'Skill', activity: 'Press (5v0)', details: 'Walk through rotations. Ball moves, defense rotates.' },
              { time: '0:55', type: 'Game', activity: 'Press (5v5)', details: 'Install press. Rotate pressing and breaking.' },
              { time: '1:15', type: 'Scrimmage', activity: '5v5', details: 'Press first two possessions of each "half."' },
              { time: '1:25', type: 'Huddle', activity: 'Close', details: '"Pressure without panicking."' }
            ]
          }
        ]
      },
      {
        id: 'week8',
        name: 'Week 8: Zone Defense',
        focus: 'Move together. Protect the middle.',
        language: 'Move together. Protect the middle.',
        skills: ['2-3 zone positions', 'Shifting as one unit', 'Protecting high post', 'Corner coverage', 'Zone rebounding'],
        practicePlans: [
          {
            day: 1,
            blocks: [
              { time: '0:00', type: 'Warm-Up', activity: 'Shooting Flow', details: '' },
              { time: '0:10', type: 'Huddle', activity: 'Intro: Zone Defense', details: '"Zone = protect areas, not players. We move as one."' },
              { time: '0:15', type: 'Skill', activity: 'Zone Positions', details: 'Walk through 2-3. Top two, bottom three.' },
              { time: '0:30', type: 'Skill', activity: 'Zone Shifts (5v0)', details: 'Coach passes ball around. Zone shifts on every pass.' },
              { time: '0:45', type: 'Skill', activity: 'Zone Shifts (5v5)', details: 'Offense passes (no shots). Defense shifts.' },
              { time: '0:55', type: 'Skill', activity: 'Zone Rebounding', details: '"Find a body, box out." Zone assignments on shots.' },
              { time: '1:10', type: 'Scrimmage', activity: '5v5 Zone Only', details: 'Defense plays 2-3 zone entire scrimmage.' },
              { time: '1:25', type: 'Huddle', activity: 'Close', details: '"Move together. Protect the middle."' }
            ]
          }
        ]
      },
      {
        id: 'week9',
        name: 'Week 9: Advanced Press',
        focus: 'Beat pressure with spacing and calm',
        language: 'Beat pressure with spacing and calm',
        skills: ['Soft press vs. hard trap', 'Rotation discipline', 'Breaking through middle', 'When to press/back off'],
        practicePlans: [
          {
            day: 1,
            blocks: [
              { time: '0:00', type: 'Warm-Up', activity: 'Shooting Flow', details: '', drillId: 'form-shooting' },
              { time: '0:10', type: 'Huddle', activity: 'Review Press', details: 'Quick walk-through of press positions.' },
              { time: '0:15', type: 'Skill', activity: 'Soft Press Drill', details: 'Contain, don\'t trap. Force sideline, stay balanced.' },
              { time: '0:25', type: 'Skill', activity: 'Hard Trap Drill', details: 'Corner trap. Two defenders, mirror feet, trace the ball.' },
              { time: '0:40', type: 'Game', activity: 'Press Decision Game', details: 'Coach signals "SOFT" or "TRAP" mid-possession.' },
              { time: '0:55', type: 'Skill', activity: 'Press Break: Middle Option', details: 'Practice hitting the middle man vs. press.', drillId: 'press-break' },
              { time: '1:10', type: 'Scrimmage', activity: '5v5', details: 'Alternate pressing and breaking each possession.' },
              { time: '1:25', type: 'Huddle', activity: 'Close', details: '"Read the situation. Pressure with purpose."' }
            ]
          }
        ]
      },
      {
        id: 'week10',
        name: 'Week 10: Movement Under Pressure',
        focus: 'Smart movement beats fast movement',
        language: 'Smart movement beats fast movement',
        skills: ['Backdoor cuts', 'Kick-ups when driven at', 'Drift shooting', 'Post touches', 'Movement principles'],
        practicePlans: [
          {
            day: 1,
            blocks: [
              { time: '0:00', type: 'Warm-Up', activity: 'Shooting Flow', details: '', drillId: 'form-shooting' },
              { time: '0:10', type: 'Huddle', activity: 'Focus: Smart Movement', details: '"Defenders follow the ball. Use that."' },
              { time: '0:15', type: 'Skill', activity: 'Backdoor Cuts', details: 'When defender overplays, go backdoor.' },
              { time: '0:30', type: 'Skill', activity: 'Drift & Spot-Up', details: 'As drive happens, drift to open spots.', drillId: 'spot-shooting' },
              { time: '0:45', type: 'Game', activity: '3v3 Cutting Only', details: 'No dribbling. Only cutting and passing.', drillId: '3v3-one-dribble' },
              { time: '1:00', type: 'Skill', activity: 'Post Touch Drill', details: 'Entry pass to post, kick-out, shot.' },
              { time: '1:15', type: 'Scrimmage', activity: '5v5', details: 'Focus on movement without the ball.' },
              { time: '1:25', type: 'Huddle', activity: 'Close', details: '"Smart movement beats fast movement."' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phase4',
    name: 'Phase 4: Playoff Prep',
    weeks: [
      {
        id: 'week11',
        name: 'Week 11: Situational & Identity',
        focus: 'Know who we are when the game is on the line',
        language: 'This is who we are',
        skills: ['End-of-game offense', 'Protecting leads', 'Foul-to-give rules', 'Team identity'],
        practicePlans: [
          {
            day: 1,
            blocks: [
              { time: '0:00', type: 'Warm-Up', activity: 'Shooting Flow', details: '', drillId: 'form-shooting' },
              { time: '0:10', type: 'Huddle', activity: 'Focus: Late-Game', details: '"Championship games are won in the last 2 minutes."' },
              { time: '0:15', type: 'Skill', activity: 'Down 3, 30 Seconds', details: 'Practice quick 3-point look. Attack closeout or kick.' },
              { time: '0:30', type: 'Skill', activity: 'Up 3, Hold Ball', details: 'Burn clock, force fouling. Make free throws.' },
              { time: '0:45', type: 'Game', activity: 'Situation Reps', details: 'Set different scenarios. 2 min left, various leads.' },
              { time: '1:05', type: 'Skill', activity: 'Foul-to-Give', details: 'When and how to use it. No shooting fouls.' },
              { time: '1:15', type: 'Scrimmage', activity: '5v5 Last 2 Min', details: 'Start with 2:00 on clock. Random score differential.' },
              { time: '1:25', type: 'Huddle', activity: 'Close', details: '"This is who we are. Trust each other."' }
            ]
          }
        ]
      },
      {
        id: 'week12',
        name: 'Week 12: Sharpening',
        focus: 'Fine-tune everything',
        language: 'Sharp and ready',
        skills: ['Review all concepts', 'Game-speed reps', 'Mental preparation'],
        practicePlans: [
          {
            day: 1,
            blocks: [
              { time: '0:00', type: 'Warm-Up', activity: 'Full Warm-Up', details: 'Everything we do before games.', drillId: 'form-shooting' },
              { time: '0:15', type: 'Skill', activity: 'Layup Perfection', details: 'Both hands. No misses. Focus.', drillId: 'basic-layup-lines' },
              { time: '0:25', type: 'Skill', activity: 'Passing Crispness', details: 'Sharp passes. No lazy balls.', drillId: 'partner-passing' },
              { time: '0:35', type: 'Skill', activity: 'Shell Drill Review', details: 'Defensive rotations. Everyone sharp.', drillId: 'shell-drill' },
              { time: '0:50', type: 'Game', activity: '5v5 Game Speed', details: 'Everything at game intensity.' },
              { time: '1:10', type: 'Skill', activity: 'Free Throws Under Pressure', details: 'Make 2 in a row before you leave the line.' },
              { time: '1:20', type: 'Huddle', activity: 'Close', details: '"We\'re ready. Now stay sharp."' }
            ]
          }
        ]
      },
      {
        id: 'final',
        name: 'Final Week: Light & Confident',
        focus: 'Trust your preparation',
        language: 'Trust the work',
        skills: ['Light practice', 'Confidence building', 'Rest and recovery'],
        practicePlans: [
          {
            day: 1,
            blocks: [
              { time: '0:00', type: 'Warm-Up', activity: 'Shooting Flow', details: 'Easy shooting. Rhythm.', drillId: 'form-shooting' },
              { time: '0:15', type: 'Skill', activity: 'Walk-Through Only', details: 'No running. Just positions and reminders.' },
              { time: '0:30', type: 'Game', activity: 'Fun Competition', details: 'Knockout, H-O-R-S-E, shooting games.' },
              { time: '0:50', type: 'Huddle', activity: 'Team Talk', details: 'What does this team mean to you?' },
              { time: '1:00', type: 'Huddle', activity: 'Close', details: '"Trust the work. We\'re ready."' }
            ]
          }
        ]
      }
    ]
  }
];

export const LEAGUE_RULES = {
  firstHalf: {
    title: 'First Half of Season',
    allowed: ['Man-to-man defense'],
    required: ['Retreat to half on dead balls'],
    notAllowed: ['Full-court press', 'Zone defense']
  },
  secondHalf: {
    title: 'Second Half of Season',
    allowed: ['Full-court man', 'Zone defense', 'Pressing', 'All standard rules']
  },
  fairPlay: {
    title: 'Fair Play (All Season)',
    rules: [
      'Minimum 1 shift played per player',
      'Minimum 2 shifts sat per player (8 min)',
      'First half: strictly enforced',
      'Second half (A-league): coach discretion after minimums'
    ]
  },
  mercy: {
    title: 'Mercy Rules',
    rules: [
      'Leading by 20+: must play half-court defense',
      'Leading by 30+: clock freezes'
    ]
  }
};
