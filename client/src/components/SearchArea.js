import React, { useState } from "react";
import { TextField, Button, Select, MenuItem, Grid, Typography } from "@material-ui/core";

function SearchArea(props) {
  const [name, setName] = useState("");
  const [hitpoint, setHitpoint] = useState({ hp: "", op: "" });
  const [rarity, setRarity] = useState("");

  const isObjEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const searchButtonHandler = () => {
    // build query
    let query = {};
    if (name) {
      query.name = name;
    }
    if (hitpoint.hp && hitpoint.op) {
      query.hp = hitpoint.hp;
      query.op = hitpoint.op;
    }
    if (rarity) {
      query.rarity = rarity;
    }

    if (!isObjEmpty(query)) {
	  // build query
		props.onSetQuery(query);
    }
  };

  const cleanButtonHandler = () => {
    setName("");
    setHitpoint({ hp: "", op: "" });
    setRarity("");
    props.onClearQuery();
  };

  const setNameHandler = (newName) => {
    if (!newName) {
      newName = "";
    }
    setName(newName);
  };

  const setRarityHandler = (newRarity) => {
    if (!newRarity) {
      newRarity = "";
    }
    setRarity(newRarity);
  };

  const setHitpointOpHandler = (newOp) => {
    if (!newOp) {
      newOp = "";
    }
    let hp = hitpoint && hitpoint.hp ? hitpoint.hp : "";
    setHitpoint({ hp: hp, op: newOp });
  };

  const setHitpointHpHandler = (newHp) => {
    if (!newHp) {
      newHp = "";
    }
    let op = hitpoint && hitpoint.op ? hitpoint.op : "";
    setHitpoint({ hp: newHp, op: op });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item>
            <Typography>Name:</Typography>
          </Grid>
          <Grid item>
              <TextField onChange={(event) => setNameHandler(event.target.value)} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item>
            <Typography>Rarity:</Typography>
          </Grid>
          <Grid item>
            <Select
              onChange={(event) => setRarityHandler(event.target.value)}
              value={rarity}
            >
              <MenuItem value="" key="no_rarity">Search By:</MenuItem>
              <MenuItem value="Common" key="common">Common</MenuItem>
              <MenuItem value="Uncommon" key="uncommon">Uncommon</MenuItem>
              <MenuItem value="Rare" key="rare">Rare</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography>Hitpoint:</Typography>
          </Grid>
          <Grid item>
            <Select
                    onChange={(event) => setHitpointOpHandler(event.target.value)}
                    value={hitpoint.op}
                  >
                    <MenuItem value="" key="noop">Operator</MenuItem>
                    <MenuItem value="eq" key="eq">Equal</MenuItem>
                    <MenuItem value="gt" key="gt">Greater than</MenuItem>
                    <MenuItem value="lt" key="lt">Less than</MenuItem>
                    <MenuItem value="gte" key="gte">Greater than or equal</MenuItem>
                    <MenuItem value="lte" key="lte">Less than or equal</MenuItem>
                  </Select>
            </Grid>
            <Grid item>
              <TextField type="number"
                    onChange={(event) => setHitpointHpHandler(event.target.value)}
                  />
            </Grid>
          </Grid>
      </Grid>
      
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item>
              <Button onClick={searchButtonHandler} color="primary" variant="contained">
                Search!
              </Button>
          </Grid>
          <Grid item>
            <Button onClick={cleanButtonHandler}  color="secondary" variant="contained">
              Clear Result
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SearchArea;
