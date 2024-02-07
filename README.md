# NYC Civic Hacking 101

🔧 work on projects with your friends
🚀 help NYC governance
👶 baby steps, small projects, easy wins
🍎 focus on low-hanging fruit
🧪 experimentation + delight
🐌 patient, inevitable progress
🙅‍♂️ have a good time, do not have a bad time
👀 permissionless, open source, public

for later:
💡 give testimony to city council


### What is Civic Hacking?

"Hackers embody sharing, openness, decentralization — coding to improve the world"
-- Ben Balter, [What is a 'Hacker'?](https://ben.balter.com/2013/02/04/what-is-a-hacker)

Hackers are inspired by the ["Hacker Ethos"](https://www.amazon.com/Hackers-Computer-Revolution-Anniversary-ebook/dp/B003PDMKIY/?tag=benbalter07-20)

#### Two Parts: Useful Research + Data // Useful Tool Building

In this class, there are two types of Civic Hackers that we will address:
1. [Researchers](#pillar-1-research)
   1. finding (and indexing) open government data
   2. exploring and understanding it
   3. visualizing + explaining it
2. [Tool-Builders](#pillar-2-tool-building)
   1. Finding a valuable civics tool with flaws
   2. Prototype a better version
   3. Deploy + get feedback from real users

Liam and I personally are tool-builders, but you can't build useful tools if you don't know how to do useful research. Likewise, it's difficult to do useful research without good tools. For instance, if you can't query data, how can you analyze it?

To that end, we'll be teaching everyone a little bit of both, and then we'll do a lot of project based work.

This class is highly independent, so it might feel a bit scary at times, but we're both here to answer questions and get you back on track; we're always happy to rescope a project, or put you on a different team, or whatever it takes to make sure you feel confident in your work.

#### We rely on Maximum New York to inform Governmental Mechanics
Daniel runs a civic school, [Maximum New York](https://www.maximumnewyork.com/), which teaches 100s of students how the government works. Many work in the government, write civic blogs, and/or do novel research.

Daniel works with and is followed by NYC staffers, City Councilmembers, Community Board Members, etc.

If we build tools that are useful to Maximum New York, we are building tools that will be tweeted about, written about, blogged about and ultimately shown/put in front of hundreds of students, and many government people.

In other words, by partnering with Maximum New York, we fulfill a useful and unfilled niche in the NYC governmental ecosystem

#### We aren't profit focused:
- We are not trying to make money here, there are much better ways to make money writing software.
- We do this on the side.


## Pillar 1: Research

The Research Stack (Tools):
1. NYC Data Sources
2. Data Analysis ([Julius.ai](https://julius.ai/))
3. Data Vis ([datawrapper](https://www.datawrapper.de/))
4. Comms + Questions (email)
   1. If you're not sure who to send questions to, send to: ajroberts0417@gmail.com, liamdanielduffy@gmail.com, daniel@maximumnewyork.com
5. Publishing ([Substack](https://substack.com/))


### The Researcher's Skillset
You should be able to:
1. understand the data that exists about the city/government
2. ask useful questions about that data
3. find the datasets which can be combined to answer your question
4. enough Julius.ai to query the data
5. enough Python to be dangerous
6. enough Datawrapper to visualize your results in interactive format
7. enough political savvy to at least email those results to Daniel (e.g.), and describe why they are important; or to publish your own substack research outright.

Just these skills are enough to get your results consistently published and talked about in the NYC political ecosystem.


#### Why Datawrapper?
Datawrapper is a crucial tool to understand and learn:
- Substack is the fastest growing tool for civic, economic, and political writing on the internet
- Datawrapper is the only tool (we are aware of) with INTERACTIVE graphic embeds in Substack.
- In other words, if you want Interactive graphics in popular blogs, you have to learn to use Datawrapper.

### Research Questions:
- How many rules were made in the city of New York in 2023?
    by (all variables), by agency, by date, by person, etc etc.


- How many votes did each of the 51 districts receive in the most recent city council election?
    Use datawrapper shapefile display

- How many people applied to be on the community board of each of the 59 community districts?

- How many participatory budgeting votes did each of the 51 city council districts receive?

##### Discretionary Funds + Budgeting:

Context: City council has a giant pool of discretionary funds. They often give this to a giant fleet of things, especially nonprofits, for sometimes good and sometimes questionable reasons.

All discretionary fund distributions by the city council are public.
- https://council.nyc.gov/budget/fiscal-year-2024-discretionary-funding-expense-application-filing-period/
- https://council.nyc.gov/budget/

We don’t know exactly what we’re looking for, but here are some good questions:

- let’s just look at 1 district: give me a giant table of what has been allocated.
  - What are all the budget allocations for this district for a given year?
  - Which Entities were paid?
    - Where are they incorporated? Are they legal?
    - Who sits on their board? How many people sit on the board?

- What are all the entities that the council pays w/ discretionary budgeting? (perhaps just in a big table)

Ideally we want to provide open data, to Tee Up other people to perform audits on these groups.

##### About the City Council:

Attendance Records can be found on Legistar:
- HEAT MAP: attendance by council district

- HEAT MAP: which city council members have proposed / sponsored the most legislation?

## Pillar 2: Tool-Building

We focus mostly on Legistar here, though there are many other tools to build.
We'll expand upon this in the future, after we succeed in our current goals.

### The Tool-builder's Skillset
You should be able to:
1. Explore and document unfamiliar Legistar APIs (there are other APIs that matter, but we probably won't get to them)
2. Succinctly & accurately describe what it does
3. Build a client to wrap that API
3b. (optional) improve upon the API by diagnosing complexity + simplifying it, adding types, etc.. (be careful though)
4. Build a GraphQL Schema/API using that client, to explore the API locally


#### Granicus / Legistar is the most important legislative software in the US
- Despite this, the tooling is far less than we might expect.
- For now, we are focused on improving tools to explore and understand the NYC legislature.
  - Nicely, this benefits almost all US cities which use Legistar (most of them)

