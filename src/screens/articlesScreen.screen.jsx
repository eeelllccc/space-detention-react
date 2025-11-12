import NavBar from "../components/navBar.component";
import ArticlePreview from "../components/articlePreview.component";
import { getImgByPageAndInclude } from "../functions/imageSearching.functions";
import { useContext } from "react";
import { LinksContext } from "../contexts/links.context";
import { useNavigate } from "react-router-dom";

const ArticlesScreen = () => {
  const { contentLinks } = useContext(LinksContext);
  const navigate = useNavigate();

  const imageRefs = [
    {
      ref: "2202ecrins",
      blurb: "A long short weekend, a steep learning curve and squirty cream.",
      date: "04.02.22",
      title: "Where to look",
      route: "/WhereToLook",
    },
    {
      ref: "2203benNevis",
      blurb: "Tactics, a tent and a tiring tick list.",
      date: "18.03.22",
      title: "In the pursuit of a lie in",
      route: "/InThePursuitOfALieIn",
    },
    {
      ref: "2209yosemite1",
      blurb: "Learning how to aid-climb, and why not to.",
      date: "29.09.22",
      title: "Land of the Giants: Part One",
      route: "/LandOfTheGiantsPartOne",
    },
    {
      ref: "2209yosemite2",
      blurb:
        "Life's not a fashion show, but style matters. Rom-com or tragedy?",
      date: "08.10.22",
      title: "Land of the Giants: Part Two",
      route: "/LandOfTheGiantsPartTwo",
    },
    {
      ref: "2308reflection",
      blurb: "What is an adventure and how not to look for it.",
      date: "14.08.23",
      title: "Escaping expectation",
      route: "/EscapingExpectation",
    },
    {
      ref: "2403Norway",
      blurb: "What adventure means and how not to look for it.",
      date: "02.03.24",
      title: "Norway",
      route: "/Norway",
    },
    {
      ref: "2405scrambled",
      blurb: "What adventure means and how not to look for it.",
      date: "14.08.23",
      title: "Scrambled",
      route: "/Scrambled",
    },
  ];

  const articleContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingLeft: "5vw",
    paddingRight: "5vw",
    paddingTop: "60px",
  };

  return (
    <>
      <NavBar />
      {contentLinks && (
        <div style={articleContainer}>
          {imageRefs.map((item) => {
            const { blurb, date, title } = item;
            return (
              <ArticlePreview
                onClick={() => {
                  navigate(item.route);
                }}
                key={item.ref}
                imageLink={getImgByPageAndInclude(
                  "articleThumbnails",
                  item.ref,
                  contentLinks
                )}
                blurb={blurb}
                date={date}
                title={title}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default ArticlesScreen;
