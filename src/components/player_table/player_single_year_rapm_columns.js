//This is the column headers for player single year rapm table
export const columns =  [
  {
    Header: "Player",
    accessor: "player_name",
    style: {
      textAlign: "center"
    },
    width: 200,
    maxWidth: 200,
    minWidth: 200
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
    Header: "Teams",
    accessor: "teams",
    style: {
      textAlign: "center"
    },
    width: 125,
    maxWidth: 125,
    minWidth: 125
  },
  {
    Header: "RAPM",
    accessor: "rapm",
    style: {
      textAlign: "center"
    },
    minWidth: 70
  },
  {
    Header: "RAPM Rank",
    accessor: "rapm_rank",
    style: {
      textAlign: "center"
    },
    minWidth: 110
  },
  {
    Header: "Off RAPM",
    accessor: "rapm_off",
    style: {
      textAlign: "center"
    },
    minWidth: 100
  },
  {
    Header: "Off RAPM Rank",
    accessor: "rapm_off_rank",
    style: {
      textAlign: "center"
    },
    minWidth: 140
  },
  {
    Header: "Def RAPM",
    accessor: "rapm_def",
    style: {
      textAlign: "center"
    },
    minWidth: 100
  },
  {
    Header: "Def RAPM Rank",
    accessor: "rapm_def_rank",
    style: {
      textAlign: "center"
    },
    minWidth: 140
  },
]
