import GithubSVG from "../assets/Github";
import "../styles/Footer.scss";

export default function Footer() {
  return (
    <footer>
      <a
        className="git-link"
        href="https://github.com/bmilcs/odin-shopping-cart"
      >
        <GithubSVG className="github-svg" />
        bmilcs
      </a>
    </footer>
  );
}
