export const DRILL_CATEGORIES = [
  { id: 'pivoting', name: 'Pivoting', icon: '🔄' },
  { id: 'passing', name: 'Passing', icon: '🤝' },
  { id: 'dribbling', name: 'Dribbling', icon: '⛹️' },
  { id: 'shooting', name: 'Shooting', icon: '🎯' },
  { id: 'defense', name: 'Defense', icon: '🛡️' },
  { id: 'smallSided', name: 'Small-Sided Games', icon: '🏀' },
  { id: 'team', name: 'Team Drills', icon: '👥' },
  { id: 'conditioning', name: 'Conditioning', icon: '💪' }
];

export const DIFFICULTY_LEVELS = [
  { id: 'beginner', label: 'Beginner', color: '#34C759' },
  { id: 'intermediate', label: 'Intermediate', color: '#FF9500' },
  { id: 'advanced', label: 'Advanced', color: '#FF3B30' }
];

export const QUICK_SESSIONS = [
  {
    id: 'warmup-15',
    name: '15-Min Warm-Up',
    duration: 15,
    description: 'Quick warm-up before games or short practices',
    blocks: [
      { drillId: 'form-shooting', duration: 5, notes: 'Easy shooting to get loose' },
      { drillId: 'stationary-dribble', duration: 5, notes: 'Ball handling wake-up' },
      { drillId: 'partner-passing', duration: 5, notes: 'Quick passing reps' }
    ]
  },
  {
    id: 'skills-30',
    name: '30-Min Skill Session',
    duration: 30,
    description: 'Focused skill work for extra practice',
    blocks: [
      { drillId: 'form-shooting', duration: 5, notes: 'Warm up shots' },
      { drillId: 'cone-weave', duration: 8, notes: 'Ball handling' },
      { drillId: 'basic-layup-lines', duration: 8, notes: 'Finishing at rim' },
      { drillId: 'mikan-drill', duration: 4, notes: 'Close-range touch' },
      { drillId: 'partner-passing', duration: 5, notes: 'Passing accuracy' }
    ]
  },
  {
    id: 'defense-20',
    name: '20-Min Defense Focus',
    duration: 20,
    description: 'Defensive fundamentals intensive',
    blocks: [
      { drillId: 'defensive-stance', duration: 5, notes: 'Stance holds and checks' },
      { drillId: 'defensive-slides', duration: 5, notes: 'Lateral movement' },
      { drillId: 'zigzag-slides', duration: 5, notes: 'Change of direction' },
      { drillId: '1v1-closeout', duration: 5, notes: 'Live closeout reps' }
    ]
  },
  {
    id: 'game-prep-45',
    name: '45-Min Pre-Game',
    duration: 45,
    description: 'Game day warm-up routine',
    blocks: [
      { drillId: 'form-shooting', duration: 10, notes: 'Shooting rhythm' },
      { drillId: 'basic-layup-lines', duration: 10, notes: 'Both sides' },
      { drillId: 'partner-passing', duration: 5, notes: 'Crisp passes' },
      { drillId: '3v3-one-dribble', duration: 10, notes: 'Decision making' },
      { drillId: 'shell-drill', duration: 10, notes: 'Defensive communication' }
    ]
  }
];

export const DRILLS = [
  // PIVOTING
  {
    id: 'pivot-basics',
    category: 'pivoting',
    name: 'Pivot Basics',
    time: '5 min',
    players: 'All',
    difficulty: 'beginner',
    equipment: ['1 ball per player'],
    setup: 'Everyone has a ball. Spread out in half court.',
    steps: [
      '"Show me your pivot foot" — establish anchor foot',
      'Front pivot (90°, 180°) on whistle',
      'Reverse pivot (90°, 180°) on whistle',
      'Alternate: "Front!" "Reverse!" "Front!"'
    ],
    coachingPoints: [
      'Pivot foot stays planted (no sliding)',
      'Stay low, balanced',
      'Ball protected at chest or chin'
    ],
    commonMistakes: [
      'Lifting pivot foot before releasing ball',
      'Standing straight up instead of staying low',
      'Not protecting the ball'
    ],
    progression: 'Add "triple threat!" command — pivot into shot-ready position',
    usedInWeeks: [1, 3, 6]
  },
  {
    id: 'pivot-tag',
    category: 'pivoting',
    name: 'Pivot Tag',
    time: '8 min',
    players: 'All',
    setup: 'Half court. Everyone has a ball. 2-3 players are taggers (no ball).',
    steps: [
      'Taggers try to tag anyone holding a ball',
      'Ball handlers can ONLY pivot to escape (no dribbling)',
      'If tagged, you become a tagger, they get your ball',
      'Last person with a ball wins'
    ],
    coachingPoints: [
      'Must pivot, not jump away',
      'Use front and reverse pivots to escape',
      'Keep ball protected'
    ],
    progression: 'Taggers can move faster'
  },
  // PASSING
  {
    id: 'partner-passing',
    category: 'passing',
    name: 'Partner Passing',
    time: '5 min',
    players: 'Pairs',
    setup: 'Partners face each other, 12-15 feet apart. One ball per pair.',
    steps: [
      'Chest pass: 10 reps each',
      'Bounce pass: 10 reps each',
      'Overhead pass: 10 reps each'
    ],
    coachingPoints: [
      'Step INTO the pass',
      'Thumbs down on follow-through',
      'Receiver shows target hands',
      'Hit partner in chest'
    ],
    progression: 'Add movement - pass while shuffling sideways'
  },
  {
    id: 'pass-cut-lines',
    category: 'passing',
    name: 'Pass & Cut Lines',
    time: '10 min',
    players: '9+ (three lines)',
    setup: 'Three lines at half court — left wing, top, right wing. Ball starts in middle.',
    steps: [
      'Middle passes to right wing',
      'Middle cuts to basket',
      'Wing passes to cutter for layup',
      'Cutter rebounds own shot',
      'Rotate: passer goes to line they passed to'
    ],
    coachingPoints: [
      'Cut HARD after passing',
      'Passer: hit the cutter in stride',
      'Cutter: eyes on passer, hands ready'
    ],
    progression: 'Add a token defender on the cutter'
  },
  {
    id: '3-man-weave',
    category: 'passing',
    name: '3-Man Weave',
    time: '8 min',
    players: 'Groups of 3',
    setup: 'Three players on baseline, one ball.',
    steps: [
      'Middle player starts with ball',
      'Pass to either side, then run BEHIND the person you passed to',
      'Continue weaving down court',
      'Finish with layup',
      'No dribbling allowed'
    ],
    coachingPoints: [
      'Pass and go BEHIND (not in front)',
      'Call teammate\'s name before passing',
      'Finish with correct footwork on layup'
    ],
    progression: 'Add 2 defenders at far end'
  },
  // DRIBBLING
  {
    id: 'stationary-dribble',
    category: 'dribbling',
    name: 'Stationary Dribble Series',
    time: '5 min',
    players: 'All',
    setup: 'Everyone has a ball. Spread out.',
    steps: [
      'Right hand only: 30 seconds',
      'Left hand only: 30 seconds',
      'Crossover: 30 seconds',
      'Between legs: 30 seconds',
      'Behind back: 30 seconds'
    ],
    coachingPoints: [
      'Eyes UP (not watching ball)',
      'Pound the ball hard',
      'Low stance, protect the ball'
    ],
    progression: 'Add "freeze" command - must stop in athletic stance'
  },
  {
    id: 'dribble-knockout',
    category: 'dribbling',
    name: 'Dribble Knockout',
    time: '8 min',
    players: 'All',
    setup: 'Half court. Everyone dribbling.',
    steps: [
      'Everyone dribbles their own ball',
      'Try to knock others\' balls out while keeping yours',
      'If ball goes out, you\'re eliminated',
      'Last one standing wins'
    ],
    coachingPoints: [
      'Protect your ball',
      'Keep head up to see opponents',
      'Use body to shield'
    ],
    progression: 'Shrink the playing area as players are eliminated'
  },
  // SHOOTING
  {
    id: 'form-shooting',
    category: 'shooting',
    name: 'Form Shooting',
    time: '5 min',
    players: 'All',
    setup: 'Close to basket, 3-5 feet.',
    steps: [
      'One hand on ball (shooting hand only)',
      'Elbow under ball, wrist cocked',
      'Extend and flip wrist',
      '10 makes, then add guide hand'
    ],
    coachingPoints: [
      'Ball should backspin',
      'Same motion every time',
      'Hold follow-through'
    ],
    progression: 'Move back one step after 5 makes in a row'
  },
  {
    id: 'spot-shooting',
    category: 'shooting',
    name: '5-Spot Shooting',
    time: '10 min',
    players: 'Pairs',
    setup: '5 spots: both corners, both wings, top of key.',
    steps: [
      'Player 1 shoots from all 5 spots (one shot each)',
      'Player 2 rebounds and passes',
      'Switch roles',
      'Track makes out of 5'
    ],
    coachingPoints: [
      'Balanced before shot',
      'Same form every time',
      'Call your score'
    ],
    progression: 'Add a closeout defender'
  },
  // DEFENSE
  {
    id: 'defensive-stance',
    category: 'defense',
    name: 'Defensive Stance Hold',
    time: '5 min',
    players: 'All',
    setup: 'Spread out on baseline.',
    steps: [
      'Get in defensive stance: butt down, hands active, feet wide',
      'Hold for 10 seconds',
      'Rest 5 seconds',
      'Repeat 5 times'
    ],
    coachingPoints: [
      'Nose over toes',
      'Hands active, not on knees',
      'Weight on balls of feet'
    ],
    progression: 'Increase hold time to 15, then 20 seconds'
  },
  {
    id: 'defensive-slides',
    category: 'defense',
    name: 'Defensive Slides',
    time: '5 min',
    players: 'All',
    setup: 'Line up on baseline.',
    steps: [
      'Defensive stance',
      'Slide to free throw line',
      'Slide back to baseline',
      'Repeat 3 times without standing up'
    ],
    coachingPoints: [
      'Stay low - don\'t stand up',
      'Don\'t cross feet',
      'Hands active throughout'
    ],
    progression: 'Add zigzag pattern - slide, drop step, slide other direction'
  },
  {
    id: 'shell-drill',
    category: 'defense',
    name: 'Shell Drill (4v4)',
    time: '10 min',
    players: '8 (4v4)',
    setup: 'Offense in 4-out formation. Defense matched up.',
    steps: [
      'Offense passes around perimeter (no shots yet)',
      'Defense moves on EVERY pass',
      'Jump to ball when your man passes',
      'Add penetration after 2 minutes'
    ],
    coachingPoints: [
      'Jump to ball on every pass',
      'See ball and man at all times',
      'Help position when ball is away'
    ],
    progression: 'Allow offense to shoot or drive'
  },
  // SMALL-SIDED GAMES
  {
    id: '2v2-no-dribble',
    category: 'smallSided',
    name: '2v2 No Dribble',
    time: '10 min',
    players: 'Groups of 4',
    setup: 'Half court. Check ball at top.',
    steps: [
      'Offense can only pass (no dribbling)',
      'Must cut to get open',
      'Play to 3 makes, then rotate'
    ],
    coachingPoints: [
      'Move without the ball',
      'V-cuts and back cuts to get open',
      'Passers: patience, find the open player'
    ],
    progression: 'Allow one dribble per catch'
  },
  {
    id: '3v3-one-dribble',
    category: 'smallSided',
    name: '3v3 One-Dribble',
    time: '10 min',
    players: 'Groups of 6',
    setup: 'Half court. Check ball at top.',
    steps: [
      'Each player gets ONE dribble per catch',
      'Forces passing and cutting',
      'Play to 5 makes, then rotate'
    ],
    coachingPoints: [
      'Don\'t waste the dribble',
      'Catch in triple threat, make a decision',
      'Off-ball movement is key'
    ],
    progression: 'Add transition - losers run back, winners attack'
  },
  {
    id: '3v3-transition',
    category: 'smallSided',
    name: '3v3 Transition',
    time: '12 min',
    players: '6-9',
    setup: 'Full court. One team at each basket.',
    steps: [
      'Team A scores or turns over',
      'Team B rebounds/retrieves and attacks other end',
      'Team A has 3 seconds to get back on defense',
      'Play continuously'
    ],
    coachingPoints: [
      'Sprint back on defense',
      'Outlet quickly on rebounds',
      'Fill lanes on offense'
    ],
    progression: 'Add a 4th player who stays on offense each possession'
  },
  // TEAM DRILLS
  {
    id: '5v0-transition',
    category: 'team',
    name: '5v0 Transition',
    time: '8 min',
    players: '5',
    setup: 'Start with rebound under basket.',
    steps: [
      'Rebound → outlet to guard',
      'Fill 5 lanes (wide)',
      'Ball in middle lane',
      'Finish with layup',
      'Jog back, repeat other direction'
    ],
    coachingPoints: [
      'Run WIDE (touch sideline)',
      'Ball moves faster than people',
      'Layup on first opportunity'
    ],
    progression: 'Add 2 defenders at far end'
  },
  {
    id: 'press-break',
    category: 'team',
    name: 'Press Break',
    time: '12 min',
    players: 'All',
    setup: 'Offense under own basket. Defense in press.',
    steps: [
      'Inbound vs. press',
      'Objective: cross half court in 8 seconds without turnover',
      'Start 5v3, progress to 5v5'
    ],
    coachingPoints: [
      'Get open to the ball (move toward it)',
      'Middle is usually open — use it',
      'Stay calm. Don\'t rush.'
    ],
    progression: 'Add full trapping press'
  },
  // LAYUP DRILLS
  {
    id: 'basic-layup-lines',
    category: 'shooting',
    name: 'Basic Layup Lines',
    time: '10 min',
    players: 'All (two lines)',
    setup: 'Two lines at half court — one for shooting, one for rebounding.',
    steps: [
      'Shooter dribbles to basket, makes layup',
      'Rebounder catches, outlets to next shooter',
      'Shooter goes to rebound line, rebounder goes to shooting line',
      'Do 5 minutes right side, 5 minutes left side'
    ],
    coachingPoints: [
      'Right side: right hand, left foot takeoff',
      'Left side: left hand, right foot takeoff',
      'Use backboard',
      'Soft touch'
    ],
    progression: 'Add a defender at the rim'
  },
  {
    id: 'mikan-drill',
    category: 'shooting',
    name: 'Mikan Drill',
    time: '5 min',
    players: 'All (at baskets)',
    setup: 'Player under basket with ball.',
    steps: [
      'Start right side of rim',
      'Right hand layup',
      'Catch, immediately go left side',
      'Left hand layup',
      'Continue alternating for 60 seconds',
      'Count makes'
    ],
    coachingPoints: [
      'No dribbling between shots',
      'Quick feet, soft touch',
      'Use backboard each time'
    ],
    progression: 'Add a jump between each shot'
  },
  // MORE DEFENSIVE DRILLS
  {
    id: 'zigzag-slides',
    category: 'defense',
    name: 'Zig-Zag Slides',
    time: '8 min',
    players: 'All (in waves)',
    setup: 'Players start on corner of baseline.',
    steps: [
      'Slide at 45° angle to elbow',
      'Drop step, slide 45° to opposite elbow',
      'Continue zig-zag pattern to far baseline',
      'Jog back, next person goes'
    ],
    coachingPoints: [
      'Stay in stance whole time',
      'Don\'t cross feet',
      'Push off inside foot to change direction'
    ],
    progression: 'Add an offensive player dribbling that you mirror'
  },
  {
    id: '1v1-closeout',
    category: 'defense',
    name: '1v1 Closeout',
    time: '10 min',
    players: 'Pairs',
    setup: 'Defender in paint. Offensive player on wing. Coach at top with ball.',
    steps: [
      'Coach passes to wing',
      'Defender sprints to close out (run hard, chop feet last 2 steps)',
      'Offense tries to score (2 dribbles max)',
      'Rotate after each rep'
    ],
    coachingPoints: [
      'Sprint to closeout, chop at the end',
      'Low stance, hands up',
      'Force to one direction (baseline or middle)'
    ],
    progression: 'Allow offense unlimited dribbles'
  },
  // MORE DRIBBLING
  {
    id: 'cone-weave',
    category: 'dribbling',
    name: 'Cone Weave',
    time: '8 min',
    players: 'All (in waves)',
    setup: '5-6 cones in a line, 6 feet apart. Players line up at start.',
    steps: [
      'First player dribbles through cones with RIGHT hand only (down)',
      'Dribble back with LEFT hand only',
      'Next player goes when first reaches halfway'
    ],
    coachingPoints: [
      'Outside hand (away from cone = "defender")',
      'Eyes up, not on ball',
      'Controlled speed'
    ],
    progression: 'Add crossover at each cone'
  }
];

export const PRACTICE_TEMPLATE = {
  blocks: [
    { name: 'Warm-Up', time: '0:00', duration: 10, purpose: 'Shooting flow, get loose' },
    { name: 'Huddle', time: '0:10', duration: 5, purpose: 'Intro skill of the day' },
    { name: 'Skill Block 1', time: '0:15', duration: 15, purpose: 'Teach the skill (breakdown)' },
    { name: 'Skill Game 1', time: '0:30', duration: 10, purpose: 'Apply skill in competition' },
    { name: 'Skill Block 2', time: '0:40', duration: 15, purpose: 'Shooting or secondary skill' },
    { name: 'Skill Game 2', time: '0:55', duration: 10, purpose: 'Small-sided game' },
    { name: 'Scrimmage', time: '1:05', duration: 20, purpose: '5v5, reinforce the day\'s focus' },
    { name: 'Close', time: '1:25', duration: 5, purpose: 'Huddle, takeaway, positive note' }
  ],
  totalMinutes: 90
};
