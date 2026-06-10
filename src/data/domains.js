export const DOMAINS = [
  { 
    id: 'effort', 
    name: 'Effort', 
    weight: 2.0, 
    helper: 'Hustle • Tries hard things • Recovers quickly',
    philosophy: 'Effort is the only non-negotiable',
    lookFor: [
      'Sprints, doesn\'t jog',
      'Volunteers for demos',
      'Picks self up after falling/mistake',
      'Energy consistent throughout tryout',
      'Doesn\'t give up on plays'
    ],
    redFlags: [
      'Walking when should be running',
      'Giving up after first attempt',
      'Low energy / disengaged body language',
      'Quitting on drills early'
    ],
    middleSchool: 'Enthusiasm, participation, energy',
    highSchool: 'Sustained intensity, competitive drive'
  },
  { 
    id: 'coachable', 
    name: 'Coachable', 
    weight: 1.5, 
    helper: 'Listens • Follows instructions • Adjusts',
    philosophy: 'Listening is a life skill',
    lookFor: [
      'Eyes on coach when instructions given',
      'Stops activity when whistle blows',
      'Attempts to implement feedback',
      'Asks clarifying questions appropriately',
      'Adjusts after correction'
    ],
    redFlags: [
      'Talking while coach is talking',
      'Ignoring instructions',
      'Arguing with feedback',
      'Doing own thing during drills'
    ],
    middleSchool: 'Listens, follows directions',
    highSchool: 'Self-corrects, applies learning independently'
  },
  { 
    id: 'ballSkills', 
    name: 'Ball Skills', 
    weight: 1.0, 
    helper: 'Dribble control • Passing • Catching',
    philosophy: 'Trainable skill - less weight than character',
    lookFor: [
      'Can dribble with either hand',
      'Eyes up while dribbling',
      'Accurate passes to target',
      'Catches cleanly with hands (not body)',
      'Protects ball from pressure'
    ],
    redFlags: [
      'Loses ball frequently',
      'Only uses dominant hand',
      'Stares at ball while dribbling',
      'Wild/inaccurate passes'
    ],
    middleSchool: 'Emerging fundamentals',
    highSchool: 'Competitive application'
  },
  { 
    id: 'footwork', 
    name: 'Footwork', 
    weight: 1.0, 
    helper: 'Jump stops • Pivots • Defensive slides',
    philosophy: 'Trainable skill - foundation for everything',
    lookFor: [
      'Balanced jump stops',
      'Uses pivot foot correctly',
      'Low defensive stance',
      'Slides without crossing feet',
      'Changes direction with control'
    ],
    redFlags: [
      'Travels frequently',
      'Off-balance when stopping',
      'Stands upright on defense',
      'Crosses feet when sliding'
    ],
    middleSchool: 'Emerging fundamentals',
    highSchool: 'Competitive application'
  },
  { 
    id: 'finishing', 
    name: 'Finishing', 
    weight: 1.0, 
    helper: 'Layups • Touch around the rim',
    philosophy: 'Trainable skill - develops with reps',
    lookFor: [
      'Correct footwork on layups',
      'Uses backboard',
      'Soft touch around rim',
      'Can finish with either hand',
      'Finishes through light contact'
    ],
    redFlags: [
      'Wrong foot on layups',
      'Hard/wild shots at rim',
      'Only finishes with dominant hand',
      'Avoids contact near basket'
    ],
    middleSchool: 'Emerging fundamentals',
    highSchool: 'Competitive application'
  },
  { 
    id: 'teammate', 
    name: 'Teammate', 
    weight: 1.5, 
    helper: 'Communicates • Encourages • Handles frustration',
    philosophy: 'Respect is the baseline',
    lookFor: [
      'Calls out names / communicates on court',
      'Encourages teammates after mistakes',
      'Celebrates others\' success',
      'Stays composed when frustrated',
      'Works well in partner/group drills'
    ],
    redFlags: [
      'Blames teammates for mistakes',
      'Silent / no communication',
      'Negative body language toward others',
      'Loses temper / outbursts',
      'Isolates from group'
    ],
    middleSchool: 'Positive, inclusive',
    highSchool: 'Leads appropriately, accepts role'
  }
];

export const RATINGS = [
  { value: null, label: '-', sublabel: 'Skip', color: 'skip' },
  { value: 1, label: '1', sublabel: 'Needs Work', color: 'needs-work' },
  { value: 2, label: '2', sublabel: 'OK', color: 'ok' },
  { value: 3, label: '3', sublabel: 'Good', color: 'good' }
];

export const PLAYER_COUNTS = [8, 10, 12, 15, 20];

export const GRADE_BANDS = [
  { id: 'middle', label: 'Middle School', grades: '6-8' },
  { id: 'high', label: 'High School', grades: '9-12' }
];
