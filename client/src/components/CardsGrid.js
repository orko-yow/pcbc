import React from 'react';
import { Grid } from '@material-ui/core';
import PokemonCard from "./PokemonCard";

function CardsGrid(props) {
	return (
		<div>
			<Grid container spacing={3}>
				{props.cards.map((card) => (
					<Grid item xs={4} md={3} lg={2} key={"pmon-grid-" + card.id}>
						<PokemonCard card={card} key={"pmon-card-" + card.id}>
						</PokemonCard>
					</Grid>
				))}
			</Grid>
		</div>
	);
}

export default CardsGrid;
