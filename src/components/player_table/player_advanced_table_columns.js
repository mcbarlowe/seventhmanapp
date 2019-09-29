//This is the column headers for the player table object in player_table.js
export const columns =  [
  {
    Header: "Player",
    accessor: "display_first_last",
    style: {
      textAlign: "right"
    },
    width: 150,
    maxWidth: 150,
    minWidth: 150
  },
  {
    Header: "Season",
    accessor: "season",
    style: {
      textAlign: "right"
    },
    width: 100,
    maxWidth: 100,
    minWidth: 100
  },
  {
    Header: "Position",
    accessor: "position",
    style: {
      textAlign: "right"
    },
    width: 130,
    maxWidth: 130,
    minWidth: 130
  },
  {
    Header: "Teams",
    accessor: "team_abbrev",
    style: {
      textAlign: "right"
    },
    width: 125,
    maxWidth: 125,
    minWidth: 125
  },
  {
    Header: "eFG%",
    accessor: "efg_percentage",
    style: {
      textAlign: "right"
    },
    minWidth: 60
  },
  {
    Header: "TS%",
    accessor: "true_shooting_percentage",
    style: {
      textAlign: "right"
    },
    minWidth: 60
  },
  {
    Header: "OREB%",
    accessor: "oreb_percentage",
    style: {
      textAlign: "right"
    },
    minWidth: 60
  },
  {
    Header: "DREB%",
    accessor: "dreb_percentage",
    style: {
      textAlign: "right"
    },
    minWidth: 60
  },
  {
    Header: "AST%",
    accessor: "ast_percentage",
    style: {
      textAlign: "right"
    },
    minWidth: 60
  },
  {
    Header: "STL%",
    accessor: "stl_percentage",
    style: {
      textAlign: "right"
    },
    minWidth: 60
  },
  {
    Header: "BLK%",
    accessor: "blk_percentage",
    style: {
      textAlign: "right"
    },
    minWidth: 60
  },
  {
    Header: "TOV%",
    accessor: "tov_percentage",
    style: {
      textAlign: "right"
    },
    minWidth: 60
  },
  {
    Header: "USG%",
    accessor: "usg_percentage",
    style: {
      textAlign: "right"
    },
    minWidth: 60
  },
  {
    Header: "OffRtg",
    accessor: "off_rating",
    style: {
      textAlign: "right"
    },
    minWidth: 60
  },
  {
    Header: "DefRtg",
    accessor: "def_rating",
    style: {
      textAlign: "right"
    },
    minWidth: 60
  }
]
