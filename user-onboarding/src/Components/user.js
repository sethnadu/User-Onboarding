import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    width: "300px",
    backgroundColor: "#7abd8f",
    border: "2px solid #fffd9d"
  },
  title: {
    fontSize: "1.4rem",
    color: "#ff6138"
  },
  pos: {
    marginBottom: 12,
  },
});

function UserCard({user}) {
    console.log(user.name)
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className ={classes.title} variant="h5" component="h2">
          {user.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {user.email}
        </Typography>
        <Typography >
          {user.role}
        </Typography>
        
      </CardContent>
      <Typography className={classes.pos} color="textSecondary">
         <span>Created: </span> {user.createdAt}
        </Typography>
    </Card>
  );
}

export default UserCard;