// What's inside each source collection in the Library: the methods, games or tools it contains,
// credited to the people who made them. Applied to Sanity by scripts/apply-resource-entries.mjs.
// Keys are Sanity _ids of `libraryItem` documents (kind "resource"). Entries are
// [name, one line, time?, people?]; links default to the collection's own page.

export const COLLECTIONS = {
  // Liberating Structures, Henri Lipmanowicz & Keith McCandless
  "ff4814e8-c1c1-4398-8476-97fa4deab362": {
    sourceUrl: "https://www.liberatingstructures.com/ls-menu-1",
    noun: "structures",
  groups: [
      ["The menu", [
        ["1-2-4-All", "Everyone thinks alone, then in pairs, then fours, then the whole group.", "12 min", "Any size"],
        ["Impromptu Networking", "Rapid pair conversations that surface what people bring.", "20 min", "Any size"],
        ["Nine Whys", "Ask why up to nine times to reach the purpose behind the work.", "20 min", "Any size"],
        ["Wicked Questions", "Name the paradoxes a strategy has to hold at once.", "15 min", "Any size"],
        ["Appreciative Interviews", "Pairs tell stories of success and the group finds what made them work.", "60 min", "Any size"],
        ["TRIZ", "List everything that guarantees the worst result, then stop doing it.", "35 min", "Any size"],
        ["15% Solutions", "What can you do now, without more resources or permission?", "20 min", "Any size"],
        ["Troika Consulting", "Get practical help from two peers while you listen with your back turned.", "30 min", "Groups of 3"],
        ["What, So What, Now What?", "Debrief together: what happened, what it means, what to do.", "45 min", "Any size"],
        ["Discovery & Action Dialogue", "Find the positive deviants already solving the problem.", "25 min", "Groups of 5–15"],
        ["Shift & Share", "Small groups visit stations to see several innovations quickly.", "90 min", "Any size"],
        ["25/10 Crowd Sourcing", "Generate bold ideas and let the crowd score them fast.", "30 min", "12+"],
        ["Wise Crowds", "Tap the group for advice on one person's challenge, in rounds.", "15 min per round", "Groups of 4–5"],
        ["Min Specs", "Strip a practice to the few must-dos and must-not-dos.", "35 min", "Any size"],
        ["Improv Prototyping", "Act out a tough situation, then replay it better.", "20 min per round", "Any size"],
        ["Helping Heuristics", "Practise the patterns that make help useful.", "15 min", "Groups of 3"],
        ["Conversation Café", "Small circles make sense of a shocking or confusing event.", "35 min", "Groups of 5–7"],
        ["User Experience Fishbowl", "Practitioners share experience in an inner circle; others listen and ask.", "60 min", "Any size"],
        ["Heard, Seen, Respected", "Pairs practise deep listening by telling stories of not being heard.", "35 min", "Pairs"],
        ["Drawing Together", "Reveal insight by drawing with a simple shared vocabulary.", "40 min", "Any size"],
        ["Design StoryBoards", "Plan a meeting's flow step by step, structure by structure.", "Variable", "Small teams"],
        ["Celebrity Interview", "Interview a leader or expert in front of the group.", "35 min", "Any size"],
        ["Social Network Webbing", "Map who is connected to whom, and who else to bring in.", "60 min", "Any size"],
        ["What I Need From You", "Functions state their needs from each other and respond.", "70 min", "Groups of 3–7 per function"],
        ["Open Space Technology", "Participants set the agenda and self-organise around it.", "90 min to 3 days", "5 to 1000+"],
        ["Generative Relationships STAR", "Find what makes a team's relationships productive or stuck.", "25 min", "Any size"],
        ["Agreement-Certainty Matrix", "Sort challenges into simple, complicated, complex and chaotic.", "45 min", "Any size"],
        ["Simple Ethnography", "Observe and record what people actually do.", "Variable", "Individuals or pairs"],
        ["Integrated~Autonomy", "Move from either-or to both-and thinking.", "70 min", "Any size"],
        ["Critical Uncertainties", "Build strategy that holds across several futures.", "90 min", "Any size"],
        ["Ecocycle Planning", "Map activities across birth, maturity, creative destruction and renewal.", "95 min", "Any size"],
        ["Panarchy", "See how systems nest and how change moves between levels.", "2 hours", "Any size"],
        ["Purpose-To-Practice", "Design an initiative across purpose, principles, participants, structure and practices.", "2 hours", "Any size"]
      ]]
    ]
  },

  // Atlassian Team Playbook
  "fbe952ff-ed62-4d5f-8ed3-21476f570e41": {
    sourceUrl: "https://www.atlassian.com/team-playbook/plays",
    noun: "plays",
  groups: [
      ["Plays", [
        ["Health Monitor", "A team rates itself on the attributes of healthy teams.", "60 min", "Team"],
        ["DACI", "Name the Driver, Approver, Contributors and Informed for a decision.", "45 min", "Team"],
        ["Roles and Responsibilities", "Clarify who does what and where the gaps are.", "60 min", "Team"],
        ["Project Kickoff", "Agree scope, goals and how you will work before you start.", "90 min", "Team"],
        ["Premortem", "Imagine the project failed, then work out why.", "60 min", "Team"],
        ["Retrospective", "Look back at what worked, what didn't and what to try.", "60 min", "Team"],
        ["5 Whys Analysis", "Trace a problem back to its root cause.", "60 min", "Team"],
        ["Working Agreements", "Write down how the team wants to work together.", "45 min", "Team"],
        ["Trade-off Sliders", "Rank the project's competing constraints.", "30 min", "Team"],
        ["Elevator Pitch", "Say what you are building and why in a few lines.", "30 min", "Team"],
        ["Dependency Mapping", "Find what you rely on, and who relies on you.", "60 min", "Team"],
        ["Goals, Signals, Measures", "Connect goals to observable signals and metrics.", "60 min", "Team"],
        ["My User Manual", "Share how you like to work and communicate.", "60 min", "Team"],
        ["Disruptive Brainstorming", "Generate ideas by turning assumptions upside down.", "60 min", "Team"]
      ]]
    ]
  },

  // LUMA Institute, the LUMA System
  "02d7f4dc-15bc-42af-b2e2-0a60203aff7c": {
    noun: "methods",
  groups: [
      ["Looking · Ethnographic research", [["Interviewing", "Ask people about their experiences."], ["Fly-on-the-Wall Observation", "Watch without interfering."], ["Contextual Inquiry", "Interview people where the work happens."], ["Walk-a-Mile Immersion", "Experience it yourself."]]],
      ["Looking · Participatory research", [["What's on Your Radar?", "People plot what matters to them."], ["Buy a Feature", "People spend a budget on features."], ["Build Your Own", "People make their ideal version."], ["Journaling", "People record experiences over time."]]],
      ["Looking · Evaluative research", [["Think-Aloud Testing", "Users narrate while they use something."], ["Heuristic Review", "Check a design against principles."], ["Critique", "Structured feedback on work."], ["System Usability Scale", "A ten-item usability survey."]]],
      ["Understanding · People and systems", [["Stakeholder Mapping", "Show who is involved and how."], ["Persona Profile", "Describe a representative person."], ["Experience Diagramming", "Map a journey over time."], ["Concept Mapping", "Connect ideas into a model."]]],
      ["Understanding · Patterns and priorities", [["Affinity Clustering", "Group items by similarity."], ["Bull's-eye Diagramming", "Rank items by importance."], ["Importance/Difficulty Matrix", "Plot items by value and effort."], ["Visualize the Vote", "Make preferences visible."]]],
      ["Understanding · Problem framing", [["Problem Tree Analysis", "Break a problem into causes and effects."], ["Statement Starters", "Phrase problems as opportunities."], ["Abstraction Laddering", "Move a problem up and down in scope."], ["Rose, Thorn, Bud", "Tag what's positive, negative and promising."]]],
      ["Making · Concept ideation", [["Thumbnail Sketching", "Draw many small ideas quickly."], ["Creative Matrix", "Cross categories to spark ideas."], ["Round Robin", "Pass ideas around to build on them."], ["Alternative Worlds", "Borrow from other domains."]]],
      ["Making · Modeling and prototyping", [["Storyboarding", "Show a scenario frame by frame."], ["Schematic Diagramming", "Outline structure and flow."], ["Rough & Ready Prototyping", "Build a quick, crude version."], ["Appearance Modeling", "Make it look real."]]],
      ["Making · Design rationale", [["Concept Poster", "Present an idea on one page."], ["Video Scenario", "Film how it would be used."], ["Cover Story Mock-up", "Write the future headline."], ["Quick Reference Guide", "Summarise how it works."]]]
    ]
  },

  // IDEO.org, Design Kit
  "0ec61cca-b7d2-4cc0-8355-c4b867370204": {
    sourceUrl: "https://www.designkit.org/methods.html",
    noun: "methods",
  groups: [
      ["Inspiration", [["Frame Your Design Challenge", "Turn a problem into a question you can design for."], ["Create a Project Plan", "Plan time, people and resources."], ["Recruiting Tools", "Find the right people to learn from."], ["Secondary Research", "Learn what is already known."], ["Interview", "Talk to the people you are designing for."], ["Group Interview", "Learn from a community at once."], ["Expert Interview", "Get depth from specialists."], ["Define Your Audience", "Decide who you are designing for."], ["Conversation Starters", "Prompts that get people talking."], ["Extremes and Mainstreams", "Talk to people at the edges and the middle."], ["Immersion", "Spend time in people's context."], ["Analogous Inspiration", "Look at a similar situation elsewhere."], ["Card Sort", "Ask people to rank or group cards."], ["Peers Observing Peers", "People document their own community."], ["Collage", "People make collages to express themselves."], ["Guided Tour", "People show you their space."], ["Draw It", "People draw their experience."], ["Resource Flow", "Map how money and goods move."]]],
      ["Ideation", [["Download Your Learnings", "Share what you learned while it's fresh."], ["Share Inspiring Stories", "Tell the stories that stood out."], ["Top Five", "Pick the five most important things."], ["Find Themes", "Group findings into themes."], ["Create Insight Statements", "Turn themes into insights."], ["Explore Your Hunch", "Test an early instinct."], ["How Might We", "Reframe insights as questions."], ["Create Frameworks", "Organise findings visually."], ["Brainstorm", "Generate many ideas together."], ["Brainstorm Rules", "Ground rules for good ideation."], ["Bundle Ideas", "Combine ideas into stronger concepts."], ["Get Visual", "Sketch to think."], ["Mash-Ups", "Combine unrelated things."], ["Design Principles", "Write rules that guide the design."], ["Create a Concept", "Turn ideas into a concept."], ["Co-Creation Session", "Design with the people you serve."], ["Gut Check", "Quick check on direction."], ["Determine What to Prototype", "Choose what to test first."], ["Storyboard", "Show the experience frame by frame."], ["Role Playing", "Act out the experience."], ["Rapid Prototyping", "Build fast and cheap to learn."], ["Business Model Canvas", "Map how the idea sustains itself."], ["Get Feedback", "Put prototypes in front of people."], ["Integrate Feedback and Iterate", "Fold learning into the next version."]]],
      ["Implementation", [["Live Prototyping", "Run the idea in the real world for a while."], ["Roadmap", "Plan how the idea comes to life."], ["Resource Assessment", "Know what you have and need."], ["Build Partnerships", "Find partners to deliver it."], ["Ways to Grow Framework", "Plan how the idea grows."], ["Staff Your Project", "Get the right team."], ["Funding Strategy", "Plan how it will be paid for."], ["Pilot", "Run a longer test at small scale."], ["Define Success", "Agree what good looks like."], ["Keep Iterating", "Keep improving after launch."], ["Create a Pitch", "Tell the story to get support."], ["Sustainable Revenue", "Design for income that lasts."], ["Monitor and Evaluate", "Track whether it works."], ["Keep Getting Feedback", "Stay close to the people you serve."]]]
    ]
  },

  // Strategyzer, Testing Business Ideas experiment library (Bland & Osterwalder)
  "9b886240-00a9-4d9e-974b-f8ba64081a6b": {
    noun: "experiments",
  groups: [
      ["Discovery", [["Customer Interview", "Talk to customers about jobs, pains and gains."], ["Expert Stakeholder Interviews", "Learn from people with inside knowledge."], ["Partner & Supplier Interviews", "Check whether key partners can deliver."], ["Search Trend Analysis", "Use search data to gauge demand."], ["Web Traffic Analysis", "Learn from how people use your site."], ["Discussion Forums", "Mine forums for unmet needs."], ["Sales Force Feedback", "Learn from the people selling."], ["Customer Support Analysis", "Learn from support requests."], ["Online Ad", "Test a value proposition with ads."], ["Link Tracking", "Measure interest through clicks."], ["Feature Stub", "Add a button for a feature that doesn't exist yet."], ["404 Test", "Link to a missing page to measure interest."], ["Email Campaign", "Test messages by email."], ["Social Media Campaign", "Test messages on social channels."], ["Referral Program", "See if customers will recommend you."], ["3D Print", "Make a physical model cheaply."], ["Paper Prototype", "Sketch an interface on paper."], ["Storyboard", "Show the experience in frames."], ["Data Sheet", "One page of specifications."], ["Brochure", "A mock brochure for the offer."], ["Explainer Video", "A short video of the value proposition."], ["Boomerang", "Test a competitor's product with customers."], ["Pretend to Own", "Carry a non-working version to see if you'd use it."], ["Product Box", "Customers design the box for the product."], ["Speed Boat", "Find what is holding customers back."], ["Card Sorting", "Learn how customers group and rank things."], ["Buy a Feature", "Customers spend play money on features."]]],
      ["Validation", [["Clickable Prototype", "An interactive mock-up of the product."], ["Single Feature MVP", "Build only the core feature."], ["Mash-up", "Combine existing services into an MVP."], ["Concierge", "Deliver the service by hand, visibly."], ["Life-Sized Prototype", "Build it at full scale."], ["Simple Landing Page", "A page that explains the offer and asks for action."], ["Crowdfunding", "Raise money from future customers."], ["Split Test", "Compare two versions."], ["Presale", "Sell before you build."], ["Validation Survey", "Ask customers who already engaged."], ["Mock Sale", "Run the sale without delivering."], ["Letter of Intent", "Ask for a written commitment."], ["Pop-up Store", "A temporary store to test demand."], ["Extreme Programming Spike", "A short technical test of feasibility."], ["Wizard of Oz", "Deliver by hand, invisibly, behind a real-looking front."]]]
    ]
  },

  // Laws of UX, Jon Yablonski
  "d6551c81-6a6b-4366-8f5c-bd8ef1ad3d78": {
    noun: "laws",
  groups: [
      ["Laws and principles", [["Aesthetic-Usability Effect", "People see attractive design as easier to use."], ["Choice Overload", "Too many options make choosing harder."], ["Chunking", "Group information into meaningful units."], ["Cognitive Load", "The mental effort an interface demands."], ["Doherty Threshold", "Responses under 400ms keep people engaged."], ["Fitts's Law", "Bigger, closer targets are faster to hit."], ["Flow", "Full immersion when challenge matches skill."], ["Goal-Gradient Effect", "Effort increases as the goal gets closer."], ["Hick's Law", "More choices, longer decisions."], ["Jakob's Law", "Users expect your site to work like others they know."], ["Law of Common Region", "Things in a shared boundary seem grouped."], ["Law of Prägnanz", "People see complex images in their simplest form."], ["Law of Proximity", "Things near each other seem related."], ["Law of Similarity", "Similar things seem grouped."], ["Law of Uniform Connectedness", "Connected things seem related."], ["Mental Model", "What users believe about how a system works."], ["Miller's Law", "Working memory holds about seven items."], ["Occam's Razor", "Prefer the simplest solution."], ["Paradox of the Active User", "Users don't read manuals; they start using."], ["Pareto Principle", "Roughly 80% of effects come from 20% of causes."], ["Parkinson's Law", "Tasks expand to fill the time available."], ["Peak-End Rule", "Experiences are judged by their peak and their end."], ["Postel's Law", "Be liberal in what you accept, conservative in what you send."], ["Selective Attention", "People focus on what matters to their goal."], ["Serial Position Effect", "First and last items are remembered best."], ["Tesler's Law", "Some complexity can't be removed, only moved."], ["Von Restorff Effect", "The item that differs is remembered."], ["Working Memory", "The small store that holds information while we use it."], ["Zeigarnik Effect", "Unfinished tasks are remembered better."]]]
    ]
  },

  // Stanford d.school, Design Thinking Bootleg
  "8dbab94c-0ded-4d46-8f38-351c45f03343": {
    noun: "methods",
  groups: [
      ["Empathise", [["Assume a Beginner's Mindset", "Set aside what you think you know."], ["What? How? Why?", "Move from observation to motivation."], ["Interview for Empathy", "Draw out stories and feelings."], ["Extreme Users", "Learn from people at the edges."], ["Story Share-and-Capture", "Share field stories and capture insights."]]],
      ["Define", [["Saturate and Group", "Fill a wall with findings and cluster them."], ["Empathy Map", "What people say, do, think and feel."], ["Journey Map", "Map an experience over time."], ["Composite Character Profile", "Build a character from several users."], ["Point of View Madlib", "User + need + insight."], ["How Might We Questions", "Turn a point of view into prompts."]]],
      ["Ideate", [["Stoke", "Short activities to warm up a team."], ["Facilitate a Brainstorm", "Run a generative session."], ["Selection", "Choose ideas to take forward."], ["Bodystorming", "Act out ideas physically."]]],
      ["Prototype and test", [["Prototype for Empathy", "Prototype to understand, not to solve."], ["Prototype to Test", "Make something people can react to."], ["Testing with Users", "Learn from people using the prototype."], ["I Like, I Wish, What If", "A frame for feedback."], ["Feedback Capture Grid", "Capture likes, criticism, questions and ideas."], ["Storytelling", "Share the work through story."]]]
    ]
  },

  // UK Government Office for Science, The Futures Toolkit
  "673877d1-41d2-4dde-a125-fde77a98f08e": {
    noun: "tools",
  groups: [
      ["Gathering intelligence", [["Interviews and Delphi", "Draw on expert views, in rounds."], ["The Seven Questions", "An interview set that surfaces strategic assumptions."], ["Horizon Scanning", "Look systematically for signals of change."]]],
      ["Exploring dynamics", [["Driver Mapping", "Sort drivers by impact and uncertainty."], ["Axes of Uncertainty", "Pick two critical uncertainties to frame scenarios."]]],
      ["Describing the future", [["Scenarios", "Several plausible futures to test against."], ["Visioning", "Describe a preferred future."], ["Three Horizons", "Connect today, the transition and the future."]]],
      ["Developing and testing policy", [["SWOT Analysis", "Strengths, weaknesses, opportunities, threats."], ["Policy Stress-testing", "Test options across scenarios."], ["Backcasting", "Work back from a future to today."], ["Roadmapping", "Plan the path in steps."]]]
    ]
  },

  // Service Design Tools (Roberta Tassi)
  "0d0f2fb5-d4d8-404a-b6fe-02c2caaadd2a": {
    sourceUrl: "https://servicedesigntools.org/tools.html",
    noun: "tools",
  groups: [
      ["Research", [["Interview Guide", "Plan the questions for an interview."], ["Observation Notes", "Structure what you see in the field."], ["Recruiting Screener", "Choose who to talk to."], ["Cultural Probes", "Kits people use to document their lives."], ["Shadowing", "Follow people through their day."]]],
      ["Synthesis", [["Personas", "Archetypes built from research."], ["Customer Journey Map", "Map an experience step by step."], ["Stakeholder Map", "Show who is involved and how."], ["System Map", "Show the actors and flows of a service."], ["Offering Map", "Show what a service offers."]]],
      ["Ideation and prototyping", [["Storyboard", "Show a service scenario in frames."], ["Role Playing", "Act out a service moment."], ["Moodboard", "Collect images that set the tone."], ["Service Blueprint", "Map front stage and back stage together."], ["Business Model Canvas", "Map how the service creates value."]]]
    ]
  },

  // Nesta, DIY Toolkit
  "07768549-6602-49a0-aa3d-6204ac244d3c": {
    noun: "tools",
  groups: [
      ["Tools", [["Evidence Planning", "Plan how you'll show what works."], ["Theory of Change", "Link activities to the change you want."], ["Business Model Canvas", "Map how the work sustains itself."], ["SWOT Analysis", "Strengths, weaknesses, opportunities, threats."], ["Problem Definition", "Get clear on the problem before solving it."], ["Causes Diagram", "Trace the causes of a problem."], ["Fast Idea Generator", "Prompts for quick ideas."], ["Thinking Hats", "Look at an idea from six perspectives."], ["Creative Workshop", "Plan a session to generate ideas."], ["Personas", "Describe the people you serve."], ["Experience Tour", "Walk through a service as a user."], ["People and Connections Map", "Map who matters and how they connect."], ["Prototype Testing Plan", "Plan what you'll test and how."], ["Learning Loop", "Build reflection into the work."], ["Blueprint", "Map how a service is delivered."], ["Building Partnerships Map", "Plan the partners you need."], ["Critical Tasks List", "List what must happen for success."], ["Marketing Mix", "Plan product, price, place and promotion."], ["Target Group", "Decide who the work is for."], ["Value Proposition", "State the value clearly."]]]
    ]
  }
};

// Gamestorming (Dave Gray, Sunni Brown & James Macanufo). The record exists as a methodology.
COLLECTIONS["8ff342ec-e7f2-43d9-9e43-f62b089e834b"] = {
  sourceUrl: "https://gamestorming.com/",
  noun: "games",
  groups: [
      ["Core games", [["Affinity Map", "Cluster ideas to find patterns."], ["Bodystorming", "Act out a situation to understand it."], ["Card Sort", "Sort cards to reveal how people think."], ["Dot Voting", "Prioritise by placing dots."], ["Empathy Map", "What a person says, thinks, does and feels."], ["Forced Ranking", "Rank items against criteria, no ties."], ["Post-Up", "Generate ideas on sticky notes."], ["Stakeholder Analysis", "Map stakeholders by interest and influence."], ["Visual Agenda", "Draw the meeting's path for everyone to see."]]],
      ["Opening", [["The 4Cs", "Components, Characteristics, Challenges, Characters."], ["Draw the Problem", "Each person sketches the problem as they see it."], ["Graphic Jam", "Draw simple images for abstract words."], ["Heuristic Ideation", "Combine two lists to spark ideas."], ["Image Sorting", "Use pictures to open a conversation."], ["Low-Tech Social Network", "Build a wall of who knows whom."], ["Open Space", "Participants set the agenda."], ["Pre-Mortem", "Imagine failure to find risks."], ["Show and Tell", "Bring an object, tell its story."], ["Trading Cards", "Make a card about yourself and swap."]]],
      ["Exploring", [["Cover Story", "Write the future headline of your success."], ["Context Map", "Map trends, needs and uncertainty around the work."], ["Fishbowl", "Inner circle talks, outer circle listens."], ["Help Me Understand", "Questions that surface what's unclear."], ["Pecha Kucha", "20 images, 20 seconds each."], ["Speedboat", "What anchors are slowing us down?"], ["Spectrum Mapping", "Place opinions along a line."], ["SWOT Analysis", "Strengths, weaknesses, opportunities, threats."], ["Understanding Chain", "Map how understanding builds step by step."], ["World Café", "Rotating small-table conversations."]]],
      ["Closing", [["$100 Test", "Spend a fixed budget across options."], ["Impact & Effort Matrix", "Plot ideas by value and cost."], ["Memory Wall", "Capture what to remember."], ["Plus/Delta", "What worked, what to change."], ["Prune the Future", "Trim and grow branches of possible actions."], ["Start, Stop, Continue", "Agree what to begin, end and keep."], ["Who / What / When Matrix", "Turn decisions into owned actions."], ["Graphic Gameplan", "Lay out the plan visually."]]]
    ]

};

// Import leftovers and duplicates, unpublished (drafts are kept, so this can be undone in the Studio).
export const RETIRE = {
  "56676f32-a8ad-4a9b-b4d8-80c7f851a401": "URL as title",
  "23fbee72-7af3-4636-9a49-19af40cbfb8d": "URL as title",
  "af83c7d3-c578-4e61-a22a-d8deb75de3c3": "URL as title",
  "50ce263c-9fd3-497a-b591-06c99b18e222": "Import note, not a resource",
  "2ec05cd4-1837-4fc3-bd3d-259acf53c31c": "Import note, not a resource",
  "f4cb35d6-30b3-4d2b-913a-8aef6fa8bd1e": "Duplicate of Liberating Structures",
  "f052b08a-8efc-478f-825f-ea878c2c7b56": "Duplicate of Nesta DIY Toolkit",
  "ad644772-adc0-44ed-9709-81c9686b8f92": "Duplicate of UNDP Foresight Strategy Toolkit",
  "5bb52898-11fa-4cfb-8fe7-4cb2874864bc": "Duplicate of Strategyzer Experiment Library",
  "4041f216-99f4-4276-9d16-f0833a825e5f": "Duplicate of Policy Horizons Canada Training Modules",
  "5e1b8f6e-903a-48f0-bac0-3a9ff90cd922": "Duplicate of SessionLab library",
  "9854bd18-7ecf-4394-91ab-75c008d6032a": "Duplicate of Design Kit"
};

// Corrections to existing records.
export const FIXES = {
  // Every Atlassian play pointed at the Health Monitor page.
  "49b6b650-6d38-4071-a74a-15210309c3a9": { sourceUrl: "https://www.atlassian.com/team-playbook/plays" },
  "e6983364-8d8d-4840-b037-13f52a3edc4e": { sourceUrl: "https://www.atlassian.com/team-playbook/plays" },
  "fde30a61-2ca9-4813-b1ae-b9728f9c62d2": { sourceUrl: "https://www.atlassian.com/team-playbook/plays" },
  "71232501-9bda-4d3e-9973-09d7df678235": { sourceUrl: "https://www.atlassian.com/team-playbook/plays", title: "My User Manual" },
  "0ec61cca-b7d2-4cc0-8355-c4b867370204": { title: "IDEO.org Design Kit" },
  "07768549-6602-49a0-aa3d-6204ac244d3c": { sourceUrl: "https://www.nesta.org.uk/toolkit/diy-toolkit/" },
  "8ff342ec-e7f2-43d9-9e43-f62b089e834b": { format: "Book", attribution: "Gamestorming: A Playbook for Innovators, Rulebreakers, and Changemakers. O'Reilly, 2010." }
};

let k = 0;
const key = () => "e" + (k++).toString(36);
/** Sanity array value for a collection's `entries` field. */
export const toEntries = groups => groups.flatMap(([group, items]) => items.map(([name, short, time, people]) => ({ _type: "entry", _key: key(), name, short, group, ...(time ? { time } : {}), ...(people ? { people } : {}) })));
