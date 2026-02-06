import ArticleText from "../../components/articleText.component"
import ArticleImgs from "../../components/articleImgs.component"
import ArticleHeader from "../../components/articleHeader.component"
import NavBar from "../../components/navBar.component"

const BenNevisLieInScreen = props => {
    const FOLDER = '2203BenNevis'

    const screen = {

    }

    return(<>
        <NavBar/>
        <div style={screen}>
            <ArticleHeader text='In the pursuit of a lie in' date='18.03.22'/>
            <ArticleImgs folder={FOLDER} imgs={['thumbnail']}/>

            <ArticleText indent={true} text={`It seems to be a common debate on the internet. Is it better to wild camp
                 in the Corrie at the base of Ben Nevis, or walk to and from the car park every day?`}/>

            <ArticleText text={`Prized, precarious and elusive are the winter climbing objectives on Ben Nevis. Short
                 windows of workable conditions come and go in a flash. Our strategy - a favourite - is a last minute
                  scramble on the back of a promising four day forecast. And a scramble it was, from work to Euston to 
                  Glasgow, then onwards aboard the late night Scotrail service. The wide-open windows were rattling against
                   the gushing warm-dark air. The last of the first rays of spring sun skipped across the River Clyde.`}/>
                   
            <ArticleImgs folder={FOLDER} imgs={['glasgow']}/>

            <ArticleText containerStyle={{paddingLeft:'30%'}} textStyle={{color:'grey'}} text={[
                `Dalmuir, Dumbarton, Holensburgh.`,
                `Garelochhead, Arrochar, Tarbet.`,
                `Ardlui, Crianlarich, Tyndrum.`,
                `Rannoch, Corrour, Tulloch.`]}/>
            <ArticleText containerStyle={{paddingLeft:'30%', paddingTop:'0'}} textStyle={{color:'grey'}} text={`Fort William.`}/>
    
            

            <ArticleText indent={true} text={`Fort William station backs onto a Morrisons carpark. There I find the vauxall Vivaro, 
                sliding door ajar, and orange light steaming from kale and sausages. We finalise a plan.`}/>

            <ArticleText containerStyle={{paddingLeft:'15%',paddingRight:'15%'}} text={`Day 1 - Hike in with big bags, stash camping gear and food for 3 days, continue up
                    an easy route with a light rack and 1 rope, return to the van.`}/>
            <ArticleText containerStyle={{paddingLeft:'15%',paddingRight:'15%'}} text={`Day 2 - Early start, hike in with a full rack of gear and both ropes, climb 
                    something big, return to the tent.`}/>
            <ArticleText containerStyle={{paddingLeft:'15%',paddingRight:'15%'}} text={`Day 3 - Have a lie in (relatively speaking), pack away and re-stash the gear, 
                    quick saunter to a short, hard climb. Return to the tent in good time.`}/>
            <ArticleText containerStyle={{paddingLeft:'15%',paddingRight:'15%'}} text={`Day 4 - Early start, pack away and re-stash, start climbing at sunrise. Top-out at
                    noon, descend to stashed gear, re-pack all climbing and camping gear into big bags (which should now fit in
                    the absence of 3 days food), walk out back to the van. Catch my train at 19:50.`}/>

            <ArticleText text={`Planning all of this at 1am in the Morrisons carpark involved a late night,
                 filling ziplock bags with Huel, oats and protein powder, and labeling them with a sharpee. This did feel a little 
                farcical at the time.`}/>

            <ArticleText indent={true} text={`Day one - Tower Ridge 800m - "This provides perhaps the finest mountaineering expedition in
                Scotland." (SMC Guidebook) `}/>


            <ArticleImgs folder={FOLDER} imgs={['ridge','ridge2']}/>



            
            <ArticleText text={`It felt pretty special to stride up the ridge with my brother on such a fine day. I remember saying it
                would have been worth all the logistics and faffing, even to have just spent that one day on the mountain.`}/>
            <ArticleText indent={true} text={`Day 2 - Orion Direct 400m - "One of the finest winter climbs in Scotland, with all the atmosphere of a 
                major alpine face." (SMC Guidebook)`}/>

            <ArticleImgs folder={FOLDER} imgs={['lookUp']}/>



            <ArticleText indent={true} text={`A king line in an amphitheatre of rock, snow, and ice. Protrusions, gullies, 
                gaps, sun tipped ridges. Bulging buttresses, dark slabs. Sweeping bowls below perched ledges. Summits 
                and sub-summits, crowning tips and tops. A King line has its place in the imagination, ambition, 
                and ego of fresh legged climbers at the foot of the mountain. The tourist track, round the back,
                takes you to the top in a couple of hours. Yet, hundreds of routes lead to the summit, some straight up the 
                North Face. `}/>

            <ArticleText indent={true} text={`My brother is perched below a head height wall of rock. It's glassy
                 with a coat of ice. Bottomed-out on the rock beneath the thin ice are stainless steel screws and hooks that decorate the wall.
                  They offer who knows what in the way of security. After a brief exchange of gear, and a briefer exchange about
                   the quality of the 'anchor' we are stationed at; it's my turn to lead onwards.`}/>

            <ArticleImgs folder={FOLDER} imgs={['leadOn']}/>

            <ArticleText text={`I swing an axe high above my head, reaching 7ft above our perch, with hopes of sticking a patch of ice.
                 It's usually pooled and piled up thicker just behind the top lip of the wall. Thankfully Mum and Dad are both tall. It's a 
                 challenge finding any purchase with my crampon front-points on the coarse granite beneath the delaminating ice. 
                 That's all there is on the blank face of the wall at knee height.`}/>

            <ArticleImgs folder={FOLDER} imgs={['crux']}/>

            <ArticleText text={`Looking ahead, a rare and sought after prize. A narrow corridor of exposed rock with fine 
                cracks in the wall that might just take a nut. The sweet delight of safer, predictable rock protection brings on a grin
                amidst the mosaic of partially screwed, probably dreadful, fixtures and fittings we've been relying on to
                stay attached to the wintery face. It's a pleasure and a comfort. The feeling of a beer and cheeseburger
                in some other land. Warm plastic cheese and a warm cushioned bench.`}/>

            <ArticleText text={`A rippling, clear-blue arm of  water-ice reaches into the rock corridor from the slopes above.
                 This vertical exit into the sunny snow fields beyond, presents a final knee trembling effort
                  to be savoured.`}/>

            <ArticleImgs folder={FOLDER} imgs={['summitPose','summit']}/>

            <ArticleText indent={true} text={`Only, the photos above weren't taken from the summit that day. They were taken the day
                before, when the views both of far away Loch Linnhe, and nearby cornices were bright and clear. The day we climbed 
                Orion Face we were reminded that the top is halfway, even on the days you least expect it. At the belays we enjoyed
                all the white slopes of the winter panorama, and we watched climbers in the distance questing up Tower Ridge.`}/>

            <ArticleImgs folder={FOLDER} imgs={['calm1','calm2']}/>


            <ArticleText text={`However, moments after reaching the top, the building southeasterly wind pulled a freezing whiteout over the mountain. Visibilty
                was reduced to around 17 paces and the boundary between the grey snow and the grey cloud became indistinguishable as night
                fell. Far away Loch Linnhe wasn't on our minds, but the nearby cornices were. Great sleeping beasts, deadly
                and still, 50 or so paces into the dense whiteness.`}/>
            <ArticleText text={`Making safe progress relies on acurately following a bearing in the absense of
                any features on the blank icy crust beneath your feet. At times, the snowy surface resembles more of a moving magic carpet
                as the wind sweeps spindrift across the ground around your boots. The solution is a slinky-like shuffle know as a back-bearing.
                My brother walks on, while I stand rooted to the spot. He becomes a fading silouette, vanishing altogether when a particularly
                dense clump of whiteness rushes between us. Turning around to face me, 17 paces await, he uses my stationary grey outline to 
                position himself on our bearing. A satisfied wave calls me over to stand as a marker for our new waypoint. I count paces as I 
                walk and clip bits of climbing gear to my rucksack strap to record our distance travelled.`}/>
            <ArticleText text={`Rinse and repeat. Covering hundreds of meters across the summit plateau in this style takes over an
                 hour. We arrive at an intersection with the tourist track, exhausted and uninspired by the 90 minute march back to the 
                stashed tent.`}/>

            <ArticleImgs folder={FOLDER} imgs={['tent1','tent2']}/>

            <ArticleText indent={true} text={`Packed lunches and dinners need careful consideration when you're away from the van
                for three days. Mustn't be heavy, ought not to go off, and defintely shouldn't remind you of real food - lest you
                come to and wonder what on earth you are doing. Lunch - half a stick of chorizo, 250g cheese (only the edges go stale),
                3 packs of oatcakes, dried mango, chocolate, nuts. All in the same bag for swift access. My brother didn't
                hesitate to remind me that an engineer would keep the oatcakes wrapped in their packs of 5. Strength in
                numbers - it was all a crumby joke.`}/>
            

            <ArticleText text={`Delicious Decathlon dinner (I would be open to sponsorship) - the finest of their
                freeze-dried range - "Puree de pomme de terre a la viande hachee". I'm convinced the warm bath of carbs and salty meat
                would bring a thank-god tear and a grin anywhere, though I've only torn one open when I've been very hungry. I
                have also found that those able to translate the description don't get on as well.`}/>

            <ArticleImgs folder={FOLDER} imgs={['cheese']}/>

            <ArticleText indent={true} text={`How to tear a climber away from his diesel heated Van in favour of a tent pitched on snow?
                With great difficulty. Promising pomme de terre a la viande hachee won't work every time. A 30 minute walk from the
                tent to Minus Two Gully will always be an attractive proposition. Day 3 - "A magnificent and 
                classic climb - one of the finest of the Nevis gullies." (SMC Guidebook)`}/>

            <ArticleImgs folder={FOLDER} imgs={['pullRopes']}/>

            <ArticleText indent={true} text={`The final day had an ambitions agenda, and an appropriately grandiose route description. 
                Point Five Gully 325m - "An outstanding climb, probably the most famous ice gully in the world!" (SMC Guidebook).
                Observatory gully was quiet at 5:30am. The steep approach slopes were warm, the air clammy, and it was a battle
                to make good time. We climbed one and a bit pitches before deciding to back-off. The ice screws didnt feel at all secure
                in the slushy ice. The spindrift was wet and heavy. It would only get worse with the cornice in the spring sun on
                such a humid day.`}/>

            <ArticleImgs folder={FOLDER} imgs={['retreat']}/>


            <ArticleText text={`As we kitted down with the climbers kitting up at the bottom of the approach slopes, we passed
                on our thoughts about the conditions and joked that we might have simply lost our mojo after such a tiring three days.
                Between the two of us, we decided it might have been the mountain refusing to let four of its finest routes go in
                one push.`}/>


            <ArticleText indent={true} text={`With big bags, tired calves and a waning desire to be in the steep shadow of the north face,
                we made for the van. We felt as though we might be walking away from the final cold snap of the season. Even if the Scottish
                winter season wasn't infact over, I felt over it for this year. Our thoughts and chatter and turned towards the start of
                the trad season. It certaily felt as though the last four days represented a milestone in our winter climbing experience.
                The plan to just get on some grade Vs because it'll be probably be engaging yet managable, still sounded reasonable
                four days later. And what a way to spend a long weekend with your brother.`}/>

            <ArticleImgs folder={FOLDER} imgs={['laugh1','laugh2']}/>
            <ArticleImgs folder={FOLDER} imgs={['haze']}/>
            <ArticleImgs folder={FOLDER} imgs={['ol','meSummit']}/>
            <ArticleImgs folder={FOLDER} imgs={['climb1','climb2']}/>
            <ArticleImgs folder={FOLDER} imgs={['sunset','yawn']}/>
            <ArticleImgs folder={FOLDER} imgs={['cmd']}/>
            <ArticleImgs folder={FOLDER} imgs={['1color','2color']}/>
            <ArticleImgs folder={FOLDER} imgs={['art1','art2']}/>
            <ArticleImgs folder={FOLDER} imgs={['robin']}/>
            <ArticleImgs folder={FOLDER} imgs={['hands','van']}/>

        </div>
    </>)
}

export default BenNevisLieInScreen
