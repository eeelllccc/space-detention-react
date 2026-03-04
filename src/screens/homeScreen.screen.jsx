import CoverImage from "../components/coverImage.component"
import NavBar from "../components/navBar.component"
import { useNavigate } from "react-router-dom"
import '../styles/accentButton.style.css';
import "../styles/homePageText.style.css"

const HomeScreen = () => {
    const navigate = useNavigate();

    return (
        <>
            <NavBar/>
            <CoverImage folder={'homePage'} img={'glen'} text={[
            `Welcome to this small pocket of the Internet,`,
            `I hope you find open space.`
            ]}
            textContainerStyle={{top: '70%'}}
            headerClassName={'coverText'}
            headerStyle={{zIndex:'98'}}
            button={{
                onClick:()=>{navigate('/Articles')},
                text:'Read more',
                className:'accentbutton',
                style:{
                    width:'150px',
                    marginTop:'40px',
                    display:'flex',
                    justifyContent:'center',
                    marginLeft : '0px',
                    zIndex : '98',
                    position: 'relative'
                },
            }}
            />
            <CoverImage folder={'homePage'} img={'gearpile'}/>
            <div style={{backgroundColor: 'black', height: '100px', position: 'relative'}}></div>
            <CoverImage folder={'homePage'} img={'howbig'} />
        </>
    )
}

export default HomeScreen