# Portfolios API

## Intro

Working with investments means keeping a bunch of assets and their prices in sync.

You'll be building an application that keeps track of user assets in a single unit called a _Portfolio_. The price of those assets fluctuate often and you'll need to keep track of it. We want to be as accurate as possible.

## Challenge

### Sanity check

First check that you can run this application as is. It has been tested on _java 16_ and _gradle 7.4_, if you're having build issues please check that you have the right versions installed first.

Create the gradle wrapper by doing

```bash
gradle wrapper
```

On the root folder. This will create the `gradlew` executable.

Run the tests by doing:

```bash
./gradlew test
```

Run the app by doing:

```bash
./gradlew clean run --args='server config/app.yml'
```

This should compile, test and start the application. You can test that it's running by checking the sample resource:

```bash
curl localhost:8080/application/hello-world
```

It should return `{"say":"Hello","who":"World"}`

### An API for Portfolios

You need to create a new http resource with a sensible path and verb that returns the contents and proportions of the single portfolio (the suggested quantities are on the `portfolio.datalayer.Portfolio` but feel free to change them if you want)

Granted those asset shares you'll need to fetch the asset values and return a json representation with shares, valuation and proportions in percentages, for example:

```json
[{
    "name": "My Portfolio",
    "total_value": <sum of all asset shares * valuation>
    "assets": [
        {
            "symbol": "BTC",
            "shares": <number of shares>,
            "valuation": <valuation>,
            "percentage": 35 (percentages must add up to 100%)
        }...
    ]
}]
```

Note that:

- `shares`, `valuation` and `total_value` must be precise to the 8th decimal place and may be large numbers

- `percentage`s should be integers (no fractional part) and always add up to 100

- the sum of `shares * valuation` must add up to `total_value`

### Keeping the values up to date

You may pick the number of `shares` you want but you should use the real USD valuation for the assets, here are some apis that will return the valuation for the default assets:

- BTC:
  - https://api.coinbase.com/v2/exchange-rates
  - https://api.coindesk.com/v1/bpi/currentprice.json
- ETH: https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD
- USD: the valuation is always 1

### Filtering

Add an optional way to filter resources from your portfolio representation, for example:

```bash
curl localhost:8080/my_portfolios_resource?assets=BTC, ETH
```

would return the portfolio representation only with BTC and ETH assets, with the right `total_value` (BTC and ETH `shares * valuation`) and `percentages` (they must add up to 100)

## Optional

These are, like the title say, optional points you _may_ include in your solution. You can pick as many or as little as you want.

- There's a single test that asserts true == true, consider adding more test for the functionality you just implemented.

- There's a `portfolios.services.Db` that has a working in-memory h2 database, make that part of your solution.

- Consider using both BTC APIs, keeping one as fallback when the first fails. Can you think of a way to test this (causing the first api call to fail?)

- Suppose the application is read-heavy, how would you optimize it for very fast GET requests?

- Suppose the application is write-heavy, meaning the shares of the portfolio get updated often, how would you handle this? (assume IO is the bottleneck)

- Consider having a “model” for the portfolio (an ideal map of assets and percentages) and have the API return a metric of how off the portfolio is from ideal.

### Optional, design-only

These are questions just to think about and maybe discuss in the following interview, no need to add code to your project (but feel free to do so if you think it will make it easier for making your point)

- Based on the previous "model", consider how you would implement a balancing strategy for the portfolio, meaning if the portfolio needs to have 60% ETH and 40% BTC in value, but because of market fluctuations it’s 50-50, how you would bring it back to the desired values?

- What problems do you think may arise if this application is deployed with redundancy in production (multiple instances running)?
