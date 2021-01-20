# Farmscan for Arcx

This extracts some information about [Arcx](https://arcx.money) farms, notably, the pool distribution for easy visualization of whale domination. More metrics might be added later.

## Running locally

Clone this repo, run `yarn install`, rename `config.example.ts` into `config.ts` and populate with production values.

### Commands

- `yarn start` will fetch the stakers and their earnings and output the information into a JSON file in the `public/data` folder. Open `public/index.html` to visualize this cached data.
