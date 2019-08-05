import React from 'react'

const Players = ({ players }) => {
  return (
    <div>
      <center><h1>NBA Players Stats</h1></center>
        <div className="table">
          <table border="1" cellPadding="5" cellSpacing="5">
            <tbody>
              <tr>
                <th>season</th>
                <th>player name</th>
                <th>Teams</th>
                <th>GP</th>
                <th>MIN</th>
                <th>FGM</th>
                <th>FGA</th>
                <th>TPM</th>
                <th>TPA</th>
                <th>FTM</th>
                <th>FTA</th>
                <th>OREB</th>
                <th>DREB</th>
                <th>AST</th>
                <th>TOV</th>
                <th>STL</th>
                <th>BLK</th>
                <th>PF</th>
                <th>POINTS</th>
                <th>+/-</th>
              </tr>
          {players.map((players) => (
            //the keys are what react determines is rerendered in the new data
              <tr key={''+players.player_id + players.season}>
               <td>{ players.season }</td>
               <td>{ players.player_name }</td>
               <td>{ players.teams }</td>
               <td>{ players.gp }</td>
               <td>{ players.mins }</td>
               <td>{ players.fgm }</td>
               <td>{ players.fga }</td>
               <td>{ players.tpm }</td>
               <td>{ players.tpa }</td>
               <td>{ players.ftm }</td>
               <td>{ players.fta }</td>
               <td>{ players.oreb }</td>
               <td>{ players.dreb }</td>
               <td>{ players.ast }</td>
               <td>{ players.tov }</td>
               <td>{ players.stl }</td>
               <td>{ players.blk }</td>
               <td>{ players.pf }</td>
               <td>{ players.points }</td>
               <td>{ players.plus_minus }</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Players;
