import ArticleText from "../../components/articleText.component";
import ArticleImgs from "../../components/articleImgs.component";
import ArticleHeader from "../../components/articleHeader.component";
import NavBar from "../../components/navBar.component"

const ReflectionScreen = (props) => {
  const FOLDER = "2308reflection";

  const screen = {};

  return (<>
    <NavBar/>
    <div style={screen}>
      <ArticleHeader text="Escaping expectation" date="14.08.23" />

      <ArticleImgs folder={FOLDER} imgs={["chamflat"]} />
      <ArticleText
        text={`A trip itinerary is
        sketched out in a group chat, but it is brought to life with the thick felt tip of personal 
        expectation. Motivation is a tangled mess of things that aren't faced until the 
        plan unravels. We wanted to climb winter routes in the Alps. Eight days with a flat 
        in Chamonix, five minutes walk from the Midi lift which takes you straight up to 3842m, 
        right in the heart of the Mont Blanc Massif.`}
      />

      <ArticleText text={`Seven days later we hadn't climbed anything.`} />

      <ArticleText
        text={`Avalanches. They are deadly and they are frighteningly intangible. Your 
        interpretation of a forecast sometimes tells you more about yourself than it does the snow. 
        There is a temptation to leap on the slightest improvement: the north-westerly slopes are now 
        3-rated rather than 4; “avalanches are likely to release spontaneously” is an improvement on 
        “avalanches are likely to be triggered by climbers”. Reading the forecasts this way is a 
        highroad to killing yourself. But it takes a lot of strength to avoid 
        slipping into this relativistic approach, several groundhog-days into a week of terrible forecasts. You become  
        desensitised to the grim reality of an avalanche, reading the same reports for days on 
        end, as you grow restless and frustrated. In Chamonix I felt like the fun police. Had my appetite for risk 
      waned? If we had just spent 5 perfect days on the mountain, would we really head out tomorrow, 
      conditions as they are?`}
      />

      <ArticleText
        text={`We went drytooling. Mozzarella focaccias at the dusty foot of sickeningly
      overhung crag down the road from Chamonix. The always dry ledges and squats at the base of the 
      routes felt a bit lived in - a comfort we hadn't flown to France for. I found a certain 
      satisfaction to scoring the 
      drilled axe slots, like playing a video game or pocketing several balls in a row in snooker. 
      Learning the tricks for scratching up rock in winter gear would be useful in the future.`}
      />
      <ArticleImgs folder={FOLDER} imgs={["izziedrytool"]} />

      <ArticleText
        text={`In February I went to Scotland to climb with my brother. To do three days, to do 
      hard routes. Harder than last year because that was last year, and it’s not really proper 
      climbing if it’s not a VI or VII, or an VIII? We climbed a couple of V’s, a II and a 
      III. On the third day we managed two trips to McDonald's and an afternoon at the bouldering 
      wall.`}
      />

      <ArticleText
        text={`So where does the plan end and the expectation begin? Are you 
      motivated by the plan or by your expectation? I was reflecting in a 
      rain-lashed cafe in Chamonix, watching the cabin-less Midi cables lean in the wind. I was sure that I'm 
      motivated by adventure, but after a real spaghetti-western of a plan I'd ended up in a cafe
      questioning what adventure really was.`}
      />

      <ArticleText
        indent={true}
        text={`In Scotland, I opened the door to the van at Aviemore train station and 
      immediately spotted a crate of Tenzing. Not a four pack, a full slab. My brother had been in 
      the Highlands for over a week on a multi-partner relay between Ben Nevis and the Cairngorm 
      Ski-center. The rucksacks we climb with in winter are heavy and there's rarely an option to 
        leave one at the bottom of the climb to collect later, so every kilo counts. There are a number of reasons 
      why you might decide against packing a Tenzing for the top. It's got caffeine in: if there's 
      a chance you might run out of water (almost inevitable), you don't want any of the liquid you're 
      carrying to be dehydrating. It's crushable: and then totally useless along with any 
      layers caught in the cross-fire. It's not refillable: so you run out of water twice.`}
      />

      <ArticleImgs folder={FOLDER} imgs={["oltenzing"]} />

      <ArticleText
        text={`But it tastes seriously good at the top. We cracked the ring-pulls with the point of 
        an axe in 
      the biting black wind. Carbonated drinks 5 or so degrees below 
      fridge temperature feel like expensive silk to a thirsty tongue. On long walk-offs I think 
      about how worlds collide on an adventure. There is the world of rucksack packing and map scouring 
      in which the Tenzing can is a bit of a complacent gesture. Disapproved by the plan maker and a 
      sore thumb in the rucksack - especially after it's used and useless.`}
      />

      <ArticleText
        text={`A Tenzing can plays a different role in the world of fear, euphoria and the 
        dread of never-ending descent tracks. Sifting through these memories, there are hang-over like endurances: 
      with enough discomfort to wish it were over, but not quite enough to have wished it were avoided. 
      There's truly unclouded euphoria when we would stop, rifle though our packs and take the 
      first few sips of Tenzing at the top. At the very least, you begin the tiresome descent with 
      a burst of hope.`}
      />

      <ArticleImgs folder={FOLDER} imgs={["savageslit"]} />

      <ArticleText
        text={`There was a thick fog. It was easy enough to head for the right crag at 
      the back of the coire, but we couldn't see the features of the rock to begin 
      feeling optimistic or fearful. Large drifts of snow swept down the gully separating us from 
      the crag. Beneath the lee-side faces of these drifts a view of the buttress was obscured and 
      we kicked up and across towards the crest. As we moved, the famous blocky corner and offwidth 
      of Savage Slit rose behind the crest.`}
      />

      <ArticleText
        text={`Dusty snow is falling onto the slabs beneath the roof of Deep Throat, 
      quietly collecting on all the sloping edges and grooves. I'm scratching above with the tip of 
      an axe in a fold of the coarse rock, blind, testing the gritty purchase. A single point of 
      a high toe spiked into a hole that is shaped like fingered playdough. Moving over it and 
      feeling the cool rock through the thin layer of black gortex between my knee and the wall, 
      reaching and hooking up into a tight vertical seam. `}
      />

      <ArticleImgs folder={FOLDER} imgs={["deepthroat"]} />

      <ArticleText
        text={`I'll sweep and flick at the resting powder, scraping with clumpy gloves 
      across the rounded shelves as though with the numb hand of a mannequin, only seeing and 
      hearing the threads catching on the granite crystals.`}
      />

      <ArticleText
        text={`Not then, but now as I lie duveted in London, the light flakes of snow 
      feel sibling to caked chalk. Lifted off my fingertips by a warm wind. Just at the end of 
      my nose, my index presses over a crease in a pitted dish of brown Rhiolite. Veins and marks 
      like the fossilised bark of an Ash.`}
      />

      <ArticleImgs folder={FOLDER} imgs={["Shelterstone"]} />

      <ArticleText
        text={`We weren't the first climbers to be marooned in Chamonix valley, 
        risking no more than wet baguette in a dash from the boulangerie. There were pubs
        and there was a dribbling hose pipe trained over a steep bank that was surfaced with chicken wire. The pubs for drinking,
        and the hose for a man-made ice wall, formed when temperatures in the valley drop below freezing. A note on my
        experience at the ice wall, beyond which lies a dry tooling venue for those unimpressed by the ice:`}
      />

      <ArticleText
        containerStyle={{ paddingLeft: "15%" }}
        textStyle={{ color: "grey" }}
        text={[
          `"The flared secondary points on the front of my crampons catch in and out 
      of the gaps in the chicken wire, pinned to the cliff face and loosely carrying wet 
      shields of crumbling ice. Abseiling and tiptoeing down the slumping wall of slush. 
      Behind the hikers fence, over the edge and into a humid ravine. Wet twigs stick up 
      through the heavy snow which is melting across the track."`,
        ]}
      />

      <ArticleImgs folder={FOLDER} imgs={["canyoning", "izzybelaying"]} />

      <ArticleText
        text={`The sides of everything drip. M6 routes on the steep wet walls above look 
      left alone. Ragged dangling ropes and pissing gullies mix into a saturated atmosphere of 
      tense and quiet awe.`}
      />
      <ArticleImgs folder={FOLDER} imgs={["wetdrytooling"]} />

      <ArticleText
        text={`There is an easier route tucked away higher up the gorge. A shallow slab 
      followed by a roof. It's short and the belay is in sight. I'm confident I can make it to the 
      top of the slab, so I volunteer to tie in. My forearms are screaming on the roof. I have 
      couple of goes, and the others try. It's getting darker and it was never really light. There 
      was still some canyoning and a section of Via Ferrata to tackle to get back to the footpath. 
      It wasn't the day we were expecting, but it was an adventure.`}
      />

      <ArticleImgs folder={FOLDER} imgs={["wirefront"]} />

      <ArticleText
        text={`My brother was filling up his water bottle from the icy hose by the CIC 
      Hut. Gazing up at the familiar shapes of the buttresses in Coire na Ciste, we came up 
      with a plan. It was noon, we'd driven across from the Cairngorms the night before. There was 
      promise of thick ice on Ben Nevis. I had a theory that the enthusiastic reports had more to 
      do with the underwhelming season to date, combined with very limited snow cover. The ice is 
      like that most years, it just doesn't normally flash against the black crags of 
      summer.`}
      />

      <ArticleImgs folder={FOLDER} imgs={["iceline"]} />

      <ArticleText
        text={`Short on daylight we set off together up the frozen trickle where a Grade 
      II snow gully used to be. We chipped up, onto and over hanging icebergs that were stranded by 
      the retreating snow pack. Roped together now, and leading up to the narrowing exit, I turned around. 
      Afraid that I might detatch the sculpture from the sweating walls of the gully, bringing 
      everything down. My brother set off up the alternative. The loose buttress to our right, 
      held together with moss and snow. We topped out onto a crisp mound overlooking the rest of 
      the coire. Low in the sky, the sun came through the clouds. It was disappointing how little 
      progress we'd made. I wonder: had the line been hard on paper we might not have been 
      disheartened. And yet we didn't need a number on paper to know that we hadn't just climbed a Grade 
      II snow gully. Something didn't add up.`}
      />

      <ArticleImgs folder={FOLDER} imgs={["gapinclouds"]} />

      <ArticleText
        text={`There wasn't daylight for the Cascades. We simul-climbed Number Two Gully 
      Buttress, chasing a daylight belay. We let the ascents that other climbers made on the 
      mountain that day over-shadow the wildly shaped ice-waves that we climbed. We might have 
      missed the satisfaction to be found in a day moving swiftly and curiously from the bottom to 
      the top.`}
      />

      <ArticleImgs folder={FOLDER} imgs={["smiledark"]} />

      <ArticleText
        text={`The wind and the rain didn't relent in Chamonix. The Aigulle du Midi 
      stayed closed. We kept scouring weather forecasts and avalanche reports, while we skied knee-deep
      powder in the resort. We joked about how much money we were spending until it became 
      too sore to be funny. We took our ski-touring sets back to the shop to rent cheaper downhill 
      skis and a snowboard. The joke became which topics were not to be mentioned under any circumstances. Lizzie had bite marks on her 
      tongue after a high speed crash in the worst snow of the season, somehow only a couple of days after 
      the best snow of the season. The freezing temperature rose above the highest peaks and we were skiing in 
      the rain. We would have been spending a lot of money and having no fun if we took things too 
      seriously. Or if we expected what we'd expected. As it turned out we spent more time in hysterics
       than we did climbing snow or ice, and that isn't a metric that I'm going to start using for planning
       but it's the most important when there's no ice to be climbed.`}
      />
      <ArticleImgs folder={FOLDER} imgs={["snowboard", "teeth"]} />
      <ArticleText
        text={`So what makes an adventure and how do you plan them? Maybe I'll find out next time.
        For now, I find them scribbled in the margins of photos - the long arm of expectation just out of reach.`}
      />

      <ArticleImgs folder={FOLDER} imgs={["metenzing"]} />
    </div>
  </>);
};

export default ReflectionScreen;
