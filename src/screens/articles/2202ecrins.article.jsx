import ArticleText from "../../components/articleText.component"
import ArticleImgs from "../../components/articleImgs.component"
import ArticleHeader from "../../components/articleHeader.component"
import NavBar from "../../components/navBar.component"

const EcrinsIceScreen = props => {
    const FOLDER = '2202EcrinsIce'
    const screen = {

    }


    return(<>
        <NavBar/>
        <div style={screen}>
            <ArticleHeader text='Where to look' date='04.02.22'/>
            <ArticleImgs folder={FOLDER} imgs={['thumbnail']}/>
            <ArticleText indent={true} text={`A ringing ear and a bleeding lip. Faint headache, numb toes, burning fingers.
                 Fading light.`}/>
            <ArticleText text={`A chunk of ice, smacked behind the ear, the now bulging base of the skull bone. 
                Whistling, screaming, Catherine wheeling. Feels like my incisor is knocked in a bit. Is the blood 
                from the gum or my lip.`}/>
            <ArticleImgs folder={FOLDER} imgs={['ollyByVan']}/>
            <ArticleText indent={true} text={`A sleeper train into the Alps after work on Thursday. My brother and Elin parked
                 beside the frigid platform, 8am, in his freshly converted van. We'll drive up into the Fournel
                  Valley. An icy carpark at 1500m, skirted by a two-meter bank of ploughed snow. Beyond, a corridor
                   of 3000m snowy tops. They tower above a winding path of packed neve - to be tackled on foot.
                    Either side of the path, indistinguishable white stuff: in fact, a thin crust hiding thigh deep 
                    powder, and answering with an exhausting clamber back onto the elusive trail.`}/>
            <ArticleText text={`Waterfalls, hanging solid, plaster the valley walls. We start up a route called 
                "Beating the retreat".`}/>
            <ArticleImgs folder={FOLDER} imgs={['walkIn','me.jpg']}/>
            <ArticleImgs folder={FOLDER} imgs={['bootsOn2','bootOn1','elinFaceUp']}/>

            <ArticleText text={`19:34 -- OMG... why are you in the dark ??? Have you got back down yet?? --`}/>

            <ArticleImgs folder={FOLDER} imgs={['nightFalls','sunset.jpg']}/>

            <ArticleText indent={true} text={`Climbing ice in the dark gets scary quick. On the steep bits it's hard to get 
                your headtorch to illuminate your boots and front points - or even the ice below your knees that
                 you're trying to kick into. This leaves you with an underwhelming confidence in the stuckness of 
                 your crampons.`}/>
                 
            <ArticleText text={`One hand tight around an ice axe plated above you, the other faffing in an ice screw. 
                Deep breaths here, as you imagine your feet becoming unstuck - you can't feel the ice with your toes,
                 there's none of the comforting feedback you take for granted when climbing in thin rubber rock
                  shoes. The world outside of your headtorch beam is very much out of sight, out of mind.`}/>

            <ArticleText indent={true} text={`Olly has stopped. He's abseiled to an edge, 5m below the anchor I'm fixed to. 
                "Is it not that way?", I ask.
                "Probably is, just looks a bit committing."`}/>

            <ArticleImgs folder={FOLDER} imgs={['nightAbseil1']}/>

            <ArticleText indent={true} text={`Descending in the dark actually feels much safer. Abseiling down vertical ice 
                often left you hanging in free space. The ice your feet were pushing out against often turned out
                 to be a huge icicle hanging above the cave you now find yourself hanging in.`}/>
            <ArticleText text={`The transition involves a precarious and surreal process of palming off on the 
                thin tip of the hanging ice and letting your legs loose into the dark void behind. Chest now against
                 the tip of the icicle, you pray it doesn't
                    shatter now or in the minutes to follow when you are directly beneath it. I'd rather be doing all
                     that in the cool of the evening - not at 3pm when it's all a bit melty and loose.`}/>

            <ArticleImgs folder={FOLDER} imgs={['nightAbseil2']}/>

            <ArticleText text={`20:00 "We can't forget to send a message to mum when we get down. Feel like she might
                 be worrying after you put that video in the chat." `}/>

            <ArticleText text={`Olly laughs, "Thought they may as well see what we are up to." The video, tapping,
                 chipping, and crunching up the start of the final pitch as night falls over the quiet icy bulges above.`}/>
            <ArticleText text={`22:02 --  yes down now, you can stop worrying! -- `}/>

            <ArticleImgs folder={FOLDER} imgs={['howBig','cream']}/>

            <ArticleText indent={true} text={`There were three in the bed and the little one said, I'll sleep in the carpark
                 because it's a Vauxhall Vivaro. An alarm clock idea: A slowly deflating roll mat and two sheets of
                  nylon between you and the snow. (Also found to work well with frozen tarmac.)`}/>

            <ArticleImgs folder={FOLDER} imgs={['tent']}/>

            <ArticleText indent={true} text={`Morning of the final day 08:20,
                down in Briançon, I've packed up the tent. Across the road, the boulangerie offers a croissant and
                 the first bean to cup for a few days. I play Moment of Surrender through my headphones as the
                  golden light timidly re-acquaints with the tips of the tallest tops.`}/>

            <ArticleImgs folder={FOLDER} imgs={['sunsetRidge','brianconSunset']}/>

            <ArticleText containerStyle={{paddingLeft:'20%'}} textStyle={{color:'grey'}} text={[
                `Every song does end,`,
                `This coffee, finished.`,
                `The sun sets over mountains.`,
                `I'll leave this place until I return - `,
                `and that's the way it should be.`,
                `Not a world of endless verses, bottomless coffees and static sunsets.`
                ]}/>

            <ArticleImgs folder={FOLDER} imgs={['sunrise','moon']}/>

            <ArticleText text={[
                `Lessons learnt:`,
                `Don't look down.`,
                `Don't look up.`,
                `If the ice is brittle, ignore 1 & 2 and look anywhere other than at your ice axes.`,
                `Post descent squirty cream is a must.`,
                `Leave earlier if the route name jokes about returning in the dark.`,
                `Les Ecrins is even more beautiful in the winter.`
                ]}/>

            <ArticleImgs folder={FOLDER} imgs={['ollyMidFace','ollyLaugh']}/>
            <ArticleImgs folder={FOLDER} imgs={['elinSideOn','elinBehind']}/>
            <ArticleImgs folder={FOLDER} imgs={['abseilTat','dayAbseil']}/>
            <ArticleImgs folder={FOLDER} imgs={['ollyClimb','sunset2']}/>
            <ArticleImgs folder={FOLDER} imgs={['smile','elin.jpg']}/>
            <ArticleImgs folder={FOLDER} imgs={['cheese','moose']}/>
            <ArticleImgs folder={FOLDER} imgs={['1.jpg','4.jpg']}/>
            <ArticleImgs folder={FOLDER} imgs={['2','3']}/>
            <ArticleImgs folder={FOLDER} imgs={['climb1','climb2']}/>
            <ArticleImgs folder={FOLDER} imgs={['gear1','gear2']}/>
            <ArticleImgs folder={FOLDER} imgs={['rack1','rack2']}/>
            {/* <ArticleImgs folder={FOLDER} imgs={['end1','end2']}/> */}

        
        </div>
    </>)
}

export default EcrinsIceScreen
