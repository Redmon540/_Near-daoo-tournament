import { Context, ContractPromiseBatch, logging, u128 } from "near-sdk-as";
import { tournaments, Tournament, Tournament } from "./model";

export const ONE_NEAR_YOKTO = u128.from("1000000000000000000000000");

export function toNear(deposit: u128): u32 {
  return u128.div(deposit, ONE_NEAR_YOKTO).toU32();
}

export function toYocto(amount: number): u128 {
  return u128.mul(ONE_NEAR_YOKTO, u128.from(amount));
}

/* Call Methods */

export function createTournament(description: string, imageUrl: string, name: string, tournamentFee: u16): string {
  //create a new tournament
  const Tournament = new Tournament(description, tournamentFee, name, imageUrl);

  //set the tournament in storage
  tournaments.set(Tournament.id, Tournament);
  return "Succesfully Created";
}

export function updateTournamentContent(TournamentID: u32, description: string, tournamentFee: u16, name: string, imageUrl: string): string {
  assertTournament(TournamentID);
  const Tournament = tournaments.getSome(TournamentID);

  const user = Context.predecessor;
  assert(user == Tournament.publisher, "you cannot edit this tournament");

  //assign statements
  Tournament.description = description;
  Tournament.tournamentFee = tournamentFee;
  Tournament.imageUrl = imageUrl;
  Tournament.name = name;

  tournaments.set(TournamentID, Tournament);
  return "Succesfully Updated";
}

//Delete a existing Tournament
export function deleteTournament(TournamentID: u32): string {
  assertTournament(TournamentID);
  const Tournament = tournaments.getSome(TournamentID);
  const user = Context.predecessor;
  assert(user == Tournament.publisher, "you cannot delete this tournament");

  //delete the tournaments in storage
  tournaments.delete(TournamentID);
  return "Succesfully Deleted";
}

export function applyTournament(TournamentID: u32): string {
  assertTournament(TournamentID);

  const user = Context.predecessor;

  //get Tournament
  const Tournament = tournaments.getSome(TournamentID);

  //assert statements
  assert(Tournament.publisher != user, "You cannot apply your own tournament");
  assert(!Tournament.applicants.includes(user), "Cannot reapply tournament");

  //deposit Tournament fee
  const deposit = Context.attachedDeposit;
  assert(toNear(deposit) == Tournament.tournamentFee, `Tournament Fee is ${Tournament.tournamentFee}`);
  Tournament.applicants.push(user);

  //set the appliars in storage
  tournaments.set(TournamentID, Tournament);
  return "Succesfully applied";
}

//remove apply
export function removeApply(TournamentID: u32): string {
  assertTournament(TournamentID);
  const user = Context.predecessor;
  const Tournament = tournaments.getSome(TournamentID);

  assert(Tournament.applicants.includes(user), "You already didn't apply this tournament");

  const index = Tournament.applicants.indexOf(user);
  Tournament.applicants.splice(index, 1);

  tournaments.set(TournamentID, Tournament);
  //send money back to appliear
  const appliear = ContractPromiseBatch.create(user);
  const promise = appliear.transfer(toYocto(Tournament.tournamentFee));

  return "Succesfully remove apply";
}

export function voteTournament(TournamentID: u32, isVoteUp: bool): string {
  assertTournament(TournamentID);

  const Tournament = tournaments.getSome(TournamentID);
  //vote Tournament and set the storage
  if (isVoteUp) {
    Tournament.vote = Tournament.vote + 1;
  } else {
    Tournament.vote = Tournament.vote - 1;
  }
  tournaments.set(TournamentID, Tournament);
  return "Succesfully voted";
}

/* View Methods */

export function getTournaments(): Tournament[] {
  //compare function to compare vote field
  function compare(a: Tournament, b: Tournament): i16 {
    if (a.vote < b.vote) {
      return 1;
    }
    if (a.vote > b.vote) {
      return -1;
    }
    return 0;
  }

  const arr = tournaments.values(0);
  // The array is sorted according to the votes
  arr.sort(compare);
  return arr.slice(0, 10);
}

export function getTournament(TournamentID: u32): Tournament {
  assertTournament(TournamentID);
  const Tournament = tournaments.getSome(TournamentID);
  return Tournament;
}

//assert Tournament for check Tournament is exists
function assertTournament(TournamentID: u32): void {
  const Tournament = tournaments.get(TournamentID);
  assert(Tournament, "There is no such a tournament");
}
