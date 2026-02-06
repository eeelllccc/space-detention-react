import NavBar from "../components/navBar.component";
import ArticlePreview from "../components/articlePreview.component";
import { makeImgUrl } from "../functions/makeImgElement.functions";
import { useNavigate } from "react-router-dom";

const ArticlesScreen = () => {
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
      blurb: "What adventure means and how not to look for it.",
      date: "14.08.23",
      title: "Escaping expectation",
      route: "/EscapingExpectation",
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
      {(
        <div style={articleContainer}>
          {imageRefs.map((item) => {
            const { blurb, date, title } = item;
            return (
              <ArticlePreview
                onClick={() => {
                  navigate(item.route);
                }}
                key={item.ref}
                imageLink={makeImgUrl(
                  "articleThumbnails",
                  item.ref,
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
