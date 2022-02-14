package portfolios.datalayer

import java.math.BigDecimal
import java.math.BigInteger

class Portfolio {
    val assets = mapOf(
        "USD" to BigDecimal(1_000L),
        "BTC" to BigInteger("0.0001"),
        "ETH" to BigInteger("10"),
    )
}