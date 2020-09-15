const axios = require("axios");
const POKEMONCTG_API_BASE="https://api.pokemontcg.io/v1/cards?setCode=";

// This function adds unique backup Id (future)
const UpdateCardsWithBackupId = (cards, backupId) => {
    return cards.map((card)=> ({
            ...card,
            backupId: backupId    
    }));
};

const RemoveBackupIdFromCards = (cards) => {
    return cards.map((card)=> {
        if(card.backupId) {
            delete card.backupId;
        }
        return card;
    })
};

// This function fetches the cards using PokemonCTG API
const __GetPokeCards = async (setCode) => {
    if(!setCode) {
        return {
            statusCode: 401,
            body: JSON.stringify("Missing pokemon set key")
        }
    };
    const pokeUrl = POKEMONCTG_API_BASE + setCode;
    const response = await axios.get(pokeUrl);
    return response.data.cards;
};

const GetPokeCardsToBeStored = async (setCode, backupName) => {
    // generate backup name:
    let cards = await __GetPokeCards(setCode);
    return UpdateCardsWithBackupId(cards, backupName);
}

module.exports = {
    RemoveBackupIdFromCards: RemoveBackupIdFromCards,
    GetPokeCardsAndAddReference: GetPokeCardsToBeStored
}