import ArticleText from "../../components/articleText.component"
import ArticleImgs from "../../components/articleImgs.component"
import ArticleHeader from "../../components/articleHeader.component"
import NavBar from "../../components/navBar.component"

const ArticleNameScreen = props => {
    const FOLDER = 'imagesFolderName'

    const screen = {

    }

    return(<>
        <NavBar/>
        <div style={screen}>
            <ArticleHeader text='articleName' date='04.02.22'/>
            <ArticleImgs folder={FOLDER} imgs={['thumbnail']}/>

            <ArticleText indent={true} text={``}/>
            <ArticleText text={``}/>

            <ArticleImgs folder={FOLDER} imgs={['']}/>
        </div>
    </>)
}

export default ArticleNameScreen
