import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import confirm from "../assets/images/confirm.png";
import death from "../assets/images/death.png";
import recover from "../assets/images/recover.png";
import { fetchCovid } from "../store";
import Box from "@material-ui/core/Box";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import { countryToFlag } from "../utils";

const cases = [
  { name: "confirm", label: "Confirmed", color: "secondary", image: confirm },
  { name: "death", label: "Death", color: "error", image: death },
  { name: "recover", label: "Recovered", color: "primary", image: recover }
];
const useStyles = makeStyles({
  root: {
    width: 345
  },
  media: {
    height: 140
  }
});

function CovidCard(props) {
  const classes = useStyles();
  let newConfirmed;
  let newDeaths;
  let newRecovered;
  let totalConfirmed;
  let totalDeaths;
  let totalRecovered;

  if (props.summary) {
    newConfirmed = props.summary.NewConfirmed;
    newDeaths = props.summary.NewDeaths;
    newRecovered = props.summary.NewRecovered;
    totalConfirmed = props.summary.TotalConfirmed;
    totalDeaths = props.summary.TotalDeaths;
    totalRecovered = props.summary.TotalRecovered;
  }

  let all =
    props.type === "confirm"
      ? totalConfirmed
      : props.type === "death"
      ? totalDeaths
      : props.type === "recover"
      ? totalRecovered
      : "";
  let today =
    props.type === "confirm"
      ? newConfirmed
      : props.type === "death"
      ? newDeaths
      : props.type === "recover"
      ? newRecovered
      : "";

  return (
    <Box m={2} display="flex" justifyContent="center">
      <Card className={classes.root}>
        {props.loading && (
          <>
            <Skeleton variant="rect" width={345} height={140} />
            <Skeleton variant="text" width={345} height={140} />
          </>
        )}

        {props.loading || (
          <>
            <CardActionArea>
              <CardMedia className={classes.media} image={props.image} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {props.label}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h2"
                  component="h2"
                  color={props.color}
                >
                  {all}
                </Typography>

                <Typography
                  gutterBottom
                  variant="h4"
                  component="h2"
                  color={props.color}
                >
                  {today} <ArrowUpwardIcon/>
                </Typography>
              </CardContent>
            </CardActionArea>
          </>
        )}
      </Card>
    </Box>
  );
}

export default function Overview(props) {
  const dispatch = useDispatch();
  const covid = useSelector(state => state.covid);
  let loading = covid.loading;

  const date = covid.loading ? null : covid.data.Date;
  let global = covid.loading ? null : covid.data.Global;
  let countries = covid.loading ? null : covid.data.Countries;
  let country = props.country !== "" ? props.country : { label: "Global" };

  let summary;

  if (props.country !== "" && !loading) {
    // Find by country code
    let filterThatCountry = countries.find(
      c => c.CountryCode === props.country.code
    );
    summary = filterThatCountry;
  } else {
    summary = global;
  }

  useEffect(() => {
    dispatch(fetchCovid());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box mt={2} display="flex" flexDirection="column">
        <Typography variant="h2" component="h2">
          {country.code && <span>{countryToFlag(country.code)}</span>}
          {country.label}
        </Typography>
        {date && (
          <Typography variant="h6">
            <Moment format="YYYY/MM/DD">{date}</Moment>
          </Typography>
        )}
      </Box>
      <Box mt={4} display="flex" flexDirection="row">
        {cases.map(eachCase => (
          <div key={eachCase.name}>
            <CovidCard
              type={eachCase.name}
              label={eachCase.label}
              color={eachCase.color}
              image={eachCase.image}
              summary={summary}
              loading={loading}
            />
          </div>
        ))}
      </Box>
    </>
  );
}
