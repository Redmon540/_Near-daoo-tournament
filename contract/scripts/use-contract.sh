#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 0: Check for environment variable with contract name"
echo ---------------------------------------------------------
echo

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$CONTRACT" ] || echo "Found it! \$CONTRACT is set to [ $CONTRACT ]"
[ -z "$ACCOUNT_ID" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$ACCOUNT_ID" ] || echo "Found it! \$CONTRACT is set to [ $ACCOUNT_ID ]"

echo
echo
echo ---------------------------------------------------------
echo "Step 1: Call 'CreateTournament' function to create a tournament. " 
echo
echo "(run this script again to see changes made by this file)"
echo ---------------------------------------------------------
echo

 near call $CONTRACT createTournament '{"description":"desc-1","tournamentFee":2,"imageUrl":"photo-url"}' --accountId $ACCOUNT_ID

echo
echo

 near view $CONTRACT getTournaments '{}' --accountId $ACCOUNT_ID

echo
echo
echo ---------------------------------------------------------
echo "Step 2: Call up other 'change' functions to modify the storage via id"
echo ---------------------------------------------------------
echo 
echo
echo 
exit 0