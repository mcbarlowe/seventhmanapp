// this is the column headers for team_table.js
export const columns =  [
      {
        Header: "Team",
        accessor: "team_abbrev",
        style: {
          textAlign: "center"
        },
        width: 75,
        maxWidth: 75,
        minWidth: 75
      },
      {
        Header: "Season",
        accessor: "season",
        style: {
          textAlign: "center"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "eFG%",
        accessor: "efg_percentage",
        style: {
          textAlign: "center"
        },
        minWidth: 60
      },
      {
        Header: "TOV%",
        accessor: "tov_percentage",
        style: {
          textAlign: "center"
        },
        minWidth: 60
      },
      {
        Header: "OREB%",
        accessor: "oreb_percentage",
        style: {
          textAlign: "center"
        },
        minWidth: 60
      },
      {
        Header: "FT/FGA",
        accessor: "ft_per_fga",
        style: {
          textAlign: "center"
        },
        minWidth: 60
      },
      {
        Header: "Opp. eFG%",
        accessor: "opp_efg_percentage",
        style: {
          textAlign: "center"
        },
        minWidth: 60
      },
      {
        Header: "Opp. TOV%",
        accessor: "opp_tov_percentage",
        style: {
          textAlign: "center"
        },
        minWidth: 60
      },
      {
        Header: "DREB%",
        accessor: "dreb_percentage",
        style: {
          textAlign: "center"
        },
        minWidth: 60
      },
      {
        Header: "Opp. FT/FGA",
        accessor: "opp_ft_per_fga",
        style: {
          textAlign: "center"
        },
        minWidth: 60
      }
    ]
