const axios = require("axios");
const POKEMONCTG_API_BASE="https://api.pokemontcg.io/v1/cards?setCode=";

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

const GetPokeCards = async (setCode) => {
    if(!setCode) {
        return {
            statusCode: 401,
            body: JSON.stringify("Missing pokemon set key")
        }
    };

    let pokeUrl = POKEMONCTG_API_BASE + setCode;
    const response = await axios.get(pokeUrl);
    return response.data.cards;
};

const GetPokeCardsToBeStored = async (setCode, backupName) => {
    // generate backup name:
    let cards = await GetPokeCards(setCode);
    return UpdateCardsWithBackupId(cards, backupName);
}

module.exports = {
    RemoveBackupIdFromCards: RemoveBackupIdFromCards,
    GetPokeCards: GetPokeCardsToBeStored
}