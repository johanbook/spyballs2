import Typography from "@mui/material/Typography";

interface IGameNameProps {
  gameName: string;
}

export default function GameName({ gameName }: IGameNameProps) {
  return (
    <div style={{ marginBottom: 20, marginTop: 15, textAlign: "center" }}>
      <Typography color="textSecondary" variant="body2">
        Use the code <b>{gameName}</b> to join this game!
      </Typography>
    </div>
  );
}
