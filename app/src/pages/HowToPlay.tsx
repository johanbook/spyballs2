import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Header from "../components/Header";

interface IHowToPlayProps {
  onClosePage: () => void;
}

export default function HowToPlay({ onClosePage }: IHowToPlayProps) {
  const url = window.location.hostname;

  return (
    <>
      <Header mx={{ mb: 3, marginTop: "15vh" }} />
      <Typography>
        Spyballs is a party game where one player at random is chosen to be a
        spy in secret. A location is revealed for all players except the spy,
        and the goal for the spy is to figure out the location without revealing
        his or her identity, while the other players try to figure out who the
        spy is.
      </Typography>

      <br />

      <Typography align="center" variant="h4">
        How to play
      </Typography>
      <Typography gutterBottom>
        To play every player should navigate to <b>{url}</b> on their phone.
        Create a game and have everyone join. When you are ready, start the
        game.
      </Typography>

      <Typography gutterBottom>
        Everyone except the spy can see the location and their role on their
        screen. Then, starting with the player that got the first question
        prompt and moving clockwise, everyone takes turn asking each other
        questions in order to try and figure out who the spy is (while the spy
        tries to figure out the location). You are allowed to ask whatever you
        want to whomever you want, and they can answer with as much or as little
        infrormation as they please. Some example questions are: "How often are
        you here?" "What are you wearing?" "How would you describe the
        atmosphere of this place?"
      </Typography>

      <Typography gutterBottom>
        The trick is to give away enough information so that the others learn
        that you are probably not the spy, without giving so much that the spy
        can figure out the location. After three rounds of questions, the game
        ends. Everyone then has to vote for who they think is the spy,
        whereafter the spy gets to reveal themselves. If the spy did not get the
        most votes, she wins. If she was found out however, she can still win if
        she can correctly guess the location of the players. If she guesses the
        wrong location, all other players win.
      </Typography>

      <br />

      <Typography align="center" variant="h4">
        Like the game?
      </Typography>
      <Typography>Buy us a coffee! ☕</Typography>

      <br />

      <Button
        fullWidth
        onClick={onClosePage}
        style={{ marginBottom: 30 }}
        variant="outlined"
      >
        Back
      </Button>
    </>
  );
}
