import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import SearchArea from "../components/SearchArea";
import CardsGrid from "../components/CardsGrid";

import { searchCards } from "../helpers/API";

function SearchCardsPage(props) {
  const [cards, setCards] = useState([]);

  const isObjEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

	const searchButtonHandler = (query) => {
		if (!isObjEmpty(query)) {
	  		// build query
    		const getAllCards = async (q) => {
        		if (q) {
          			let allCards = await searchCards(q, props.token);
          			setCards(allCards);
        		}
      		};
	      	getAllCards(query);
		}
	};

	const clearCards = () => {
		setCards([]);
	}

	return (
		<Grid container spacing={4}>
			<Grid item xs={12}>
        		<Typography variant="h4">Search PokemonCards</Typography>
	    	</Grid>
			<Grid item xs={12}>
				<SearchArea onSetQuery={searchButtonHandler} onClearQuery={clearCards}></SearchArea>
			</Grid>
			<Grid item xs={12}>
				<Typography>Displaying {cards ? cards.length : 0} card(s):</Typography>
			</Grid>
			<Grid item xs={12}>
				<CardsGrid cards= {cards} key="cardsGrid">
				</CardsGrid>
      		</Grid>
		</Grid>
  );
}

export default SearchCardsPage;
