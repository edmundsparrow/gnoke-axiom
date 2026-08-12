// Deck data lives here, separate from js/app.js's engine logic, so adding a
// new deck never touches the code that runs the game. Each deck is:
//   { title, subtitle, levels: [{ icons:[a,b], tag, options, correct, detail }] }
// icons reference names in EMOJI (js/app.js) — add an entry there for any
// new icon name a deck introduces.

const GX_DECKS = {
  axioms: {
    title: "Axioms", subtitle: "field manual",
    levels: [
      { icons: ["Lock","KeyRound"], tag: "access", options: ["Access solves everything","Authority isn't capability","Locks mean no way through"], correct: 1, detail: "Having permission to do something and being equipped to do it are two different facts. A door can be unlocked and still lead nowhere useful." },
      { icons: ["Bot","MessageSquareWarning"], tag: "tools", options: ["AI always gets it right","Confidence means correctness","A tool isn't understanding"], correct: 2, detail: "Output that looks fluent isn't the same as a grasp of the problem." },
      { icons: ["Footprints","Flag"], tag: "limits", options: ["A constraint isn't an incapability","Slow means it fails","Limits stop the finish"], correct: 0, detail: "Slow still finishes. Limited still ships." },
      { icons: ["Rabbit","Turtle"], tag: "pace", options: ["First to finish always wins","Speed is a metric, not a verdict","Getting there fast beats getting there right"], correct: 1, detail: "Getting there matters more than getting there first." },
      { icons: ["Wrench","Factory"], tag: "scale", options: ["Bigger tools always win","Scale removes the problem","Sufficient beats unnecessary"], correct: 2, detail: "The small tool that fits the small job outperforms the large machine built for a job you don't have." },
      { icons: ["Sun","CloudLightning"], tag: "reliability", options: ["If it works once it's done","Edge cases are rare, skip them","Happy-path only isn't reliable"], correct: 2, detail: "A system that only works when everything goes right is deferring its debugging, not avoiding it." },
      { icons: ["Scale","Settings"], tag: "capacity", options: ["More capacity means it's scaled","Scale costs maintenance, not just capacity","Bigger systems solve themselves"], correct: 1, detail: "A system nobody can understand or change under load hasn't scaled, it's only swollen." },
      { icons: ["GitFork","MapPin"], tag: "process", options: ["Speed beats direction","Understanding precedes implementation","One path is enough"], correct: 1, detail: "Multiple paths exist before you pick one." },
      { icons: ["Puzzle","LayoutGrid"], tag: "architecture", options: ["The interface is the whole system","If it's not in the menu, it can't be done","No button doesn't mean impossible"], correct: 2, detail: "A platform's vocabulary isn't necessarily the boundary of its architecture." },
      { icons: ["ScrollText","TriangleAlert"], tag: "specification", options: ["Every boundary is a bug","Rules are just obstacles","The limitation may be the spec"], correct: 2, detail: "What you call a limitation might be the specification you didn't read." },
    ],
  },
  chemistry: {
    title: "Chemistry", subtitle: "first principles",
    levels: [
      { icons: ["Flame","Snowflake"], tag: "thermodynamics", options: ["Cold is its own force","Heat and cold are opposites that cancel","Cold is just less heat"], correct: 2, detail: "Temperature measures particle energy; cold is a lower reading on the same scale." },
      { icons: ["Droplet","CloudRain"], tag: "phase change", options: ["Water only evaporates at 100°C","Evaporation happens below boiling point too","Evaporation and boiling are the same thing"], correct: 1, detail: "Boiling is evaporation happening throughout the whole liquid at once." },
      { icons: ["Atom","Zap"], tag: "bonding", options: ["Atoms bond to fill their outer shell","Atoms bond because they're attracted romantically","All bonds are identical"], correct: 0, detail: "Atoms bond to reach a more stable, lower-energy electron configuration." },
      { icons: ["FlaskConical","Thermometer"], tag: "reactions", options: ["All reactions absorb heat","Exothermic reactions release heat","Temperature never changes in a reaction"], correct: 1, detail: "Exothermic reactions release more energy than they absorb." },
      { icons: ["Repeat","Zap"], tag: "catalysts", options: ["A catalyst gets used up in the reaction","A catalyst speeds a reaction without being consumed","A catalyst only works once"], correct: 1, detail: "A catalyst lowers the energy needed for a reaction, then comes out unchanged." },
    ],
  },
  "ai-literacy": {
    title: "AI Literacy", subtitle: "reading discipline",
    levels: [
      { icons: ["Eye","Bot"], tag: "discernment", options: ["Fluent means true","Seeing isn't believing","AI output speaks for itself"], correct: 1, detail: "Fluent output looks like understanding. Whether there's a person steering it with something to say is a separate question — one only a reader paying attention can answer." },
    ],
  },
};
