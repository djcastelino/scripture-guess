import type { Character } from '../types';

export const CHARACTERS: Character[] = [
  // OLD TESTAMENT - EASY (10 characters)
  {
    id: 1,
    name: "Moses",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Led a large group of people out of captivity",
      "Closely associated with Egypt and Pharaoh",
      "Received important laws on a mountain",
      "Had a brother named Aaron and sister named Miriam",
      "Parted a large body of water to escape enemies",
      "Carried a wooden staff that performed miracles"
    ],
    books: ["Exodus", "Numbers", "Deuteronomy"],
    role: "Prophet & Leader",
    famousFor: "Led the Exodus from Egypt and received the Ten Commandments"
  },
  {
    id: 2,
    name: "David",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Started as a shepherd boy watching sheep",
      "Defeated a giant warrior in single combat",
      "Became the second king of Israel",
      "Was a skilled musician who played the harp",
      "Used only a sling and stones as weapons",
      "Wrote many psalms and poems of worship"
    ],
    books: ["1 Samuel", "2 Samuel", "1 Kings", "Psalms"],
    role: "King & Psalmist",
    famousFor: "Defeated Goliath and became Israel's greatest king"
  },
  {
    id: 3,
    name: "Noah",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Built a massive wooden vessel over many years",
      "Saved animals from a catastrophic disaster",
      "Received specific building instructions from God",
      "The vessel had three decks and many rooms",
      "Sent out a dove to find dry land",
      "Saw a rainbow as a sign of promise"
    ],
    books: ["Genesis"],
    role: "Patriarch",
    famousFor: "Built the ark and survived the great flood"
  },
  {
    id: 4,
    name: "Abraham",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Left his homeland to go to an unknown place",
      "Was promised countless descendants like stars",
      "Originally had a different name",
      "Father of Isaac and Ishmael",
      "Was tested by being asked to sacrifice his son",
      "Considered the father of many nations"
    ],
    books: ["Genesis"],
    role: "Patriarch",
    famousFor: "Father of the Israelite nation and man of great faith"
  },
  {
    id: 5,
    name: "Joseph",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Was the favorite son of his father",
      "Received a special colorful garment",
      "Was sold into slavery by jealous siblings",
      "Could interpret dreams with accuracy",
      "Rose to become second-in-command of Egypt",
      "Eventually forgave his brothers"
    ],
    books: ["Genesis"],
    role: "Patriarch & Leader",
    famousFor: "Wore a coat of many colors and saved Egypt from famine"
  },
  {
    id: 6,
    name: "Solomon",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Son of David and Bathsheba",
      "Asked God for wisdom instead of wealth",
      "Built the first temple in Jerusalem",
      "Famous for a judgment involving two mothers and a baby",
      "Wrote many proverbs and songs",
      "Had 700 wives and 300 concubines"
    ],
    books: ["1 Kings", "2 Chronicles", "Proverbs", "Ecclesiastes"],
    role: "King",
    famousFor: "Wisest king who built the temple"
  },
  {
    id: 7,
    name: "Daniel",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Taken captive to Babylon as a young man",
      "Refused to eat the king's rich food",
      "Could interpret dreams and visions",
      "Thrown into a den with dangerous animals",
      "The animals did not harm him",
      "Prayed three times daily facing Jerusalem"
    ],
    books: ["Daniel"],
    role: "Prophet",
    famousFor: "Survived the lion's den through faith"
  },
  {
    id: 8,
    name: "Samson",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Had supernatural physical strength from birth",
      "Took a Nazirite vow never to cut his hair",
      "Fell in love with a woman named Delilah",
      "Killed a lion with his bare hands",
      "Was betrayed and captured by enemies",
      "Destroyed a temple in his final act"
    ],
    books: ["Judges"],
    role: "Judge",
    famousFor: "Strongest man whose power was in his hair"
  },
  {
    id: 9,
    name: "Adam",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "The very first human being created",
      "Lived in a perfect garden paradise",
      "Was given the task of naming all animals",
      "Had a companion made from his rib",
      "Ate forbidden fruit from a special tree",
      "Was expelled from paradise for disobedience"
    ],
    books: ["Genesis"],
    role: "First Man",
    famousFor: "First human created by God"
  },
  {
    id: 10,
    name: "Jonah",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Tried to run away from God's assignment",
      "Boarded a ship heading in the opposite direction",
      "Was thrown overboard during a storm",
      "Swallowed by a giant sea creature",
      "Spent three days inside the creature",
      "Eventually preached to the city of Nineveh"
    ],
    books: ["Jonah"],
    role: "Prophet",
    famousFor: "Swallowed by a great fish"
  },

  // NEW TESTAMENT - EASY (10 characters)
  {
    id: 11,
    name: "Jesus",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Born in Bethlehem in a stable",
      "Performed many miracles including healing the sick",
      "Taught using parables and stories",
      "Had twelve close followers",
      "Was crucified on a cross",
      "Rose from the dead after three days"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Messiah & Savior",
    famousFor: "Central figure of Christianity, Son of God"
  },
  {
    id: 12,
    name: "Peter",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Originally worked as a fisherman",
      "One of Jesus's closest three disciples",
      "Had a brother named Andrew",
      "Denied knowing Jesus three times",
      "Jesus gave him a new name meaning 'rock'",
      "Became the leader of the early church"
    ],
    books: ["Matthew", "Mark", "Luke", "John", "Acts"],
    role: "Apostle",
    famousFor: "Walked on water and denied Jesus three times"
  },
  {
    id: 13,
    name: "Paul",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Originally persecuted Christians violently",
      "Had a dramatic conversion on a road",
      "Was temporarily blinded by a bright light",
      "Changed his name after conversion",
      "Wrote many letters to early churches",
      "Traveled extensively as a missionary"
    ],
    books: ["Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians"],
    role: "Apostle & Missionary",
    famousFor: "Converted from persecutor to greatest missionary"
  },
  {
    id: 14,
    name: "Mary",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Was a young virgin from Nazareth",
      "Visited by an angel named Gabriel",
      "Gave birth in a stable in Bethlehem",
      "Was engaged to a carpenter",
      "Witnessed her son's crucifixion",
      "Mother of Jesus Christ"
    ],
    books: ["Matthew", "Luke", "John", "Acts"],
    role: "Mother of Jesus",
    famousFor: "Virgin mother of Jesus"
  },
  {
    id: 15,
    name: "John the Baptist",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Lived in the wilderness eating locusts and honey",
      "Wore clothing made of camel's hair",
      "Baptized people in the Jordan River",
      "Prepared the way for the Messiah",
      "Baptized Jesus in the river",
      "Was beheaded by King Herod"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Prophet",
    famousFor: "Baptized Jesus and prepared his way"
  },
  {
    id: 16,
    name: "Judas",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Was one of the twelve disciples",
      "Served as treasurer for the group",
      "Betrayed someone for thirty pieces of silver",
      "Identified his target with a kiss",
      "Later felt deep remorse for his actions",
      "Died by hanging himself"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Apostle (betrayer)",
    famousFor: "Betrayed Jesus for thirty pieces of silver"
  },
  {
    id: 17,
    name: "Thomas",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Was one of the twelve disciples",
      "Refused to believe without physical proof",
      "Wanted to touch the wounds himself",
      "Said he would die with Jesus",
      "Eventually believed after seeing evidence",
      "Known for his initial skepticism"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Apostle",
    famousFor: "Doubted Jesus's resurrection until he saw proof"
  },
  {
    id: 18,
    name: "John",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Was one of Jesus's three closest disciples",
      "Brother of James, son of Zebedee",
      "Called the 'disciple whom Jesus loved'",
      "Wrote a gospel and several letters",
      "Wrote the book of Revelation",
      "Was exiled to the island of Patmos"
    ],
    books: ["John", "1 John", "2 John", "3 John", "Revelation"],
    role: "Apostle & Author",
    famousFor: "Beloved disciple who wrote five books"
  },
  {
    id: 19,
    name: "Matthew",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Worked as a tax collector before following Jesus",
      "Was despised by his fellow Jews",
      "Left everything to become a disciple",
      "Also known as Levi",
      "Wrote one of the four gospels",
      "His gospel emphasizes Jesus as the Messiah"
    ],
    books: ["Matthew"],
    role: "Apostle & Gospel Writer",
    famousFor: "Tax collector who became a gospel writer"
  },
  {
    id: 20,
    name: "Mary Magdalene",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Had seven demons cast out of her",
      "Became a devoted follower of Jesus",
      "Was present at the crucifixion",
      "Went to the tomb early on Sunday morning",
      "Was the first to see Jesus after resurrection",
      "Told the disciples about the empty tomb"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Disciple",
    famousFor: "First witness to Jesus's resurrection"
  },

  // OLD TESTAMENT - MEDIUM (15 characters)
  {
    id: 21,
    name: "Ruth",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was not born an Israelite",
      "Showed great loyalty to her mother-in-law",
      "Said 'Where you go, I will go'",
      "Worked gleaning in barley fields",
      "Married a wealthy relative named Boaz",
      "Great-grandmother of King David"
    ],
    books: ["Ruth"],
    role: "Faithful Woman",
    famousFor: "Loyal daughter-in-law and ancestor of David"
  },
  {
    id: 22,
    name: "Esther",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was an orphan raised by her cousin",
      "Became queen of Persia",
      "Hid her Jewish identity initially",
      "Risked her life by approaching the king uninvited",
      "Saved her people from genocide",
      "Said 'If I perish, I perish'"
    ],
    books: ["Esther"],
    role: "Queen",
    famousFor: "Saved the Jewish people from destruction"
  },
  {
    id: 23,
    name: "Elijah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Confronted 450 prophets of Baal",
      "Called down fire from heaven",
      "Was fed by ravens during a drought",
      "Raised a widow's son from the dead",
      "Did not die but was taken to heaven",
      "Went up in a whirlwind with chariots of fire"
    ],
    books: ["1 Kings", "2 Kings"],
    role: "Prophet",
    famousFor: "Taken to heaven in a whirlwind"
  },
  {
    id: 24,
    name: "Joshua",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was Moses's assistant and successor",
      "Led Israel into the Promised Land",
      "Commanded the sun to stand still",
      "Marched around a city for seven days",
      "The walls of Jericho fell before him",
      "Divided the land among the twelve tribes"
    ],
    books: ["Joshua"],
    role: "Military Leader",
    famousFor: "Led conquest of Canaan and battle of Jericho"
  },
  {
    id: 25,
    name: "Samuel",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "His mother dedicated him to God before birth",
      "Served in the temple as a young boy",
      "Heard God's voice calling him at night",
      "Was the last judge of Israel",
      "Anointed the first two kings of Israel",
      "Wrote about the rights of kingship"
    ],
    books: ["1 Samuel", "2 Samuel"],
    role: "Prophet & Judge",
    famousFor: "Anointed both Saul and David as kings"
  },
  {
    id: 26,
    name: "Aaron",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was Moses's older brother",
      "Served as spokesman for Moses",
      "Became the first high priest of Israel",
      "His staff budded with almonds",
      "Made a golden calf when Moses was away",
      "Wore special priestly garments"
    ],
    books: ["Exodus", "Leviticus", "Numbers"],
    role: "High Priest",
    famousFor: "First high priest and Moses's brother"
  },
  {
    id: 27,
    name: "Gideon",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was threshing wheat in a winepress",
      "Called by an angel to save Israel",
      "Asked for signs with a fleece",
      "Reduced his army from 32,000 to 300",
      "Used trumpets and torches in battle",
      "Defeated the Midianites with a small force"
    ],
    books: ["Judges"],
    role: "Judge",
    famousFor: "Defeated vast army with only 300 men"
  },
  {
    id: 28,
    name: "Elisha",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was Elijah's servant and successor",
      "Received a double portion of Elijah's spirit",
      "Parted the Jordan River with a cloak",
      "Purified poisoned water with salt",
      "Made an axe head float on water",
      "Performed twice as many miracles as his mentor"
    ],
    books: ["1 Kings", "2 Kings"],
    role: "Prophet",
    famousFor: "Succeeded Elijah and performed many miracles"
  },
  {
    id: 29,
    name: "Job",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was described as blameless and upright",
      "Lost all his children in one day",
      "Lost all his wealth and possessions",
      "Suffered from painful sores all over",
      "Three friends came to comfort him",
      "God restored double what he had lost"
    ],
    books: ["Job"],
    role: "Righteous Sufferer",
    famousFor: "Remained faithful despite terrible suffering"
  },
  {
    id: 30,
    name: "Deborah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was a prophetess in Israel",
      "Served as a judge under a palm tree",
      "Led Israel during a time of oppression",
      "Summoned Barak to lead the army",
      "Went into battle with the military commander",
      "Sang a victory song after the battle"
    ],
    books: ["Judges"],
    role: "Prophetess & Judge",
    famousFor: "Only female judge of Israel"
  },
  {
    id: 31,
    name: "Isaiah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Had a vision of God on a throne",
      "Saw angels with six wings",
      "Was touched by a burning coal on his lips",
      "Prophesied about a virgin birth",
      "Wrote about a suffering servant",
      "His book is the longest prophetic book"
    ],
    books: ["Isaiah"],
    role: "Prophet",
    famousFor: "Prophesied about the Messiah's coming"
  },
  {
    id: 32,
    name: "Jeremiah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Called the 'weeping prophet'",
      "Was appointed before he was born",
      "Prophesied Jerusalem's destruction",
      "Was thrown into a muddy cistern",
      "Wrote lamentations about Jerusalem",
      "Witnessed the fall of Jerusalem"
    ],
    books: ["Jeremiah", "Lamentations"],
    role: "Prophet",
    famousFor: "Wept over Jerusalem's destruction"
  },
  {
    id: 33,
    name: "Nehemiah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Served as cupbearer to a Persian king",
      "Was grieved by news about Jerusalem",
      "Led the rebuilding of city walls",
      "Completed the wall in 52 days",
      "Faced opposition from Sanballat",
      "Workers built with tools in one hand and weapons in the other"
    ],
    books: ["Nehemiah"],
    role: "Governor & Rebuilder",
    famousFor: "Rebuilt Jerusalem's walls"
  },
  {
    id: 34,
    name: "Ezra",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was a priest and scribe",
      "Led a group of exiles back to Jerusalem",
      "Was skilled in the Law of Moses",
      "Taught the people God's law",
      "Wept over the people's intermarriage",
      "Led a spiritual revival in Jerusalem"
    ],
    books: ["Ezra", "Nehemiah"],
    role: "Priest & Scribe",
    famousFor: "Led spiritual renewal after exile"
  },
  {
    id: 35,
    name: "Saul",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was head and shoulders taller than others",
      "Was anointed as Israel's first king",
      "Started well but became disobedient",
      "Became jealous of David's success",
      "Consulted a medium at Endor",
      "Died by falling on his own sword"
    ],
    books: ["1 Samuel"],
    role: "King",
    famousFor: "First king of Israel who fell from grace"
  },

  // NEW TESTAMENT - MEDIUM (15 characters)
  {
    id: 36,
    name: "Luke",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Was a physician by profession",
      "Traveled with Paul on missionary journeys",
      "Wrote a gospel and a sequel",
      "His gospel emphasizes Jesus's compassion",
      "Wrote the book of Acts",
      "Was a Gentile believer"
    ],
    books: ["Luke", "Acts"],
    role: "Gospel Writer & Historian",
    famousFor: "Doctor who wrote gospel and Acts"
  },
  {
    id: 37,
    name: "Mark",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Also known as John Mark",
      "His mother's house was a meeting place",
      "Traveled with Paul and Barnabas initially",
      "Left them during the first journey",
      "Later reconciled with Paul",
      "Wrote the shortest gospel"
    ],
    books: ["Mark"],
    role: "Gospel Writer",
    famousFor: "Wrote action-packed gospel"
  },
  {
    id: 38,
    name: "Stephen",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Was one of the first seven deacons",
      "Was full of faith and power",
      "Performed great wonders and signs",
      "Gave a long speech before the council",
      "Saw heaven opened before his death",
      "Was the first Christian martyr"
    ],
    books: ["Acts"],
    role: "Deacon & Martyr",
    famousFor: "First Christian martyr"
  },
  {
    id: 39,
    name: "Barnabas",
    testament: "New",
    difficulty: "medium",
    clues: [
      "His name means 'son of encouragement'",
      "Sold his land to help the church",
      "Introduced Paul to the apostles",
      "Traveled with Paul on missionary journeys",
      "Defended Mark when Paul rejected him",
      "Was a Levite from Cyprus"
    ],
    books: ["Acts"],
    role: "Apostle & Encourager",
    famousFor: "Encouraged and mentored early believers"
  },
  {
    id: 40,
    name: "Timothy",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Had a Jewish mother and Greek father",
      "Was Paul's spiritual son",
      "Joined Paul on his second journey",
      "Was young but faithful",
      "Received two letters from Paul",
      "Served as pastor in Ephesus"
    ],
    books: ["1 Timothy", "2 Timothy"],
    role: "Pastor & Missionary",
    famousFor: "Paul's young protégé and pastor"
  },
  {
    id: 41,
    name: "James",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Was Jesus's half-brother",
      "Did not believe in Jesus at first",
      "Became a leader in Jerusalem church",
      "Wrote a practical letter about faith",
      "Emphasized that faith produces works",
      "Was martyred in Jerusalem"
    ],
    books: ["James"],
    role: "Church Leader & Author",
    famousFor: "Jesus's brother who led Jerusalem church"
  },
  {
    id: 42,
    name: "Lazarus",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Lived in Bethany with his sisters",
      "Was a close friend of Jesus",
      "Became very sick and died",
      "Was in the tomb for four days",
      "Jesus wept at his tomb",
      "Was raised from the dead"
    ],
    books: ["John"],
    role: "Friend of Jesus",
    famousFor: "Raised from dead after four days"
  },
  {
    id: 43,
    name: "Zacchaeus",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Was a chief tax collector",
      "Was very wealthy but despised",
      "Was short in stature",
      "Climbed a tree to see Jesus",
      "Jesus invited himself to his house",
      "Promised to repay those he cheated"
    ],
    books: ["Luke"],
    role: "Tax Collector",
    famousFor: "Short tax collector who climbed a tree"
  },
  {
    id: 44,
    name: "Nicodemus",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Was a Pharisee and member of the Sanhedrin",
      "Came to Jesus at night",
      "Jesus told him he must be born again",
      "Asked how someone can be born twice",
      "Defended Jesus before the council",
      "Helped prepare Jesus's body for burial"
    ],
    books: ["John"],
    role: "Pharisee",
    famousFor: "Came to Jesus by night to learn"
  },
  {
    id: 45,
    name: "Philip",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Was one of the twelve apostles",
      "Brought Nathanael to Jesus",
      "Asked Jesus to show them the Father",
      "Found a boy with loaves and fish",
      "Was from Bethsaida like Peter and Andrew",
      "Greeks came to him wanting to see Jesus"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Apostle",
    famousFor: "Brought others to Jesus"
  },
  {
    id: 46,
    name: "Pontius Pilate",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Was the Roman governor of Judea",
      "Found no fault in Jesus",
      "Washed his hands before the crowd",
      "Gave the people a choice between prisoners",
      "His wife warned him about Jesus",
      "Ordered Jesus's crucifixion"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Roman Governor",
    famousFor: "Sentenced Jesus to crucifixion"
  },
  {
    id: 47,
    name: "Silas",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Was a leader in the Jerusalem church",
      "Traveled with Paul after Barnabas left",
      "Was beaten and imprisoned in Philippi",
      "Sang hymns in prison at midnight",
      "Was freed by an earthquake",
      "Also known as Silvanus"
    ],
    books: ["Acts"],
    role: "Missionary",
    famousFor: "Sang in prison with Paul"
  },
  {
    id: 48,
    name: "Andrew",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Was originally a disciple of John the Baptist",
      "Was Peter's brother",
      "Was one of the first to follow Jesus",
      "Brought his brother to Jesus",
      "Found the boy with loaves and fish",
      "Was a fisherman from Bethsaida"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Apostle",
    famousFor: "First disciple who brought others to Jesus"
  },
  {
    id: 49,
    name: "Martha",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Lived in Bethany with her siblings",
      "Was busy with serving and preparations",
      "Complained that her sister wasn't helping",
      "Jesus told her she was worried about many things",
      "Confessed Jesus as the Messiah",
      "Her brother was raised from the dead"
    ],
    books: ["Luke", "John"],
    role: "Disciple",
    famousFor: "Busy hostess who learned to prioritize"
  },
  {
    id: 50,
    name: "Ananias",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Lived in Damascus",
      "Was a devout follower of the law",
      "Had a vision from the Lord",
      "Was told to go to Straight Street",
      "Laid hands on a blind persecutor",
      "Restored Saul's sight"
    ],
    books: ["Acts"],
    role: "Disciple",
    famousFor: "Restored Paul's sight after conversion"
  }
];

// Get daily character (deterministic based on date)
export function getDailyCharacter(date: Date = new Date()): Character {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  const seed = year * 10000 + month * 100 + day;
  const index = seed % CHARACTERS.length;
  
  return CHARACTERS[index];
}

// Get all character names for autocomplete
export function getAllCharacterNames(): string[] {
  return CHARACTERS.map(c => c.name).sort();
}

