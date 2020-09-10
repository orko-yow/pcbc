import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography} from "@material-ui/core";
import { red, grey } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

/**
 * Disclaimer: This is based on an example in https://material-ui.com/components/cards/
 */

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    flexGrow: 1,
    backgroundColor: grey[40]
  },
  media: {
    height: 150,
    paddingTop: '100%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function PokemonCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  return (
    <Card className={classes.root} key={props.card.id}>
      <CardHeader
        avatar={
          <Avatar aria-label="pokemon-card" className={classes.avatar}>
            {props.card.name[0]}
          </Avatar>
        }
        title={props.card.name}
        subheader={props.card.backupId}
      />
      <CardMedia
        className={classes.media}
        image={props.card.imageUrl}
        title={props.card.name}
      />
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Card Details:</Typography>
        </CardContent>
        <CardContent>
          <Typography paragraph variant="caption">{JSON.stringify(props.card)}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default PokemonCard;
